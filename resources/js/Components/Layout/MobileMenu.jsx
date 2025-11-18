import { Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function MobileMenu({ isOpen, setIsOpen, navLinks, authButtons }) {
    const { url } = usePage();

    return (
        <div
            className={`fixed top-20 left-0 w-full bg-gradient-to-b from-[#EAF5FA] to-[#A5D4E9] backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out overflow-hidden z-999 xl:hidden
            ${isOpen ? 'max-h-screen py-6 border-b border-gray-200' : 'max-h-0 py-0 border-none'}`}
        >
            <div className="flex flex-col items-center gap-6">

                {navLinks.map((item) => (
                    <Link
                        key={item.name}
                        href={route(item.route)}
                        onClick={() => setIsOpen(false)}
                        className={`text-lg font-medium transition-colors duration-300
                        ${url.startsWith(route(item.route).replace(window.location.origin, ''))
                                ? 'text-[#1D87BC] font-bold'
                                : 'text-[#1A3463] hover:text-[#1D87BC]'}
                        `}
                    >
                        {item.name}
                    </Link>
                ))}

                <div className="w-3/4 h-px bg-gray-200"></div>

                <div className="flex flex-col gap-4 w-full px-8">
                    {authButtons.map((btn, index) => (
                        <Link
                            key={index}
                            href={btn.href}
                            onClick={() => setIsOpen(false)}
                            className={`w-full py-3 rounded-full text-center font-bold text-md transition-all duration-300 shadow-sm
                            ${btn.primary
                                    ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                                    : 'bg-white border border-gray-300 text-cyan-600 hover:border-cyan-600'}`}
                        >
                            {btn.text}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}