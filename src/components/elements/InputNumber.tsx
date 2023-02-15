import { classNames } from "@/utils/Utils";
import { Dispatch, SetStateAction } from "react";

interface InputNumberType {
  placeholder: string;
  onChangeFn: Dispatch<SetStateAction<string>> | ((str: string) => void) | null;
  classes: string;
  value?: number;
}

export default function InputNumber({
  placeholder,
  onChangeFn,
  classes,
  value,
}: InputNumberType) {
  return (
    <input
      type="number"
      placeholder={placeholder}
      className={classNames(
        "border-grayish border-2 bg-dark-gray text-whitish rounded-md pl-2 py-1 text-lg max-w-lg w-20 focus-accent",
        classes
      )}
      value={value}
      onChange={(e) => {
        if (onChangeFn !== null) {
          onChangeFn(e.target.value);
        }
      }}
    />
  );
}
