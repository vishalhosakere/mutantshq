import NftImage from "./elements/NftImage";
import Image from "next/image";
import { classNames } from "@/utils/Utils";

export interface INftCard {
  image_uri: string;
  token_id: string;
  owner_address: string;
  price?: string;
  staked?: string;
  unclaimed?: string;
  short_card: boolean;
}

function NftCard({
  token_id,
  image_uri,
  owner_address,
  price,
  short_card,
  staked,
  unclaimed,
}: INftCard) {
  const priceStr = price === "0" || price === undefined ? "---" : price;
  const stakedStr = staked === "0" || staked === undefined ? "---" : price;
  const unclaimedStr = "---";
  const netPriceStr = price === "0" || price === undefined ? "---" : price;

  return (
    <>
      <div
        // className={`${
        //   parseInt(unclaimed) !== 0
        //     ? "shadow-amber-600 shadow-xl hover:shadow-amber-600"
        //     : ""
        // } group flex flex-col bg-gray-800 dark:bg-neutral-800 rounded-xl text-gray-200 hover:shadow-xl hover:text-white hover:bg-gray-900 dark:hover:bg-neutral-900 duration-200 ease-in-out`}
        className={classNames(
          short_card === true ? "h-[17.75rem]" : "h-100",
          "group w-60  relative flex flex-col bg-black glow-border rounded-xl p-3"
        )}
      >
        {/* Render this first since logos go on top */}
        <NftImage image_uri={image_uri} token_id={token_id} />

        {/* Bottom div with price info */}
        <div
          className={classNames(
            short_card === true ? "h-[2rem]" : "h-[9.25rem]",
            "absolute bottom-3 bg-black glow-border w-[13.25rem] shadow-inner group-hover:shadow-inner-glow"
          )}
        ></div>
        {/* Center div with token ID */}
        <div className="absolute top-52 left-0 right-0 mx-auto h-10 bg-black w-24 flex justify-center items-center shadow-outer glow-border">
          # {token_id}
        </div>

        {short_card !== true ? (
          // Left side logos
          price !== "0" && price !== undefined ? (
            <a
              href={`https://looksrare.org/collections/0x60E4d786628Fea6478F785A6d7e704777c86a7c6/${token_id}`}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 absolute mt-0 -ml-3 rounded-full shadow-xl shadow-black glow-border border-accent-light group-hover:translate-x-2 hover:scale-105"
            >
              <Image
                src="/looksrare-logo.png"
                fill={true}
                alt="Looksrare Logo"
              />
            </a>
          ) : (
            ""
          )
        ) : (
          //   <div className="w-8 h-8 grayscale absolute mt-9 -ml-3 pointer-events-none z-10 rounded-full shadow-xl shadow-black border-2 border-lime-200 group-hover:border-[#D0DE40] group-hover:translate-x-2 duration-200 ease-in-out">
          //   <Image src="/opensea-logo.png" fill={true} alt="Looksrare Logo" />
          // </div>
          // <div className="w-8 h-8 grayscale absolute mt-[4.5rem] -ml-3 pointer-events-none z-10 rounded-full shadow-xl shadow-black border-2 border-lime-200 group-hover:border-[#D0DE40] group-hover:translate-x-2 duration-200 ease-in-out">
          //   <Image src="/blur-logo.png" fill={true} alt="Looksrare Logo" />
          // </div>

          // Right side logos
          // <div className="w-8 h-8 absolute mt-0 right-0 mr-0 pointer-events-none z-10 rounded-full shadow-xl shadow-black border-2 border-lime-200 group-hover:border-[#D0DE40] group-hover:-translate-x-2 duration-200 ease-in-out">
          //   <Image src="/x2y2-logo.png" fill={true} alt="Looksrare Logo" />
          // </div>
          // <div className="w-8 h-8 overflow-hidden absolute mt-9 right-0 mr-0 pointer-events-none z-10 rounded-full shadow-xl shadow-black border-2 border-lime-200 group-hover:border-[#D0DE40] group-hover:-translate-x-2 duration-200 ease-in-out">
          //   <Image src="/etherscan-logo.png" fill={true} alt="Looksrare Logo" />
          // </div>
          // <div className="w-8 h-8 overflow-hidden absolute mt-[4.5rem] right-0 mr-0 pointer-events-none z-10 rounded-full shadow-xl shadow-black border-2 border-lime-200 group-hover:border-[#D0DE40] group-hover:-translate-x-2 duration-200 ease-in-out">
          //   <Image src="/diamond.png" fill={true} alt="Looksrare Logo" />
          // </div>
          ""
        )}

        {short_card !== true && (
          <div className="flex z-0 pb-4 pt-[1.675rem] px-0 text-center text-whitish">
            <div className="flex flex-col px-3 text-sm w-full uppercase">
              <div className="flex justify-between gap-1 glow-b-border border-dashed">
                <div className="flex flex-col flex-1">
                  <div className="text-accent-light pt-2">PRICE</div>
                  <div className=" pb-3 ">{priceStr} ETH</div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="text-accent-light pt-2">STAKED</div>
                  <div className="pb-3">{stakedStr} APE</div>
                </div>
              </div>

              <div className="flex justify-between gap-1">
                <div className="flex flex-col flex-1">
                  <div className="text-accent-light pt-3">UNCLAIMED</div>
                  <div className="pb-1">{unclaimedStr} APE</div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="text-accent-light pt-3">NET PRICE</div>
                  <div className="pb-1">{netPriceStr} ETH</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default NftCard;
