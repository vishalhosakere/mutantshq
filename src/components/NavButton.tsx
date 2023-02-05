import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavButton({
  name,
  href,
  isLogo,
}: {
  name: string;
  href: string;
  isLogo?: boolean;
}) {
  const currentRoute = usePathname();

  return (
    <Link
      key={name}
      href={href}
      className={classNames(
        href == currentRoute
          ? "bg-neutral-900 text-white"
          : "text-gray-300 hover:bg-neutral-700 hover:text-white",
        "px-3 py-2 rounded-md text-sm font-bold"
      )}
      aria-current={href == currentRoute ? "page" : undefined}
    >
      {name}
    </Link>
  );
}
