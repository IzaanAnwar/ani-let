import { A } from "@solidjs/router";

export default function Loading() {
  return (
    <main class="bg-zinc-800 text-center mx-auto  p-4">
      <h1 class="max-6-xs text-6xl text-red-500 font-thin uppercase my-16">
        Not Found
      </h1>

      <p class="my-4">
        <A href="/" class="text-sky-600 hover:underline">
          Home
        </A>
      </p>
    </main>
  );
}
