import Image from "next/image";

interface INftImage {
  image_uri: string;
  token_id: string;
}

export default function NftImage({ image_uri, token_id }: INftImage) {
  return (
    <div className="relative aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
      <Image
        src={image_uri}
        alt={`MAYC ${token_id} NFT Image`}
        fill={true}
        className="object-cover object-center group-hover:scale-105 duration-200 ease-in-out"
      />

      <div className="absolute inset-0 rounded-lg shadow-inner"></div>
    </div>
  );
}
