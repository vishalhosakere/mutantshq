import { Switch } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import InputNumber from "./InputNumber";

interface IFilterRowNumber {
  label: string;
  minChanged: Dispatch<SetStateAction<string>> | ((str: string) => void) | null;
  maxChanged: Dispatch<SetStateAction<string>> | ((str: string) => void) | null;
}

export default function FilterRowNumber({
  label,
  minChanged,
  maxChanged,
}: IFilterRowNumber) {
  return (
    <div className="flex flex-col py-2">
      <div className="pb-1">{label}</div>
      <div className="flex justify-between item-center gap-3">
        <InputNumber
          placeholder="Min"
          onChangeFn={minChanged}
          classes="w-full"
        />
        <div className="self-center">-</div>
        <InputNumber
          placeholder="Max"
          onChangeFn={maxChanged}
          classes="w-full"
        />
      </div>
    </div>
  );
}
