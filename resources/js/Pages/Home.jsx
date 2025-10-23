import { Link } from "@inertiajs/react";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import Chatbot from "../Components/Chatbot/Chatbot";
import FacebookIcon from "../Components/Icons/FacebookIcon";
import TwitterIcon from "../Components/Icons/TwitterIcon";
import InstagramIcon from "../Components/Icons/InstagramIcon";
import LinkedinIcon from "../Components/Icons/LinkedinIcon";
import YoutubeIcon from "../Components/Icons/YoutubeIcon";
import ChatbotIcon from "../Components/Icons/ChatbotIcon";
import RightArrowIcon from "../Components/Icons/RightArrowIcon";

export default function Home() {
    const [chatbotOpen, setChatbotOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-blue-400">
            <Navbar />
            <main>
                <section className="pt-20 relative overflow-hidden">
                    {/* Hero */}
                    <div className="flex flex-col lg:flex-row">
                        <div className="md:8/11 lg:w-6/11 lg:pl-20 px-8 lg:px-0">
                            <div className="text-blue-950 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold lg:leading-[50px] xl:leading-[66px] [text-shadow:_0px_4px_4px_rgb(0_0_0_/_0.25)]">Uma equipa dedicada em transformar cada remada numa conquista</div>
                            <div className="w-full text-cyan-600 text-sm md:text-md lg:text-lg font-normal leading-loose mt-4">Descobre o poder das atividades náuticas através de uma experiência digital envolvente. Combinamos canoagem, gamificação e sustentabilidade para te motivar a criar hábitos saudáveis, proteger o oceano.</div>
                            <div className="flex items-center gap-4 mt-6 justify-center lg:justify-start flex-row">
                                <Link
                                    className="px-7 py-5 md:px-9 md:py-6 bg-cyan-600 rounded-[40px] flex justify-start items-center gap-2 shadow-[0_4px_6px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-cyan-700 hover:shadow-[0_8px_12px_rgba(0,0,0,0.25)] hover:scale-105 active:scale-95"
                                    href="/#"
                                >
                                    <div className="flex flex-row gap-1">
                                        <div className="text-center justify-start text-white text-md lg:text-lg font-bold leading-none">Vamos lá</div>
                                        <RightArrowIcon />
                                    </div>
                                </Link>
                                <Link
                                    className="px-7 py-5 md:px-9 md:py-6 bg-white rounded-[36.55px] border border-gray-300 flex justify-start items-center gap-2 shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-300 hover:border-cyan-600 hover:shadow-[0_6px_10px_rgba(0,0,0,0.2)] hover:scale-105 active:scale-95"
                                    href="/#"
                                >
                                    <div className="text-center justify-start text-blue-950 text-md lg:text-lg font-medium leading-none">Saber mais</div>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-10 lg:mt-0 w-full md:3/11 lg:w-5/11">
                            <div className="flex items-center justify-center">
                                <div className="w-[80%] lg:w-[60%] aspect-[5/3] lg:aspect-auto">
                                    <img
                                        src="images/home-page.png"
                                        alt="Home"
                                        className="w-full h-full object-cover rounded-3xl shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-shadow duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Copyright and socials */}
                    <div className="flex flex-col md:flex-row items-center justify-between px-2 lg:px-12 mt-10 gap-2 md:gap-0 py-2">
                        <div className="hidden md:flex text-sm md:text-md text-[#1A3463] font-normal ml-4 md:ml-8">Copyright © 2025 WaveRewards | All Rights Reserved</div>
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
                                className="transform hover:scale-110 transition duration-200 scale-85 md:scale-100 cursor-pointer">
                                <ChatbotIcon />
                            </button>

                            {chatbotOpen && (
                                <div>
                                    <div
                                        onClick={() => setChatbotOpen(false)}
                                        className="fixed inset-0 bg-black/60 transition-opacity duration-300"
                                    />
                                    <div className="fixed bottom-8 right-8 z-50 transition-all duration-500 opacity-100 scale-100">
                                        <Chatbot onClose={() => setChatbotOpen(false)} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="md:hidden text-sm md:text-md text-[#1A3463] font-normal mt-4 ml-4 md:ml-8">Copyright © 2025 WaveRewards | All Rights Reserved</div>
                    </div>
                </section>
            </main>
        </div>
    );
}