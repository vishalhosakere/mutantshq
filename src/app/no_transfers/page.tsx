import GalleryTags from "@/components/GalleryNoFilter";

async function getData() {
  const response = await fetch(
    "https://mutantstatsapi.netlify.app/api/notransfers",
    { cache: "no-store" }
  );
  const json = await response.json();
  // await delay(300000);

  return json;
}

export default async function NoTransfers() {
  const allData = await getData();
  return (
    <div className="py-32 bg-black px-4 sm:px-6 lg:px-16 xl:px-20 flex flex-col">
      <div className="flex flex-1 justify-center text-center">
        <p className="text-2xl">No Transfers, Diamond Hands</p>
      </div>

      <GalleryTags allData={allData} />
    </div>
  );
}
