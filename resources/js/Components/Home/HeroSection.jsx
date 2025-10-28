import { Link } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Chatbot from "../Chatbot/Chatbot";
import Navbar from "../Navbar";
import FacebookIcon from "../Icons/FacebookIcon";
import TwitterIcon from "../Icons/TwitterIcon";
import InstagramIcon from "../Icons/InstagramIcon";
import LinkedinIcon from "../Icons/LinkedinIcon";
import YoutubeIcon from "../Icons/YoutubeIcon";
import ChatbotIcon from "../Icons/ChatbotIcon";
import RightArrowIcon from "../Icons/RightArrowIcon";
import { route } from "ziggy-js";

export default function HeroSection({ auth }) {
    const [chatbotOpen, setChatbotOpen] = useState(false);
    const heroRef = useRef(null);
    const [marginTop, setMarginTop] = useState("-500px");

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

    const isHeroInView = useInView(heroRef, { margin: `0px 0px ${marginTop} 0px` });

    return (
        <section
            ref={heroRef}
            className="min-h-screen flex flex-col justify-between bg-linear-to-b from-[#FFFFFF] to-[#60B4D9] text-white pt-20 md:pt-[100px] lg:pt-[120px] relative overflow-hidden"
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 w-full z-50 ${chatbotOpen ? 'blur-xs' : 'blur-0'}`}
            >
                <Navbar auth={auth} />
            </motion.div>
            <div className={`${chatbotOpen ? 'blur-xs' : 'blur-0'} transition-all duration-300`}>
                <div className="flex flex-col lg:flex-row">
                    <div className="md:8/11 lg:w-6/11 lg:pl-20 px-8 lg:px-0">
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

                    <div className="mt-10 lg:mt-0 w-full md:3/11 lg:w-5/11">
                        <div className="flex items-center justify-center">
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

                <div className="flex flex-col md:flex-row items-center justify-between px-2 lg:px-12 mt-10 gap-2 md:gap-0 py-2">
                    <div className="hidden md:flex text-sm md:text-md text-[#1A3463] font-normal ml-4 md:ml-8">
                        Copyright © 2025 WaveRewards | All Rights Reserved
                    </div>
                    <div className="flex flex-row gap-2 md:gap-4">
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
                        <button
                            onClick={() => setChatbotOpen(true)}
                            className="transform hover:scale-110 transition duration-200 scale-85 md:scale-100 cursor-pointer"
                        >
                            <ChatbotIcon />
                        </button>

                    </div>
                </div>
                <div className="md:hidden text-sm md:text-md text-[#1A3463] font-normal mt-4 ml-4 md:ml-8">
                    Copyright © 2025 WaveRewards | All Rights Reserved
                </div>
            </div>

            {chatbotOpen && (
                <>
                    <div
                        onClick={() => setChatbotOpen(false)}
                        className="fixed inset-0 bg-black/60 transition-opacity duration-300"
                    />
                    <div className="fixed bottom-8 right-8 z-50 transition-all duration-500 opacity-100 scale-100">
                        <Chatbot onClose={() => setChatbotOpen(false)} />
                    </div>
                </>
            )}
        </section>
    );
}
