import { Switch } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";
import InputNumber from "./InputNumber";

interface IFilterRowNumber {
  label: string;
  placeholder: string;
  onChangeFn: Dispatch<SetStateAction<string>> | ((str: string) => void) | null;
}

export default function FilterRowNumber({
  label,
  placeholder,
  onChangeFn,
}: IFilterRowNumber) {
  return (
    <div className="py-4 flex justify-between item-center">
      <div className="flex items-center">{label}</div>
      <InputNumber placeholder={placeholder} onChangeFn={onChangeFn} />
    </div>
  );
}
