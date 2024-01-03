import { Router, useLocation, useNavigate } from "@solidjs/router";
import { createSignal, createEffect, Suspense } from "solid-js";
import { IAnimeCard } from "~/types/anime";

export default function AnimeRecommendations() {
  const location = useLocation();
  const [animeData, setAnimeData] = createSignal<IAnimeCard[] | undefined>();
  const navigate = useNavigate();

  const data = new URLSearchParams(location.search);
  const animeId = data.get("_id");
  const animeTags = data.get("tags");

  createEffect(() => {
    console.log(data);

    const fetchData = async () => {
      try {
        const res = await fetch("/api/get-anime", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            animeId,
            animeTags,
          }),
        });
        const data: IAnimeCard[] = await res.json();
        setAnimeData(data);
      } catch (error) {
        alert("something went wrong please go to previous page and try again");
        console.error(error);
        navigate("/");
      }
    };
    fetchData();
  }, []);
  return (
    <section class="bg-zinc-900 min-h-screen flex items-center justify-center">
      <Suspense fallback={<LoadingFallback />}>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {animeData()?.map((anime) => <AnimeCard anime={anime} />)}
        </div>
      </Suspense>
    </section>
  );
}

function AnimeCard({ anime }: { anime: IAnimeCard }) {
  return (
    <div class="bg-zinc-800 w-full h-full  p-4 sm:p-6 md:p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <img
          src={anime.picture}
          alt={anime.title}
          class="w-full h-48 object-cover rounded-t-lg"
        />
        <div class="p-4">
          <h2 class="text-xl font-bold text-white">{anime.title}</h2>
          <div class="flex items-center text-gray-300">
            <span class="mr-4">Status: {anime.status}</span>
            <span>Type: {anime.type}</span>
          </div>
          <div class="text-gray-300 mt-2">Episodes: {anime.episodes}</div>
        </div>
      </div>
    </div>
  );
}
export function LoadingFallback() {
  return (
    <div class="bg-zinc-900 text-center mx-auto text-gray-100 p-4 flex justify-center items-center py-16">
      Loading...
    </div>
  ); // You can customize the loading spinner or message here
}
