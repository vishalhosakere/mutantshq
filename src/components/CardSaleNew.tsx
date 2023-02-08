import LooksrareImageLink from "./elements/LooksrareImageLink";
import TokenIdOwner from "./elements/TokenIdOwner";
import Image from "next/image";
import {
  HeartIcon,
  LockClosedIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

export interface NftSaleType {
  image_uri: string;
  token_id: string;
  owner_address: string;
  price: string;
}

function CardSale({ token_id, image_uri, owner_address, price }: NftSaleType) {
  return (
    <>
      <div
        // href={`https://looksrare.org/collections/0x60E4d786628Fea6478F785A6d7e704777c86a7c6/${token_id}`}
        // target="_blank"
        // whileHover={{ paddingBottom: "1rem" }}
        // className={`${
        //   parseInt(unclaimed) !== 0
        //     ? "shadow-amber-600 shadow-xl hover:shadow-amber-600"
        //     : ""
        // } group flex flex-col bg-gray-800 dark:bg-neutral-800 rounded-xl text-gray-200 hover:shadow-xl hover:text-white hover:bg-gray-900 dark:hover:bg-neutral-900 duration-200 ease-in-out`}
        className="group relative flex flex-col p-4 bg-neutral-800 rounded-xl text-gray-200 hover:shadow-xl hover:text-white hover:bg-neutral-900 duration-200 ease-in-out"
      >
        <div className="flex justify-center w-full pb-2">MAYC #{token_id}</div>
        <div className="flex justify-between px-2 pb-2">
          {["/diamond.png", "/diamond.png", "/diamond.png", "/diamond.png"].map(
            (logo, idx) => (
              <div className="w-8 h-8 cursor-pointer relative" key={idx}>
                <Image src={logo} fill={true} alt="Looksrare Logo" />
              </div>
            )
          )}
        </div>
        <LooksrareImageLink image_uri={image_uri} token_id={token_id} />
        {/* {price !== "0" && (
          <div className="w-10 h-10 absolute m-5 pointer-events-none">
            <Image src="/looksrare-logo.svg" fill={true} alt="Looksrare Logo" />
          </div>
        )} */}
        <div className="flex flex-col pb-4 pt-2 divide-y text-center">
          <div>
            {/* <TokenIdOwner token_id={token_id} owner_address={owner_address} /> */}
            <div className="flex justify-between px-3 pb-3 text-sm">
              <div className="w-full">
                <div className="flex w-full justify-between border-b border-dashed border-neutral-600 py-1">
                  <div>Price</div>
                  <div className="flex gap-1">
                    <div>{price !== "0" ? price : "--"}</div>
                    <div className="w-5 relative">
                      <Image src="/ethereum-icon.png" fill={true} alt="" />
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-between border-b border-dashed border-neutral-600 py-1">
                  <div>Staked</div>
                  <div className="flex gap-1">
                    <div>{"--"}</div>
                    <div className="w-5 relative">
                      <Image src="/apecoin-icon.png" fill={true} alt="" />
                    </div>
                    (<div>{"--"}</div>
                    <div className="w-5 relative">
                      <Image src="/ethereum-icon.png" fill={true} alt="" />
                    </div>
                    )
                  </div>
                </div>
                <div className="flex w-full justify-between border-b border-dashed border-neutral-600 py-1">
                  <div>Net Price</div>
                  <div className="flex gap-1">
                    <div>{price !== "0" ? parseFloat(price) - 0 : "--"}</div>
                    <div className="w-5 relative">
                      <Image src="/ethereum-icon.png" fill={true} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between px-2">
              {[
                "/looksrare-logo.png",
                "/opensea-logo.png",
                "/blur-logo.png",
                "/x2y2-logo.png",
                "/etherscan-logo.png",
              ].map((logo, idx) => (
                <div
                  className="w-8 h-8 cursor-pointer relative grayscale hover:grayscale-0"
                  key={idx}
                >
                  <Image src={logo} fill={true} alt="Looksrare Logo" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardSale;
