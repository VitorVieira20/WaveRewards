import { useState } from "react";
import { Link } from "@inertiajs/react";
import FacebookIcon from "../Components/Icons/FacebookIcon";
import LinkedinIcon from "../Components/Icons/LinkedinIcon";
import YoutubeIcon from "../Components/Icons/YoutubeIcon";
import InstagramIcon from "../Components/Icons/InstagramIcon";
import TwitterIcon from "../Components/Icons/TwitterIcon";
import FlashMessages from "../Components/FlashMessages";
import FormOverlay from "../Components/Auth/FormOverlay";
import SignInForm from "../Components/Auth/SignInForm";
import SignUpForm from "../Components/Auth/SignUpForm";

export default function Auth({ method }) {
    const [isLogin, setIsLogin] = useState(method === "login");

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#BED3DC] via-[#60B4D9] via-[#1D87BC] to-[#1C5E8F] text-white">
            <FlashMessages />

            <Link href={route('home.index', { hero: true })} className="flex items-center cursor-pointer pl-6 md:pl-14 pt-4">
                <img src="/images/logo.png" alt="Wave Rewards Logo" className="h-10 md:h-14 w-auto rounded-full" />
                <div className="w-40 md:w-64 h-7 md:h-9 mt-2">
                    <div className="w-36 md:w-56 h-5">
                        <span className="text-blue-950 text-xl md:text-3xl font-bold leading-none [text-shadow:0px_4px_4px_rgb(0_0_0/0.25)]">Wave</span>
                        <span className="text-cyan-600 text-xl md:text-3xl font-bold leading-none [text-shadow:0px_4px_4px_rgb(0_0_0/0.25)]">Rewards</span>
                    </div>
                </div>
            </Link>

            <div className="flex items-center justify-center flex-1 px-4 py-8 md:py-0">
                <div className="relative max-w-4xl w-full min-h-[600px] md:min-h-0 md:h-[450px] bg-white/40 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">

                    <SignInForm isLogin={isLogin} setIsLogin={setIsLogin} />
                    <SignUpForm isLogin={isLogin} setIsLogin={setIsLogin} />
                    <FormOverlay isLogin={isLogin} setIsLogin={setIsLogin} />

                </div>
            </div>

            <div className="flex flex-col items-center justify-center py-6">
                <div className="text-center text-[#60B4D9] text-sm md:text-md font-normal leading-none">
                    Copyright © 2025 WaveRewards | All Rights Reserved
                </div>
                <div className="flex flex-row gap-4 mt-4">
                    <Link href="/#" className="transform hover:scale-110 transition duration-200 scale-85 md:scale-100"><FacebookIcon /></Link>
                    <Link href="/#" className="transform hover:scale-110 transition duration-200 scale-85 md:scale-100"><TwitterIcon /></Link>
                    <Link href="/#" className="transform hover:scale-110 transition duration-200 scale-85 md:scale-100"><InstagramIcon /></Link>
                    <Link href="/#" className="transform hover:scale-110 transition duration-200 scale-85 md:scale-100"><LinkedinIcon /></Link>
                    <Link href="/#" className="transform hover:scale-110 transition duration-200 scale-85 md:scale-100"><YoutubeIcon /></Link>
                </div>
            </div>
        </div>
    );
}
