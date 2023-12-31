"use client";
import { useState } from "react";
import Card, { INftCard as NftInfo } from "./NftCard";
import InputNumberSubmit from "./elements/InputNumberSubmit";
import Pagination from "./Pagination";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import FilterRowSwitch from "./FilterRowSwitch";
import FilterRowNumber from "./FilterRowNumber";
import { classNames } from "@/utils/Utils";
import SortList from "./SortList";
import { Tooltip, TooltipProvider } from "react-tooltip";

const paginate = (items: NftInfo[], pageNumber: number, pageSize: number) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

const container = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 1,
    },
  },
};

const item = {
  hidden: { scale: 0 },
  show: { scale: 1 },
  exit: { x: 100 },
};

const sortItems = [
  "Token ID: Low to High",
  "Token ID: High to Low",
  "Price: Low to High",
  "Price: High to Low",
  "Staked: Low to High",
  "Staked: High to Low",
];

const sortItemsFunctions = [
  function tokenLowToHigh(option: string, data: NftInfo[]): NftInfo[] {
    return data.sort((a, b) => {
      return parseInt(a.token_id, 16) - parseInt(b.token_id, 16);
    });
  },
  function tokenHighToLow(option: string, data: NftInfo[]): NftInfo[] {
    return data.sort((a, b) => {
      return parseInt(b.token_id, 16) - parseInt(a.token_id, 16);
    });
  },
  function priceLowToHigh(option: string, data: NftInfo[]): NftInfo[] {
    return data.sort((a, b) => {
      const val1 = a.price === undefined ? "9999999999999999" : a.price;
      const val2 = b.price === undefined ? "9999999999999999" : b.price;
      return parseFloat(val1) - parseFloat(val2);
    });
  },
  function priceHighToLow(option: string, data: NftInfo[]): NftInfo[] {
    return data.sort((a, b) => {
      const val1 = a.price === undefined ? "0" : a.price;
      const val2 = b.price === undefined ? "0" : b.price;
      return parseFloat(val2) - parseFloat(val1);
    });
  },
  function stakedLowToHigh(option: string, data: NftInfo[]): NftInfo[] {
    return data.sort((a, b) => {
      const val1 =
        a.staked_apecoin === undefined || a.staked_apecoin == "0.0"
          ? "9999999999999999"
          : a.staked_apecoin;
      const val2 =
        b.staked_apecoin === undefined || b.staked_apecoin == "0.0"
          ? "9999999999999999"
          : b.staked_apecoin;
      return parseFloat(val1) - parseFloat(val2);
    });
  },
  function stakedHighToLow(option: string, data: NftInfo[]): NftInfo[] {
    return data.sort((a, b) => {
      const val1 = a.staked_apecoin === undefined ? "0" : a.staked_apecoin;
      const val2 = b.staked_apecoin === undefined ? "0" : b.staked_apecoin;
      return parseFloat(val2) - parseFloat(val1);
    });
  },
];

interface IGallerySales {
  allData: NftInfo[];
  accumatedRewards: string;
  apeToEth: string;
}

