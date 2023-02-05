import { classNames, range } from "@/utils/Utils";
import { FormEvent, useState } from "react";
import InputNumber from "./InputNumber";

interface PaginationType {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function ({
  items,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationType) {
  const pagesCount = Math.ceil(items / pageSize);
  if (pagesCount === 1 || pagesCount === 0) return null;
  const LBound = Math.min(Math.max(1, currentPage - 2), pagesCount - 4);
  const RBound = Math.max(Math.min(pagesCount, currentPage + 2), 5);
  const pages = range(LBound, RBound);

  const [pageNo, setPageNo] = useState("");
  const onSubmitFn = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const number = parseInt(pageNo);
    console.log(number, pageNo);
    if (pageNo !== "") {
      onPageChange(Math.min(Math.max(1, number), pagesCount));
    }
  };

  const onClickFn = (pageNumber: number) => {
    if (currentPage !== pageNumber) {
      window.scrollTo({ top: 0, behavior: "auto" });
      onPageChange(pageNumber);
    }
  };

  return (
    <div className="flex flex-col gap-3 flex-1 justify-center items-center">
      <nav aria-label="Page navigation">
        <ul className="inline-flex items-center gap-0">
          <li>
            <div
              className="block rounded-l-md cursor-pointer border-2 px-3 py-2 ml-0 leading-tight bg-neutral-800 border-neutral-700 text-neutral-100 hover:bg-neutral-700 hover:text-white"
              onClick={() => onClickFn(1)}
            >
              First
            </div>
          </li>
          {pages.map((page) => {
            return (
              <li key={page}>
                <div
                  className={classNames(
                    page === currentPage
                      ? "border-white text-white bg-neutral-900 pointer-events-none"
                      : "border-neutral-700 text-neutral-100 bg-neutral-800",
                    " cursor-pointer border-2 px-3 py-2 leading-tight  hover:bg-neutral-900 hover:text-white"
                  )}
                  onClick={() => onClickFn(page)}
                >
                  {page}
                </div>
              </li>
            );
          })}

          <li>
            <div
              className="block rounded-r-md cursor-pointer  border-2 px-3 py-2 ml-0 leading-tight bg-neutral-800 border-neutral-700 text-neutral-100 hover:bg-neutral-700 hover:text-white"
              onClick={() => onClickFn(pagesCount)}
            >
              Last
            </div>
          </li>
        </ul>
      </nav>
      <form className="flex gap-2">
        <InputNumber
          placeholder="Page #"
          onChangeFn={setPageNo}
          onSubmitFn={onSubmitFn}
        />
        <input
          className="block rounded-lg cursor-pointer  border-2 px-3 py-2 ml-0 leading-tight bg-neutral-800 border-neutral-700 text-neutral-100 hover:bg-neutral-700 hover:text-white"
          type="submit"
          onClick={onSubmitFn}
        />
      </form>
    </div>
  );
}
