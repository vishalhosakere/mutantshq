import Image from "next/image";

interface IfaceImageLink {
  image_uri: string;
  token_id: string;
}

export default function LooksrareImageLink({
  image_uri,
  token_id,
}: IfaceImageLink) {
  return (
    <a
      href={`https://looksrare.org/collections/0x60E4d786628Fea6478F785A6d7e704777c86a7c6/${token_id}`}
      target="_blank"
      rel="noreferrer"
      className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl"
    >
      <Image
        src={image_uri}
        alt={`MAYC ${token_id} NFT Image`}
        fill={true}
        className="object-cover object-center group-hover:scale-105 duration-200 ease-in-out"
      />
    </a>
  );
}
