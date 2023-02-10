import { classNames } from "@/utils/Utils";
import { Dispatch, SetStateAction } from "react";

interface InputNumberType {
  placeholder: string;
  onChangeFn: Dispatch<SetStateAction<string>> | ((str: string) => void) | null;
  classes: string;
}

export default function InputNumber({
  placeholder,
  onChangeFn,
  classes,
}: InputNumberType) {
  return (
    <input
      type="number"
      placeholder={placeholder}
      className={classNames(
        "border-grayish border-2 bg-neutral-800 text-whitish rounded-md pl-2 py-1 text-lg max-w-lg w-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        classes
      )}
      onChange={(e) => {
        if (onChangeFn !== null) {
          onChangeFn(e.target.value);
        }
      }}
    />
  );
}
