import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

const navLinks = [
    { dropdown: false, name: 'Início', route: 'home.index' },
    { dropdown: false, name: 'Equipa', route: 'team.index' },
    { dropdown: false, name: 'Benefícios', route: 'benefits.index' },
    { dropdown: false, name: 'Rankings', route: 'rankings.index' },
    { dropdown: false, name: 'Contactos', route: 'contacts.index' },
];

export default function AuthenticatedLayoutNavbar({ auth }) {
    const [isOpen, setIsOpen] = useState(false);
    const { url } = usePage();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-linear-to-b from-[#FFFFFF] to-[#EAF5FA]">
            <div className="px-4 md:px-8">
                <div className="flex justify-between items-center h-20 md:h-20">
                    <Link href={route('home.index')} className="flex items-center cursor-pointer">
                        <img
                            src="/images/logo.png"
                            alt="Wave Rewards Logo"
                            className="h-10 md:h-14 w-auto rounded-full"
                        />
                        <div className="w-40 md:w-64 h-7 md:h-9 mt-2">
                            <div className="w-36 md:w-56 h-5"><span className="text-blue-950 text-xl md:text-3xl font-bold leading-none [text-shadow:0px_4px_4px_rgb(0_0_0/0.25)]">Wave</span><span className="text-cyan-600 text-xl md:text-3xl font-bold leading-none [text-shadow:0px_4px_4px_rgb(0_0_0/0.25)]">Rewards</span></div>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden xl:flex items-center gap-7 w-132 ml-30 2xl:ml-80 justify-start">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                href={route(item.route)}
                                className={`relative flex items-center justify-cente text-lg font-medium leading-none transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-blue-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left
                ${url.startsWith(item.href)
                                        ? 'text-blue-500'
                                        : 'text-blue-950 hover:text-blue-600 dark:hover:text-blue-400'}
            `}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden xl:flex items-center gap-1">
                        <Link
                            className="w-28 h-14"
                            href={route('profile.index')}
                        >
                            <div className="px-6 py-4 bg-white rounded-[30px] border border-gray-300 shadow-[0_4px_6px_rgba(0,0,0,0.15)] inline-flex justify-center items-center gap-2 transition-all duration-300 hover:shadow-[0_6px_10px_rgba(0,0,0,0.25)] hover:scale-105 hover:border-cyan-600">
                                <div className="text-center text-cyan-600 text-base font-bold leading-none hover:text-cyan-700 transition-colors duration-300">
                                    Perfil
                                </div>
                            </div>
                        </Link>

                        <Link
                            className="w-28 h-14"
                            href={route('auth.index', 'signup')}
                        >
                            <div className="px-6 py-4 bg-cyan-600 rounded-[30px] shadow-[0_4px_6px_rgba(0,0,0,0.15)] inline-flex justify-center items-center gap-2 transition-all duration-300 hover:bg-cyan-700 hover:shadow-[0_6px_10px_rgba(0,0,0,0.25)] hover:scale-105">
                                <div className="text-center text-white text-base font-bold leading-none transition-colors duration-300">
                                    Definições
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Mobile Navigation Buttons */}
                    <div className="xl:hidden flex items-center gap-4">
                        <button aria-label="Search" className='cursor-pointer hover:scale-110'>
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="15" cy="15" r="15" fill="#1D87BC" />
                                <path d="M14.3335 19.4504C17.279 19.4504 19.6668 17.0626 19.6668 14.1171C19.6668 11.1715 17.279 8.78372 14.3335 8.78372C11.3879 8.78372 9.00012 11.1715 9.00012 14.1171C9.00012 17.0626 11.3879 19.4504 14.3335 19.4504Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21.0003 20.7837L18.1003 17.8837" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>

                        </button>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className='cursor-pointer hover:scale-110'
                            aria-label="Toggle Menu"
                        >
                            <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="22.4301" y1="1" x2="1.00007" y2="0.999998" stroke="#1D87BC" strokeWidth="2" strokeLinecap="round" />
                                <line x1="22.4301" y1="9.55727" x2="1.00007" y2="9.55726" stroke="#1D87BC" strokeWidth="2" strokeLinecap="round" />
                                <line x1="22.4301" y1="18.0386" x2="1.00007" y2="18.0386" stroke="#1D87BC" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav >
    );
}
