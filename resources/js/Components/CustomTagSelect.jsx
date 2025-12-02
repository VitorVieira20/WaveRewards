import { useState } from "react";

export default function CustomTagSelect({ text, options, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            <div className="rounded-md bg-white shadow-sm">
                <button
                    type="button"
                    onClick={toggleDropdown}
                    className="w-full px-4 py-2 text-left text-[#1C5E8F] bg-white hover:bg-gray-50 border-none rounded-md cursor-pointer flex justify-between items-center"
                >
                    <span className={options.length === 0 ? "text-[#1C5E8F]" : ""}>
                        {text}
                    </span>
                    <svg className="w-4 h-4 ml-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
            </div>

            {isOpen && (
                <ul className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-50 max-h-48 overflow-y-auto custom-scrollbar">
                    {options.length > 0 ? (
                        options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleOptionClick(option)}
                                className="px-4 py-2 cursor-pointer hover:bg-[#1C5E8F]/10 text-[#1C5E8F] text-md transition-colors"
                            >
                                {option.label.charAt(0).toUpperCase() + option.label.slice(1)}
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-gray-500 text-sm italic">
                            Sem opções disponíveis
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
}