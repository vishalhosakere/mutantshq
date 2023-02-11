import { Switch } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";

interface IFilterRowSwitch {
  label: string;
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

export default function FilterRowSwitch({
  label,
  state,
  setState,
}: IFilterRowSwitch) {
  return (
    <div className="py-4 flex justify-between item-center">
      <div className="flex items-center">{label}</div>
      <div className="w-20 flex justify-center">
        <Switch
          checked={state}
          onChange={setState}
          className={`${state ? "bg-accent" : "bg-accent-darker"}
          relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-accent`}
        >
          <span className="sr-only">{`Set ${label} filter`}</span>
          <span
            aria-hidden="true"
            className={`${
              state ? "translate-x-7 bg-black" : "translate-x-0 bg-white"
            }
            pointer-events-none inline-block h-6 w-6 transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    </div>
  );
}