export default function GallerySales({
  allData,
  accumatedRewards,
  apeToEth,
}: IGallerySales) {
  const [currentPage, setCurrentPage] = useState(1);
  const [onSale, setOnSale] = useState(false);
  const [stakedApe, setStakedApe] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [minEth, setMinEth] = useState("");
  const [maxEth, setMaxEth] = useState("");
  const [minStaked, setMinStaked] = useState("");
  const [maxStaked, setMaxStaked] = useState("");
  const [selectedSortItem, setSelectedSortItem] = useState(sortItems[0]);

  const pageSize = 40;
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [search, setSearch] = useState("");

  // Filter Search
  const searchData = allData.filter((el) => {
    return el.token_id.startsWith(search);
  });

  // Filter On Sale
  let data = onSale
    ? searchData.filter((el) => {
        return el.price !== "0" && el.price !== undefined;
      })
    : searchData;

  // Filter Staked APE
  data = stakedApe
    ? data.filter((el) => {
        return el.staked_apecoin !== "0.0" && el.staked_apecoin !== undefined;
      })
    : data;

  // Filter Min Eth
  data =
    minEth !== ""
      ? data.filter((el) => {
          if (el.price === "0" || el.price === undefined) return false;
          return parseFloat(el.price) > parseFloat(minEth);
        })
      : data;

  // Filter Max Eth
  data =
    maxEth !== ""
      ? data.filter((el) => {
          if (el.price === "0" || el.price === undefined) return false;
          return parseFloat(el.price) < parseFloat(maxEth);
        })
      : data;

  // Filter Min Staked
  data =
    minStaked !== ""
      ? data.filter((el) => {
          if (el.staked_apecoin === "0.0" || el.staked_apecoin === undefined)
            return false;
          return parseFloat(el.staked_apecoin) > parseFloat(minStaked);
        })
      : data;

  // Filter Max Staked
  data =
    maxStaked !== ""
      ? data.filter((el) => {
          if (el.staked_apecoin === "0.0" || el.staked_apecoin === undefined)
            return false;
          return parseFloat(el.staked_apecoin) < parseFloat(maxStaked);
        })
      : data;

  sortItems.map((sortOption, idx) => {
    if (sortOption !== selectedSortItem) return;
    data = sortItemsFunctions[idx](sortOption, data);
  });

  const nftInfo = paginate(data, currentPage, pageSize);

  const resultsString = () => {
    if (data.length > pageSize) {
      const leftCount = (currentPage - 1) * pageSize + 1;
      const rightCount = Math.min(currentPage * pageSize, data.length);
      return `Showing ${leftCount} - ${rightCount} of ${data.length} results`;
    } else {
      return `Showing ${data.length} results`;
    }
  };

  const searchChanged = (str: string) => {
    setSearch(str);
    setCurrentPage(1);
  };

  const minEthChanged = (str: string) => {
    setMinEth(str);
    setCurrentPage(1);
  };

  const maxEthChanged = (str: string) => {
    setMaxEth(str);
    setCurrentPage(1);
  };

  const minStakedChanged = (str: string) => {
    setMinStaked(str);
    setCurrentPage(1);
  };

  const maxStakedChanged = (str: string) => {
    setMaxStaked(str);
    setCurrentPage(1);
  };
  return (
    <div className="">
      <div className="mx-auto max-w-full py-5 sm:py-10 flex flex-col gap-4">
        <div className="flex mx-10 pb-2 gap-3 justify-center flex-col lg:flex-row lg:gap-10 lg:pb-10">
          {/* Search field */}
          <InputNumberSubmit
            placeholder="Search Token ID"
            onChangeFn={searchChanged}
            onSubmitFn={null}
            classes="w-full self-center"
          />
          {/* Search result string */}
          <div className="flex justify-center items-center flex-shrink-0">
            <p>{resultsString()}</p>
          </div>
        </div>
        <div className="flex lg:hidden justify-center pb-10">
          <div
            className={classNames(
              "fixed top-0 left-0 w-full h-screen z-40 bg-neutral-400/70 backdrop-blur-sm",
              isOpen ? "" : "hidden"
            )}
          ></div>
          <button
            className="block rounded-lg cursor-pointer border-2 px-3 py-2 ml-0 leading-tight bg-dark-gray border-neutral-700 text-whitish hover:bg-neutral-700"
            onClick={() => setIsOpen(true)}
          >
            Filters
          </button>
        </div>
        <h2 className="sr-only">MAYC NFTs</h2>
        {/* Filter column */}
        <div className="flex gap-10">
          <div className="hidden lg:flex flex-col divide-y divide-grayish basis-80 grow-0 shrink-0 h-full border-2 border-neutral-700 sticky top-40 rounded-lg px-5">
            <FilterRowSwitch
              label="On Sale"
              state={onSale}
              setState={setOnSale}
            />
            <FilterRowSwitch
              label="Staked APE"
              state={stakedApe}
              setState={setStakedApe}
            />
            <FilterRowNumber
              label="Price Range"
              minChanged={minEthChanged}
              maxChanged={maxEthChanged}
            />
            <FilterRowNumber
              label="Staked APE Range"
              minChanged={minStakedChanged}
              maxChanged={maxStakedChanged}
            />
            <SortList
              label="Sort Results"
              listItems={sortItems}
              selectedItem={selectedSortItem}
              setSelectedItem={setSelectedSortItem}
            />
          </div>
          {/* Modal filter pop up */}
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50 lg:hidden"
          >
            <div className="fixed inset-x-0 inset-y-10 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-h-full overflow-auto p-6 max-w-sm sm:max-w-md rounded-lg bg-black border-2 border-accent flex flex-col">
                <Dialog.Title className="self-center text-lg font-bold">
                  Filters
                </Dialog.Title>

                <div className="flex flex-col divide-y divide-grayish">
                  <FilterRowSwitch
                    label="On Sale"
                    state={onSale}
                    setState={setOnSale}
                  />
                  <FilterRowSwitch
                    label="Staked APE"
                    state={stakedApe}
                    setState={setStakedApe}
                  />
                  <FilterRowNumber
                    label="Price Range"
                    minChanged={minEthChanged}
                    maxChanged={maxEthChanged}
                  />
                  <FilterRowNumber
                    label="Staked APE Range"
                    minChanged={minStakedChanged}
                    maxChanged={maxStakedChanged}
                  />
                  <SortList
                    label="Sort Results"
                    listItems={sortItems}
                    selectedItem={selectedSortItem}
                    setSelectedItem={setSelectedSortItem}
                  />
                  <button
                    className="block mt-6 rounded-lg cursor-pointer border-2 px-3 py-2 ml-0 leading-tight bg-dark-gray border-neutral-700 text-whitish hover:bg-neutral-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
          {/* Grid of cards */}
          <TooltipProvider>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid gap-y-10 gap-x-10 grid-cols-auto-15 w-full justify-evenly"
            >
              {nftInfo.map((nftItem, idx) => (
                <motion.div
                  variants={item}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  key={nftItem.token_id + idx}
                >
                  <Card
                    image_uri={nftItem.image_uri}
                    token_id={nftItem.token_id}
                    owner_address={nftItem.owner_address}
                    price={nftItem.price}
                    staked_apecoin={nftItem.staked_apecoin}
                    rewards_debt={nftItem.rewards_debt}
                    accumated_rewards={accumatedRewards}
                    ape_to_eth={apeToEth}
                    short_card={false}
                  />
                </motion.div>
              ))}
            </motion.div>
            <Tooltip
              place="top"
              className="!text-sm !bg-accent !text-black !p-1 !rounded-md !pointer-events-none"
            />
          </TooltipProvider>
        </div>
        {/* Pagination */}
        <div className="flex w-full justify-center items-center">
          <Pagination
            items={data.length}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
