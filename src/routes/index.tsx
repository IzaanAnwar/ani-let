import { A } from "@solidjs/router";
import axios from "axios";
import { createSignal, createEffect, Suspense } from "solid-js";

import { AnimeTitle } from "~/types/anime";

function App() {
  const [searchParam, setSearchParam] = createSignal("");
  const [animeData, setAnimeData] = createSignal<AnimeTitle[] | []>([]);
  const [err, setErr] = createSignal("search some anime");
  const handleSearch = async (event: any) => {
    event.preventDefault();
    if (!searchParam()) {
      return;
    }
    console.log(searchParam());

    try {
      const res = await fetch(`/api/get-anime?searchParam=${searchParam()}`);

      console.log(res, "res");

      const data = await res.json();
      console.log(data);

      if (data.length >= 1) {
        setAnimeData(data);
      } else {
        console.log(err, "jk");
        setErr("Not Found");
        console.log(err, "af");
      }
    } catch (error: any) {
      setErr(error.message);
      if (error instanceof Error) {
        console.log(error);
      }
    }
  };
  return (
    <section class="h-screen w-screen overflow-x-clip overflow-y-scroll scroll-smooth bg-zinc-900 px-2 py-4">
      <div class="text-gray-100 flex flex-col md:flex-row space-y-2 justify-center items-center">
        <label for=""></label>
        <input
          class="text-white rounded-md px-4 py-2 border-zinc-400-400 bg-zinc-700  border-2 w-full md:w-96 "
          type="text"
          name="search"
          placeholder="Search"
          value={searchParam()}
          onChange={(e) => {
            e.preventDefault();
            setSearchParam(e.target.value);
          }}
        />
        <button
          onClick={handleSearch}
          class="rounded-md px-4 py-2 mx-2 hover:bg-purple-500 bg-purple-600 duration-250 w-full md:w-24"
          type="submit"
        >
          Search
        </button>
      </div>

      <div class="bg-custom-bg min-h-screen flex items-center justify-center">
        <Suspense fallback={<div>Loading...</div>}>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {animeData().length >= 1 ? (
              animeData().map((anime: any) => {
                return (
                  <A
                    href={`/recommendations?_id=${anime._id}&tags=${anime.tags}`}
                    class="block  hover:text-gray-400 duration-100 py-2"
                  >
                    <AnimeSearchResCard anime={anime} />
                  </A>
                );
              })
            ) : (
              <div class="w-screen text-center text-gray-100  font-bold text-xl">
                <p>{err()}</p>
              </div>
            )}
          </div>
        </Suspense>
      </div>
    </section>
  );
}

const AnimeSearchResCard = ({ anime }: { anime: AnimeTitle }) => {
  return (
    <div class="bg-zinc-800 w-full h-72  p-2 sm:p-4 md:p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300">
      <img
        src={anime.picture}
        alt={anime.title}
        class="w-full h-32 object-cover rounded-t-lg"
      />
      <div class="p-2">
        <h2 class="text-lg font-bold text-white">{anime.title}</h2>
      </div>
    </div>
  );
};
export default App;
