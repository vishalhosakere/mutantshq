import { classNames } from "@/utils/Utils";
import { Dispatch, SetStateAction } from "react";

interface InputNumberType {
  placeholder: string;
  onChangeFn: Dispatch<SetStateAction<string>> | ((str: string) => void) | null;
  onSubmitFn: Function | null;
  classes?: string;
}

export default function InputNumber({
  placeholder,
  onChangeFn,
  onSubmitFn,
  classes,
}: InputNumberType) {
  return (
    <input
      type="number"
      placeholder={placeholder}
      className={classNames(
        "border-grayish border-2 bg-dark-gray text-whitish rounded-md pl-2 py-1 text-lg max-w-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        classes === undefined ? "" : classes
      )}
      onChange={(e) => {
        if (onChangeFn !== null) {
          onChangeFn(e.target.value);
        }
      }}
      onSubmit={(e) => {
        if (onSubmitFn !== null) {
          onSubmitFn(e);
        }
      }}
    />
  );
}
