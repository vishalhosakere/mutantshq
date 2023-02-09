import LooksrareImageLink from "./elements/LooksrareImageLink";
import TokenIdOwner from "./elements/TokenIdOwner";

export interface NftInfoType {
  image_uri: string;
  token_id: string;
  owner_address: string;
}

function Card({ token_id, image_uri, owner_address }: NftInfoType) {
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
        className="group w-60 h-80 flex flex-col bg-neutral-800 rounded-xl text-gray-200 hover:shadow-xl hover:text-white hover:bg-neutral-900 duration-200 ease-in-out"
      >
        <LooksrareImageLink image_uri={image_uri} token_id={token_id} />
        <div className="flex flex-col pb-4 pt-2 px-3 divide-y text-center">
          <TokenIdOwner token_id={token_id} owner_address={owner_address} />
          {/* <div className="flex flex-col divide-y">
                  <div className="flex divide-x py-2">
                    <div className="basis-1/3 flex flex-col justify-start items-center text-center">
                      <div className="font-bold text-md">20</div>
                      <div className="text-xs">Transfers</div>
                    </div>
                    <div className="basis-1/3 flex flex-col justify-start items-center text-center">
                      <div className="font-bold text-md">
                        {staked} <span className="text-sm">APE</span>
                      </div>
                      <div className="text-xs">Staked</div>
                    </div>
                    <div className="basis-1/3 flex flex-col justify-start items-center text-center">
                      <div className="font-bold text-md">
                        {unclaimed} <span className="text-sm">APE</span>
                      </div>
                      <div className="text-xs">Unclaimed</div>
                    </div>
                  </div>
                  <div className="flex divide-x py-2">
                    <div className="basis-1/3 flex flex-col justify-start items-center text-center">
                      <div className="font-bold text-md">20</div>
                      <div className="text-xs">Transfers</div>
                    </div>
                    <div className="basis-1/3 flex flex-col justify-start items-center text-center">
                      <div className="font-bold text-md">
                        {staked} <span className="text-sm">APE</span>
                      </div>
                      <div className="text-xs">Staked</div>
                    </div>
                    <div className="basis-1/3 flex flex-col justify-start items-center text-center">
                      <div className="font-bold text-md">
                        {unclaimed} <span className="text-sm">APE</span>
                      </div>
                      <div className="text-xs">Unclaimed</div>
                    </div>
                  </div>
                </div> */}
        </div>
      </div>
    </>
  );
}

export default Card;
