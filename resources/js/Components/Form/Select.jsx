import { Listbox, Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Fragment } from "react";

export default function Select({ label, value, onChange, options }) {
    return (
        <div className="flex items-center justify-between py-2">
            <span className="text-[#1A3463]/80 text-md font-medium mr-4">
                {label}
            </span>

            <Listbox value={value} onChange={onChange}>
                <div className="relative w-40">
                    <Listbox.Button
                        className="
                            relative w-full cursor-pointer rounded-full
                            bg-linear-to-r from-[#4FB3D9] to-[#1C82B0]
                            text-white px-4 py-1.5 text-sm font-medium
                            shadow-md flex items-center justify-between
                            focus:outline-none focus:ring-2 focus:ring-[#60B4D9] focus:ring-offset-2
                        "
                    >
                        <span>{options.find(o => o.value === value)?.label}</span>
                        <ChevronDown className="h-4 w-4 opacity-90" />
                    </Listbox.Button>

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className="
                                absolute mt-1 max-h-60 w-full overflow-auto rounded-xl
                                bg-white/90 backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-[#60B4D9] focus:ring-offset-2
                                z-50
                            "
                        >
                            {options.map((option) => (
                                <Listbox.Option
                                    key={option.value}
                                    value={option.value}
                                    className={({ active }) =>
                                        `
                                        cursor-pointer select-none py-2 px-4 text-sm
                                        rounded-lg focus:outline-none focus:ring-0.5 focus:ring-[#60B4D9] focus:ring-offset-0.5
                                        ${active ? "bg-[#D9EEF7] text-[#1C5E8F]" : "text-gray-700"}
                                        `
                                    }
                                >
                                    {option.label}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}