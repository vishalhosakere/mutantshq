import { INftCard as NftInfo } from "@/components/NftCard";
import GallerySales from "@/components/GallerySales";
import apeCoinContract from "@/utils/apecoinContact";
import { ethers, Contract } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const cursorStr = "&pagination[cursor]=";
const url =
  "https://api.looksrare.org/api/v1/orders?isOrderAsk=true&collection=0x60E4d786628Fea6478F785A6d7e704777c86a7c6&status[]=VALID&pagination[first]=150";

type LooksrareOrderType = {
  hash: string;
  collectionAddress: string;
  tokenId: string;
  isOrderAsk: boolean;
  signer: string;
  strategy: string;
  currencyAddress: string;
  amount: string;
  price: string;
  nonce: string;
  startTime: number;
  endTime: number;
  minPercentageToAsk: number;
  params: string;
  status: string;
  signature: string;
  v: number;
  r: string;
  s: string;
};

type TokenIdPriceType = {
  token_id: string;
  price: string;
};

const weiStringToFloat = (num: string, base: number, precision: number) =>
  parseFloat((parseInt(num) / 1000000000000000000).toPrecision(6)).toString();

async function getLooksrareData() {
  let allData: LooksrareOrderType[] = [];
  let data: LooksrareOrderType[] = [];
  let cursor = "";

  do {
    const cursorUrl: string =
      data.length === 0 ? url : `${url}${cursorStr}${cursor}`;
    const response = await fetch(cursorUrl, { cache: "no-store" });
    const json = await response.json();
    data = json.data;
    allData.push(...data);
    console.log(`Fetched ${allData.length} items`);
    cursor = data[data.length - 1]?.hash;
  } while (data.length !== 0);
  // } while (false);

  allData.sort((a, b) => parseInt(a.price, 16) - parseInt(b.price, 16));
  allData.sort((a, b) => parseInt(a.tokenId, 16) - parseInt(b.tokenId, 16));

  allData = allData.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.tokenId === value.tokenId)
  );
  const newData = allData.map(({ tokenId, price }) => ({
    token_id: tokenId,
    price: weiStringToFloat(price, 16, 6),
  }));

  return newData;
}

async function getOwnerData() {
  const response = await fetch(
    "https://mutantstatsapi.netlify.app/api/allowners",
    { cache: "no-store" }
  );
  const json = await response.json();
  return json;
}

async function getContractData() {
  const APE_COIN_PRECISION = ethers.BigNumber.from("1000000000000000000");
  const SECONDS_PER_HOUR = 3600;
  const SECONDS_PER_MINUTE = 60;

  const provider = new ethers.providers.InfuraProvider(
    "mainnet",
    process.env.INFURA_API_KEY
  );

  const contract = new Contract(
    apeCoinContract.address,
    apeCoinContract.abi,
    provider
  );
  const pool = await contract.pools(2);
  const block = await provider.getBlock("latest");

  async function getPreviousTimestampHour() {
    const min_secs = block.timestamp % SECONDS_PER_HOUR;
    const mins = Math.floor(min_secs / SECONDS_PER_MINUTE);
    const secs = Math.floor(block.timestamp / SECONDS_PER_MINUTE);

    return Math.floor(block.timestamp - (mins * 60 + secs));
  }

  const previousTimeStampHour = await getPreviousTimestampHour();
  const { rewardsSinceLastCalculated, _ } = await contract.rewardsBy(
    2,
    ethers.BigNumber.from(pool.lastRewardedTimestampHour),
    ethers.BigNumber.from(previousTimeStampHour)
  );

  let accumulatedRewardsPerShare = ethers.BigNumber.from(
    pool.accumulatedRewardsPerShare
  );

  if (
    block.timestamp > pool.lastRewardedTimestampHour + SECONDS_PER_HOUR &&
    pool.stakedAmount != 0
  ) {
    accumulatedRewardsPerShare = accumulatedRewardsPerShare.add(
      rewardsSinceLastCalculated.mul(APE_COIN_PRECISION).div(pool.stakedAmount)
    );
  }
  // Formula to calculate Pending Rewards
  // const stake = ethers.BigNumber.from("2042000000000000000000");
  // const debt = ethers.BigNumber.from("670336562247893048840000000000000000000");
  // const unclaimed = accumulatedRewardsPerShare
  //   .mul(stake)
  //   .sub(debt)
  //   .div(APE_COIN_PRECISION);
  // console.log(parseFloat(ethers.utils.formatEther(unclaimed)).toFixed(2));
  return accumulatedRewardsPerShare.toString();
}

async function getApeToEth() {
  const url = "https://api.coinbase.com/v2/exchange-rates?currency=APE";
  const response = await fetch(url, { cache: "no-store" });
  const json = await response.json();
  return json.data.rates["ETH"];
}

export default async function Owners() {
  const pricesData: TokenIdPriceType[] = await getLooksrareData();
  const ownerData: NftInfo[] = await getOwnerData();
  const accumatedRewards = await getContractData();
  const apeToEth = await getApeToEth();

  const mergedData = ownerData.map((owner) => {
    return {
      // price: value
      // token_id: value
      ...pricesData.find((look) => owner.token_id === look.token_id && look),
      // token_id: value
      // image_uri: value
      // owner_address: value
      ...owner,
    };
  });

  return (
    <div className="pt-20 bg-black px-4 sm:px-6 lg:px-16 xl:px-20 flex flex-col">
      <div className="flex flex-1 justify-center text-center">
        <p className="text-2xl">Every MAYC that ever existed</p>
      </div>

      <GallerySales
        allData={mergedData}
        accumatedRewards={accumatedRewards}
        apeToEth={apeToEth}
      />
    </div>
  );
}
