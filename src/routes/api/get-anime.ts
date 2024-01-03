import { APIEvent } from '@solidjs/start/server/types';
import { MongoClient, ObjectId } from 'mongodb';
import { RequestEvent } from 'solid-js/web';
import { IAnimeCard, AnimeTags, AnimeTitle } from '~/types/anime';


const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri as string);
client
  .connect()
  .then(() => {
    console.log('[Connected to MongoDB]');
  })
  .catch((err) => {
    console.error('[Error connecting to MongoDB]: ', err);
  });

export const POST = async (event:APIEvent) => {
  const { animeTags, animeId }: { animeTags: AnimeTags[]; animeId: string } = await event.request.json();
  if (!animeTags || !animeTags.length || !animeId) {
    console.log(typeof animeId, typeof animeTags);

     return  Response.json({message: "Please provide  AnimeTags, and the animeId to proceed with the body"},{status:500})
  
  }

  try {
    const db = client.db();
    const animeColl = db.collection('anime');
    const animeIdObj = new ObjectId(animeId);

    const queryAggr = [
      {
        $search: {
          index: 'tags_anime',
          autocomplete: { query: animeTags, path: 'tags' },
        },
      },
      {
        $match: {
          _id: { $ne: animeIdObj },
        },
      },
      { $limit: 50 },
    ];
    const anime = await animeColl.aggregate<IAnimeCard>(queryAggr).toArray();
    return Response.json(anime);
  } catch (error) {
    console.error(error);

    return  Response.json({message: "Something went wrong"},{status:500})
   
  }
}

export const GET = async  (event:APIEvent) => {
  console.log(process.env.NODE_ENV);

  const urlSearched = event.request.url;

  const  searchParam  = urlSearched.split("=")[1]
  console.log("params",searchParam, urlSearched.split("="));
  

  const db = client.db();
  const AnimeColl = db.collection('anime');
  const query = [
    {
      $search: {
        index: 'synonyms_anime',
        autocomplete: { query: searchParam || 'A', path: 'synonyms' },
      },
    },
    { $limit: 15 },
    { $project: { _id: 1, title: 1, tags: 1, picture: 1 } },
  ];
  const anime = await AnimeColl.aggregate<AnimeTitle>(query).toArray();
  return Response.json(anime);
}
