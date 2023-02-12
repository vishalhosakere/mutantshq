import NftImage from "./elements/NftImage";
import Image from "next/image";
import { classNames } from "@/utils/Utils";
import { BigNumber, FixedNumber, ethers } from "ethers";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

export interface INftCard {
  token_id: string;
  image_uri: string;
  owner_address: string;
  price?: string;
  staked_apecoin?: string;
  rewards_debt?: string;
  accumated_rewards?: string;
  ape_to_eth?: string;
  short_card: boolean;
}

function fixed2Points(value: string) {
  return parseFloat(parseFloat(value).toFixed(2));
}

function NftCard({
  token_id,
  image_uri,
  owner_address,
  price,
  short_card,
  staked_apecoin,
  rewards_debt,
  accumated_rewards,
  ape_to_eth,
}: INftCard) {
  const APE_COIN_PRECISION = FixedNumber.from("1000000000000000000");

  // Price String
  const priceStr =
    price === "0" || price === undefined ? "---" : `${fixed2Points(price)} ETH`;

  // Staked APE String
  const stakedStr =
    staked_apecoin === "0.0" || staked_apecoin === undefined
      ? "---"
      : `${fixed2Points(staked_apecoin)} APE`;

  // Unlclaimed Rewards String
  let unclaimedStr = "---";
  // Calculate unclaimed rewards only if they have staked
  if (staked_apecoin !== "0.0" && staked_apecoin !== undefined) {
    const stake =
      FixedNumber.from(staked_apecoin).mulUnsafe(APE_COIN_PRECISION);
    const debt = FixedNumber.from(rewards_debt).mulUnsafe(APE_COIN_PRECISION);
    // Equation from ApeStaking Contract
    const unclaimed = FixedNumber.from(accumated_rewards)
      .mulUnsafe(stake)
      .subUnsafe(debt)
      .divUnsafe(APE_COIN_PRECISION)
      .divUnsafe(APE_COIN_PRECISION);
    unclaimedStr = fixed2Points(unclaimed.toString()) + " APE";
  }

  // Net Price String
  let netPriceStr = "---";
  {
    if (
      price !== "0.0" &&
      price !== undefined &&
      ape_to_eth !== undefined &&
      staked_apecoin !== undefined
    ) {
      const net =
        parseFloat(price) - parseFloat(ape_to_eth) * parseFloat(staked_apecoin);
      netPriceStr = fixed2Points(net.toString()) + " ETH";
    }
  }

  const ownerStr =
    owner_address.slice(1, 5) +
    "..." +
    owner_address.slice(owner_address.length - 3, owner_address.length);

  const [flipped, setFlipped] = useState(false);

  return (
    <div className="card relative">
      <div
        className={classNames(
          short_card === true ? "h-[17.75rem]" : "h-100",
          flipped ? "rotate-y-180" : "",
          "group w-60  relative flex flex-col bg-black glow-border rounded-xl p-3 front"
        )}
        onClick={() => {
          console.log("Clicked Frontside");
          setFlipped(!flipped);
        }}
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
        <div className="absolute font-bold top-52 left-0 right-0 mx-auto h-10 bg-black w-24 flex justify-center items-center shadow-outer glow-border">
          # {token_id}
        </div>

        {short_card !== true ? (
          // Left side logos
          <div className="absolute mt-0 -ml-2.5 flex flex-col gap-2">
            {/* All Tooltips */}
            <Tooltip
              anchorId="looksrare-tool-anchor"
              content="Looksrare"
              place="top"
              className="!text-sm !bg-accent !text-black !p-1 !rounded-md"
            />
            <Tooltip
              anchorId="apecoin-tool-anchor"
              content="APE Marketplace"
              place="top"
              className="!text-sm !bg-accent !text-black !p-1 !rounded-md"
            />
            {price !== "0" && price !== undefined ? (
              <a
                href={`https://looksrare.org/collections/0x60E4d786628Fea6478F785A6d7e704777c86a7c6/${token_id}`}
                target="_blank"
                rel="noreferrer"
                className={classNames(
                  flipped ? "hidden" : "group-hover:translate-x-2",
                  "relative w-8 h-8 rounded-full shadow-xl shadow-black glow-border border-accent-light hover:scale-110"
                )}
                id="looksrare-tool-anchor"
              >
                <Image
                  src="/looksrare-logo.png"
                  fill={true}
                  alt="Looksrare Logo"
                />
              </a>
            ) : (
              ""
            )}
            <a
              href={`https://www.apecoinmarketplace.com/collections/0x60e4d786628fea6478f785a6d7e704777c86a7c6/tokens/${token_id}`}
              target="_blank"
              rel="noreferrer"
              className={classNames(
                flipped ? "hidden" : "group-hover:translate-x-2",
                "relative w-8 h-8 rounded-full shadow-xl shadow-black glow-border border-accent-light hover:scale-110"
              )}
              id="apecoin-tool-anchor"
            >
              <Image
                src="/apecoin-icon.png"
                fill={true}
                alt="Apecoin Marketplace Logo"
              />
            </a>
          </div>
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
                  <div className="pb-3 ">{priceStr}</div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="text-accent-light pt-2">STAKED</div>
                  <div className="pb-3">{stakedStr}</div>
                </div>
              </div>

              <div className="flex justify-between gap-1">
                <div className="flex flex-col flex-1">
                  <div className="text-accent-light pt-3">UNCLAIMED</div>
                  <div className="pb-1">{unclaimedStr}</div>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="text-accent-light pt-3">NET PRICE</div>
                  <div className="pb-1">{netPriceStr}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        className={classNames(
          flipped ? "rotate-y-0" : "",
          "absolute group inset-0 back rounded-xl glow-border p-3"
        )}
        onClick={() => {
          console.log("Clicked Backside");
          setFlipped(!flipped);
        }}
      >
        <div className="glow-border w-full h-full group-hover:shadow-inner-glow flex justify-center items-center text-center">
          <a
            href={`https://etherscan.io/address/${owner_address}`}
            rel="noreferrer"
            target="_blank"
          >
            <>
              <div>Owner</div>
              <div className="text-accent-light font-bold text-lg">
                {ownerStr}
              </div>
            </>
          </a>
        </div>
      </div>
    </div>
  );
}

export default NftCard;
