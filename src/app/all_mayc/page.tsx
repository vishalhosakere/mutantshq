import { INftCard as NftInfo } from "@/components/NftCard";
import GallerySales from "@/components/GallerySales";

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
    const response = await fetch(cursorUrl);
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
    "https://mutantstatsapi.netlify.app/api/allowners"
  );
  const json = await response.json();
  return json;
}

export default async function Owners() {
  const pricesData: TokenIdPriceType[] = await getLooksrareData();
  const ownerData: NftInfo[] = await getOwnerData();

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

      <GallerySales allData={mergedData} />
    </div>
  );
}
