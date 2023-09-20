import { Listbox, Transition } from "@headlessui/react";
import Option from "./option";
import { tw } from "../../../util/tw";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import React from "react";

type Props<T> = {
  selectedKey: T;
  selectedCaption: string;
  onChange: (val: T) => void;
  children:
    | React.ReactComponentElement<typeof Option>
    | React.ReactComponentElement<typeof Option>[];
};

const Select = <T,>({
  selectedKey,
  selectedCaption,
  onChange,
  children,
}: Props<T>) => {
  const c = Array.isArray(children) ? children : [children];
  return (
    <div className={tw("relative")}>
      <Listbox value={selectedKey} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button
            className={tw(
              "relative w-full rounded-lg",
              "py-2 pl-3 pr-10",
              "cursor-default shadow-md",
              "text-left",
              "bg-white",
              "focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2",
              "focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            )}
          >
            <span className="block truncate">{selectedCaption}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={React.Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={tw(
                "absolute",
                "mt-1 py-1 max-h-60 w-full min-w-fit",
                "overflow-auto rounded-md",
                "bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              )}
            >
              {c.map((option) => (
                <Listbox.Option
                  key={option.props.caption}
                  value={option.props.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.props.caption}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Select;
