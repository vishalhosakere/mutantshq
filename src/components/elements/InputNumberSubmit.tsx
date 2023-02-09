import { Dispatch, SetStateAction } from "react";

interface InputNumberType {
  placeholder: string;
  onChangeFn: Dispatch<SetStateAction<string>> | ((str: string) => void) | null;
  onSubmitFn: Function | null;
}

export default function InputNumber({
  placeholder,
  onChangeFn,
  onSubmitFn,
}: InputNumberType) {
  return (
    <input
      type="number"
      placeholder={placeholder}
      className="border-neutral-700 border-2 bg-neutral-800 text-neutral-100 rounded-md pl-2 py-1 text-lg max-w-lg"
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
