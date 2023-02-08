import { classNames } from "@/utils/Utils";
import { Listbox } from "@headlessui/react";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

interface ISortList {
  label: string;
  listItems: string[];
  selectedItem: string;
  setSelectedItem: any;
}
export default function SortList({
  label,
  listItems,
  selectedItem,
  setSelectedItem,
}: ISortList) {
  return (
    <div className="relative w-full flex flex-col py-2">
      <div className="pb-1">{label}</div>
      <Listbox value={listItems} onChange={setSelectedItem}>
        <Listbox.Button className="border-2 border-neutral-700 p-2 flex-1 rounded-lg bg-neutral-800 relative hover:bg-neutral-700">
          {selectedItem}
          <ArrowsUpDownIcon className="absolute right-3 top-0 w-5 h-full" />
        </Listbox.Button>
        <Listbox.Options className="flex-1 w-full divide-y divide-neutral-700 border-neutral-700 border-2 mt-1 rounded-lg">
          {listItems.map((item, idx) => (
            <Listbox.Option
              key={idx}
              value={item}
              className={classNames(
                " hover:bg-neutral-600 p-2 w-full items-center justify-center flex cursor-pointer",
                item === selectedItem ? "bg-neutral-700" : "bg-neutral-900",
                idx == 0 ? "rounded-t-lg" : "",
                idx == listItems.length - 1 ? "rounded-b-lg" : ""
              )}
            >
              {item}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
