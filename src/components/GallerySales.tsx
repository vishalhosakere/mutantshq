"use client";
import { useState } from "react";
import CardSale, { NftSaleType } from "./CardSale";
import InputNumber from "./InputNumberSubmit";
import Pagination from "./Pagination";
import { motion } from "framer-motion";
import { Dialog, Switch } from "@headlessui/react";
import FilterRowSwitch from "./FilterRowSwitch";
import FilterRowNumber from "./FilterRowNumber";
import { classNames } from "@/utils/Utils";

const paginate = (
  items: NftSaleType[],
  pageNumber: number,
  pageSize: number
) => {
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

export default function GallerySales({ allData }: { allData: NftSaleType[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [onSale, setOnSale] = useState(false);
  const [stakedApe, setStakedApe] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [minEth, setMinEth] = useState("");
  const [maxEth, setMaxEth] = useState("");
  const pageSize = 24;
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
        return el.price !== "0";
      })
    : searchData;

  // Filter Min Eth
  data =
    minEth !== ""
      ? data.filter((el) => {
          if (el.price === "0") return false;
          return parseFloat(el.price) > parseFloat(minEth);
        })
      : data;

  // Filter Max Eth
  data =
    maxEth !== ""
      ? data.filter((el) => {
          if (el.price === "0") return false;
          return parseFloat(el.price) < parseFloat(maxEth);
        })
      : data;

  console.log(data.length);

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

  const minChanged = (str: string) => {
    setMinEth(str);
    setCurrentPage(1);
  };

  const maxChanged = (str: string) => {
    setMaxEth(str);
    setCurrentPage(1);
  };
  return (
    <div className="">
      <div className="mx-auto max-w-full py-5 sm:py-10 flex flex-col gap-4">
        <div className="flex justify-center">
          <InputNumber
            placeholder="Search Token ID"
            onChangeFn={searchChanged}
            onSubmitFn={null}
          />
        </div>
        <div className="flex justify-center md:pb-10 text-sm">
          <p>{resultsString()}</p>
        </div>
        <div className="flex md:hidden justify-center pb-10">
          <div
            className={classNames(
              "fixed top-0 left-0 w-full h-screen z-40 bg-neutral-400/70 backdrop-blur-sm",
              isOpen ? "" : "hidden"
            )}
          ></div>
          <button
            className="block rounded-lg cursor-pointer border-2 px-3 py-2 ml-0 leading-tight bg-neutral-800 border-neutral-700 text-neutral-100 hover:bg-neutral-700 hover:text-white"
            onClick={() => setIsOpen(true)}
          >
            Filters
          </button>
        </div>
        <h2 className="sr-only">MAYC NFTs</h2>
        <div className="flex gap-10">
          <div className="hidden md:flex flex-col divide-y w-40 xl:w-80 lg:w-60 md:w-48 h-full border-2 border-neutral-700 sticky top-40 rounded-lg px-5">
            <FilterRowSwitch
              label="On Sale"
              state={onSale}
              setState={setOnSale}
            />
            <FilterRowSwitch
              label="Staked $APE"
              state={stakedApe}
              setState={setStakedApe}
            />
            <FilterRowNumber
              label="Min"
              placeholder="0.00"
              onChangeFn={minChanged}
            />
            <FilterRowNumber
              label="Max"
              placeholder="0.00"
              onChangeFn={maxChanged}
            />
          </div>
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50 md:hidden"
          >
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full p-6 max-w-sm sm:max-w-md rounded-lg bg-neutral-800 border-2 border-neutral-200 flex flex-col justify-center">
                <Dialog.Title className="self-center text-lg font-bold">
                  Filters
                </Dialog.Title>

                <FilterRowSwitch
                  label="On Sale"
                  state={onSale}
                  setState={setOnSale}
                />
                <FilterRowSwitch
                  label="Staked $APE"
                  state={stakedApe}
                  setState={setStakedApe}
                />
                <FilterRowNumber
                  label="Min"
                  placeholder="0.00"
                  onChangeFn={minChanged}
                />
                <FilterRowNumber
                  label="Max"
                  placeholder="0.00"
                  onChangeFn={maxChanged}
                />

                <button
                  className="block mt-6 rounded-lg cursor-pointer border-2 px-3 py-2 ml-0 leading-tight bg-neutral-800 border-neutral-700 text-neutral-100 hover:bg-neutral-700 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </Dialog.Panel>
            </div>
          </Dialog>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-8 flex-1"
          >
            {nftInfo.map((nftItem, idx) => (
              <motion.div
                variants={item}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                key={nftItem.token_id + idx}
              >
                <CardSale
                  key={nftItem.token_id}
                  image_uri={nftItem.image_uri}
                  token_id={nftItem.token_id}
                  owner_address={nftItem.owner_address}
                  price={nftItem.price}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
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
