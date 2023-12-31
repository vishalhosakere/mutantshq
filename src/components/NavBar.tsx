"use client";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import NavButton from "./NavButton";
import NavAsideButton from "./NavAsideButton";
import { NavLinkItems } from "@/utils/NavLinkItems";

export default function NavBar() {
  return (
    <Disclosure
      as="nav"
      className="backdrop-blur-md bg-dark-gray/80 z-10 fixed w-full border-b-2 border-b-grayish/50"
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-2 md:px-10">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-whitish hover:bg-grayish focus-accent">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="absolute inset-y-0 items-center hidden md:flex">
                <h1 className="text-xl font-bold text-whitish">MUTANTS HQ</h1>
              </div>
              <div className="flex flex-1 items-center justify-center md:justify-end lg:justify-center">
                <div className="flex flex-shrink-0 items-center md:hidden">
                  <h1 className="text-xl font-bold text-whitish">MUTANTS HQ</h1>{" "}
                </div>
                <div className="hidden md:ml-6 md:block">
                  <div className="flex space-x-4 pt-0.5">
                    {NavLinkItems.map(
                      (item, idx) =>
                        item.navbar && (
                          <NavButton
                            key={idx}
                            name={item.name}
                            href={item.href}
                          />
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {NavLinkItems.map(
                (item, idx) =>
                  item.navbar && (
                    <NavAsideButton
                      key={idx}
                      name={item.name}
                      href={item.href}
                    />
                  )
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
