import { useRef } from "react";
import HeroSection from "../Components/Home/HeroSection";
import FacebookIcon from "../Components/Icons/FacebookIcon";
import TwitterIcon from "../Components/Icons/TwitterIcon";
import InstagramIcon from "../Components/Icons/InstagramIcon";
import LinkedinIcon from "../Components/Icons/LinkedinIcon";
import YoutubeIcon from "../Components/Icons/YoutubeIcon";

export default function Home({ }) {
    const heroRef = useRef(null);

    return (
        <div className="flex flex-col relative">

            <main>
                <section className="h-[105vh] flex flex-col justify-between bg-linear-to-b from-[#BED3DC] via-[#60B4D9] via-[#1D87BC] to-[#1C5E8F] px-4 overflow-x-hidden">
                    <div className="flex flex-col items-center justify-center flex-1 gap-4">
                        <img src="/images/logo.png" className="h-25 md:h-35 w-auto max-w-full rounded-full" />

                        <div className="w-full h-14 text-center mt-2">
                            <span className="text-blue-950 text-5xl md:text-6xl lg:text-7xl font-semibold leading-4 [text-shadow:0px_4px_4px_rgb(0_0_0/0.25)]">Wave</span>
                            <span className="text-white text-5xl md:text-6xl lg:text-7xl font-semibold font-['Poppins'] leading-4 [text-shadow:0px_4px_4px_rgb(0_0_0/0.25)]">Rewards</span>
                        </div>

                        <div className="text-center text-blue-950 text-md md:text-lg font-medium leading-4 [text-shadow:0px_4px_4px_rgb(255_255_255/0.11)]">
                            Estás à espera de que para uma nova aventura?
                        </div>

                        <button
                            onClick={() => heroRef.current.scrollIntoView({ behavior: "smooth" })}
                            className="w-full sm:w-96 px-9 py-6 bg-white rounded-[36.55px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] outline-1 -outline-offset-1 outline-gray-300 flex justify-center items-center gap-2 cursor-pointer mt-6"
                        >
                            <div className="text-center text-blue-950 text-md md:text-lg font-medium leading-4">
                                Entrega-te às ondas e bora remar
                            </div>
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-2 mb-24">
                        <div className="text-center text-[#60B4D9] text-lg font-normal leading-4">
                            Copyright © 2025 WaveRewards | All Rights Reserved
                        </div>
                        <div className="flex flex-row gap-4">
                            <FacebookIcon />
                            <TwitterIcon />
                            <InstagramIcon />
                            <LinkedinIcon />
                            <YoutubeIcon />
                        </div>
                    </div>
                </section>

                <section ref={heroRef}>
                    <HeroSection />
                </section>
            </main>
        </div>
    );
}
