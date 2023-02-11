"use client";
import { useState } from "react";
import NftCard, { INftCard as NftInfo } from "./NftCard";
import InputNumberSubmit from "./elements/InputNumberSubmit";
import Pagination from "./Pagination";
import { motion } from "framer-motion";

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

export default function GalleryNoFilter({ allData }: { allData: NftInfo[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const [search, setSearch] = useState("");
  const data = allData.filter((el) => {
    return el.token_id.startsWith(search);
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
  return (
    <div className="">
      <div className="mx-auto max-w-full py-10 flex flex-col gap-4">
        <div className="flex mx-10 pb-10 gap-3 justify-center flex-col lg:flex-row lg:gap-10">
          <InputNumberSubmit
            placeholder="Search Token ID"
            onChangeFn={searchChanged}
            onSubmitFn={null}
            classes="w-full self-center"
          />
          <div className="flex justify-center items-center flex-shrink-0">
            <p>{resultsString()}</p>
          </div>
        </div>
        <h2 className="sr-only">MAYC NFTs</h2>

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
              className="flex justify-center"
            >
              <NftCard
                key={nftItem.token_id}
                image_uri={nftItem.image_uri}
                token_id={nftItem.token_id}
                owner_address={nftItem.owner_address}
                short_card={true}
              />
            </motion.div>
          ))}
        </motion.div>
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
