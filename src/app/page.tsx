import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <div>
        <h1>Kelas Mengaji Online</h1>
        <p>{hello.greeting}</p>
      </div>
    </HydrateClient>
  );
}
