import Image from "next/image";
import Link from "next/link";
import { ProjectItems } from "@/utils/ProjectItems";

export default function Projects() {
  return (
    <div className="py-32 bg-black px-4 sm:px-6 lg:px-16 xl:px-20 flex flex-col max-w-7xl mx-auto">
      <div className="flex flex-1 justify-center text-center">
        <p className="text-2xl">Projects by the MAYC community members</p>
      </div>
      <div className="grid gap-8 w-full justify-between md:grid-cols-2 grid-cols-1 focus-accent py-10">
        {ProjectItems.map((item) => {
          return (
            <div
              className="flex-1 hover:shadow-inner-glow glow-border"
              key={item.title}
            >
              <Link
                className="flex flex-col px-3 py-4 h-full focus-accent rounded-lg"
                href={item.href}
                target="_blank"
              >
                <div className="relative w-full h-60 rounded-lg">
                  <Image
                    src="https://pbs.twimg.com/profile_banners/1063742461888086016/1676361659/1500x500"
                    fill
                    alt=""
                    className="object-cover rounded-lg"
                  ></Image>
                </div>
                <h1 className="border-b-grayish border-b-2 border-dashed py-2">
                  {item.title}
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
