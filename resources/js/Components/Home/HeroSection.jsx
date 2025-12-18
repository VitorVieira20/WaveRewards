import { Link } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion"; // <--- Adicionado AnimatePresence
import Chatbot from "../Chatbot/Chatbot";
import FacebookIcon from "../Icons/FacebookIcon";
import TwitterIcon from "../Icons/TwitterIcon";
import InstagramIcon from "../Icons/InstagramIcon";
import LinkedinIcon from "../Icons/LinkedinIcon";
import YoutubeIcon from "../Icons/YoutubeIcon";
import ChatbotIcon from "../Icons/ChatbotIcon";
import RightArrowIcon from "../Icons/RightArrowIcon";
import { route } from "ziggy-js";
import LayoutNavbar from "../Layout/Navbar";

export default function HeroSection({ auth }) {
    const [chatbotOpen, setChatbotOpen] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const heroRef = useRef(null);
    const [marginTop, setMarginTop] = useState("-500px");

    const isHeroInView = useInView(heroRef, { margin: `0px 0px ${marginTop} 0px` });

    useEffect(() => {
        function updateMargin() {
            const width = window.innerWidth;
            if (width >= 1024) {
                setMarginTop("-500px");
            } else if (width >= 768) {
                setMarginTop("-600px");
            } else {
                setMarginTop("-680px");
            }
        }
        updateMargin();
        window.addEventListener("resize", updateMargin);
        return () => window.removeEventListener("resize", updateMargin);
    }, []);

    return (
        <section
            ref={heroRef}
            className="min-h-screen flex flex-col bg-linear-to-b from-[#FFFFFF] to-[#60B4D9] text-white pt-20 md:pt-[100px] lg:pt-[120px] relative overflow-hidden"
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 w-full z-50 ${chatbotOpen ? 'blur-xs' : 'blur-0'}`}
            >
                <LayoutNavbar auth={auth} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isHeroInView
                    ? { opacity: 1, scale: 1, pointerEvents: "auto" }
                    : { opacity: 0, scale: 0.8, pointerEvents: "none" }
                }
                transition={{ duration: 0.8 }}
                className={`fixed top-28 right-4 z-40 flex flex-col items-end gap-2 ${chatbotOpen ? 'blur-xs pointer-events-none' : ''}`}
            >
                <div className="relative flex items-center">
                    <AnimatePresence>
                        {showHelp && !chatbotOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-[#60B4D9]/30 text-blue-900 p-3 pr-6 rounded-xl shadow-lg text-sm max-w-[420px] relative mb-1 mr-4 backdrop-blur-sm"
                            >

                                <div className="font-semibold text-lg text-[#1A3463] mb-1 mr-2">Olá! Precisa de ajuda com algo?</div>
                                <div className="font-medium text-xs text-[#1A3463]">Clique para falar com o nosso chatbot</div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button
                        onMouseEnter={() => setShowHelp(true)}
                        onMouseLeave={() => setShowHelp(false)}
                        onClick={() => {
                            setChatbotOpen(true);
                            setShowHelp(false);
                        }}
                        className="bg-[#1A3463] p-3 rounded-full hover:scale-110 transition-transform duration-300 shadow-lg cursor-pointer flex items-center justify-center w-14 h-14 z-50"
                    >
                        <div className="text-white scale-125">
                            <ChatbotIcon />
                        </div>
                    </button>
                </div>
            </motion.div>

            <div className={`flex-grow ${chatbotOpen ? 'blur-xs' : 'blur-0'} transition-all duration-300 pb-24`}>
                <div className="flex flex-col lg:flex-row h-full">
                    <div className="md:8/11 lg:w-6/11 lg:pl-20 px-8 lg:px-0 flex flex-col justify-center">
                        <div className="text-blue-950 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold lg:leading-[50px] xl:leading-[66px] [text-shadow:0px_4px_4px_rgb(0_0_0/0.25)]">
                            Uma equipa dedicada em transformar cada remada numa conquista
                        </div>
                        <div className="w-full text-cyan-600 text-sm md:text-md lg:text-lg font-normal leading-loose mt-4">
                            Descobre o poder das atividades náuticas através de uma experiência digital envolvente. Combinamos canoagem, gamificação e sustentabilidade para te motivar a criar hábitos saudáveis, proteger o oceano.
                        </div>
                        <div className="flex items-center gap-4 mt-6 justify-center lg:justify-start flex-row">
                            <Link
                                className="px-6 py-4 lg:px-9 lg:py-6 bg-cyan-600 rounded-[40px] flex justify-start items-center gap-2 shadow-[0_4px_6px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-cyan-700 hover:shadow-[0_8px_12px_rgba(0,0,0,0.25)] hover:scale-105 active:scale-95"
                                href={route('auth.index', 'signup')}
                            >
                                <div className="flex flex-row gap-1">
                                    <h2 className="text-center justify-start text-white text-md lg:text-lg font-bold leading-none">Vamos lá</h2>
                                    <RightArrowIcon />
                                </div>
                            </Link>
                            <Link
                                className="px-6 py-4 lg:px-9 lg:py-6 bg-white rounded-[36.55px] border border-gray-300 flex justify-start items-center gap-2 shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-300 hover:border-cyan-600 hover:shadow-[0_6px_10px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95"
                                href={route('about.index')}
                            >
                                <div className="text-center justify-start text-blue-950 text-md lg:text-lg font-medium leading-none">Sobre nós</div>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-10 lg:mt-0 w-full md:3/11 lg:w-5/11 flex items-center">
                        <div className="flex items-center justify-center w-full">
                            <div className="w-[80%] lg:w-[60%] aspect-[5/2] lg:aspect-auto">
                                <img
                                    src="images/home-page.png"
                                    alt="Home"
                                    className="w-full h-full object-cover rounded-3xl shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-shadow duration-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`absolute bottom-0 w-full left-0 ${chatbotOpen ? 'blur-xs' : 'blur-0'} transition-all duration-300`}>
                <div className="flex flex-col md:flex-row items-center justify-between px-2 lg:px-12 py-6">
                    <div className="text-sm md:text-md text-[#1A3463] font-normal ml-4 md:ml-8 text-center md:text-left">
                        Copyright © 2025 WaveRewards | All Rights Reserved
                    </div>
                    <div className="flex flex-row items-center gap-2 md:gap-4 mt-2 md:mt-0 mr-4 md:mr-8">
                        <Link href="/#" className="transform hover:scale-110 transition duration-200 scale-85 md:scale-100">
                            <FacebookIcon />
                        </Link>
                        <Link href="/#" className="transform hover:scale-110 transition duration-200 scale-85 md:scale-100">
                            <TwitterIcon />
                        </Link>
                        <Link href="/#" className="transform hover:scale-110 transition duration-200 scale-85 md:scale-100">
                            <InstagramIcon />
                        </Link>
                        <Link href="/#" className="transform hover:scale-110 transition duration-200 scale-85 md:scale-100">
                            <LinkedinIcon />
                        </Link>
                        <Link href="/#" className="transform hover:scale-110 transition duration-200 scale-85 md:scale-100">
                            <YoutubeIcon />
                        </Link>
                    </div>
                </div>
            </div>

            {chatbotOpen && (
                <>
                    <div
                        onClick={() => setChatbotOpen(false)}
                        className="fixed inset-0 bg-black/60 transition-opacity duration-300 z-50"
                    />
                    <div className="fixed bottom-4 right-4 z-50 transition-all duration-500 opacity-100 scale-100">
                        <Chatbot onClose={() => setChatbotOpen(false)} />
                    </div>
                </>
            )}
        </section>
    );
}