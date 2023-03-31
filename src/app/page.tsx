import { NavLinkItems } from "@/utils/NavLinkItems";
import Link from "next/link";
export default function Home() {
  return (
    <div className="py-32 bg-black mx-auto flex flex-col max-w-6xl px-10">
      <div className="flex flex-col flex-1 px-2 pb-10">
        <p className="text-3xl uppercase">Mutants HQ</p>
        <p className="text-2xl">One stop place to all info things MAYC</p>
      </div>
      <div className="flex gap-8 w-full justify-between md:flex-row flex-col flex-wrap focus-accent">
        {NavLinkItems.slice(1).map((item) => {
          return (
            <div
              className="flex-1 hover:shadow-inner-glow glow-border md:min-w-[20rem]"
              key={item.name}
            >
              <Link
                className="flex flex-col px-3 py-4 h-full focus-accent rounded-lg"
                href={item.href}
              >
                <h1 className="border-b-grayish border-b-2 border-dashed pb-2">
                  {item.name}
                </h1>
                <p className="pt-2">{item.description}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
