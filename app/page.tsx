export const dynamic = 'force-static'
export const revalidate = 60 // revalida a cada 60s (ISR)

import { Header } from "@/components/header";
import ListClient from "@/components/list-client";

import { Search } from "@/components/search";
import { Title } from "@/components/title";
import { Goal } from "@/types/goals.interface";


export default function Home() {
  return (
    <main>
      <Header />
      <Title />
      <section className="flex justify-center items-center flex-col">
        <Search />
        <ListClient/>
      </section>
    </main>
  );
}
