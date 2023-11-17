import apeCoinContract from "@/utils/apecoinContact";
import { ethers, Contract } from "ethers";
import * as dotenv from "dotenv";
import MaycHub from "@/components/MaycHub";
dotenv.config();

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

  async function getPreviousTimestampHour(block: ethers.providers.Block) {
    const min_secs = block.timestamp % SECONDS_PER_HOUR;
    const mins = Math.floor(min_secs / SECONDS_PER_MINUTE);
    const secs = Math.floor(block.timestamp / SECONDS_PER_MINUTE);

    return Math.floor(block.timestamp - (mins * 60 + secs));
  }

  const previousTimeStampHour = await getPreviousTimestampHour(block);
  console.log(block, pool, previousTimeStampHour);
  const { rewardsSinceLastCalculated, _ } = await contract.rewardsBy(
    2,
    ethers.BigNumber.from(pool.lastRewardedTimestampHour),
    // TODO: Should be previousTimeStampHour but it's value is coming
    // to be less than pool.lastRewardedTimestampHour so the call reverts.
    // For now calculate till current timestamp
    ethers.BigNumber.from(block.timestamp)
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
  const accumatedRewards = await getContractData();
  const apeToEth = await getApeToEth();
  return <MaycHub accumatedRewards={accumatedRewards} apeToEth={apeToEth} />;
}
