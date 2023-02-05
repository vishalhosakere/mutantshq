import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { classNames } from "@/utils/Utils";
import { usePathname } from "next/navigation";

export default function NavAsideButton({
  name,
  href,
}: {
  name: string;
  href: string;
}) {
  const currentRoute = usePathname();

  return (
    <Disclosure.Button
      key={name}
      as={Link}
      href={href}
      className={classNames(
        href == currentRoute
          ? "bg-neutral-900 text-white"
          : "text-gray-300 hover:bg-neutral-700 hover:text-white",
        "block px-3 py-2 rounded-md text-base font-bold"
      )}
      aria-current={href == currentRoute ? "page" : undefined}
    >
      {name}
    </Disclosure.Button>
  );
}
