import { Link, useForm } from "@inertiajs/react";
import RightArrowIcon from "../Components/Icons/RightArrowIcon";
import FlashMessages from "../Components/FlashMessages";
import FacebookIcon from "../Components/Icons/FacebookIcon";
import TwitterIcon from "../Components/Icons/TwitterIcon";
import InstagramIcon from "../Components/Icons/InstagramIcon";
import LinkedinIcon from "../Components/Icons/LinkedinIcon";
import YoutubeIcon from "../Components/Icons/YoutubeIcon";

export default function ForgotPassword() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#BED3DC] via-[#60B4D9] via-[#1D87BC] to-[#1C5E8F] text-white">
            <FlashMessages />

            <Link href={route('home.index', { hero: true })} className="flex items-center cursor-pointer pl-6 md:pl-14 pt-4">
                <img src="/images/logo.png" alt="Wave Rewards Logo" className="h-10 md:h-14 w-auto rounded-full" />
                <div className="w-40 md:w-64 h-7 md:h-9 mt-2">
                    <div className="w-36 md:w-56 h-5">
                        <span className="text-[#1A3463] text-xl md:text-3xl font-bold leading-none [text-shadow:0px_4px_4px_rgb(0_0_0/0.25)]">Wave</span>
                        <span className="text-[#1C679A] text-xl md:text-3xl font-bold leading-none [text-shadow:0px_4px_4px_rgb(0_0_0/0.25)]">Rewards</span>
                    </div>
                </div>
            </Link>

            <div className="w-full justify-center mx-auto items-center max-w-xl bg-white/40 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/30">
                <h2 className="text-[#1A3463] text-3xl font-bold mb-2 text-center [text-shadow:0px_2px_2px_rgb(0_0_0/0.1)]">
                    Recuperar Password
                </h2>
                <p className="text-[#1A3463]/80 text-center mb-8 text-sm">
                    Insere o teu email para recebers o link de recuperação
                </p>

                <form onSubmit={submit} className="flex flex-col gap-6">

                    <div className="relative w-full">
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full bg-black/5 border-b border-b-[#1C679A]/60 text-[#1A3463]/60 text-lg py-1 px-2 focus:outline-none rounded-t"
                        />

                        {errors.email && (
                            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>


                    <button
                        type="submit"
                        className={`flex flex-row items-center justify-between w-full h-12 bg-gradient-to-r from-sky-800/80 to-sky-900 rounded-full backdrop-blur-sm transition-all px-6 font-medium cursor-pointer mt-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${processing ? "opacity-70 cursor-not-allowed" : "hover:bg-sky-800"}`}
                        disabled={processing}
                    >
                        <div className="w-full flex items-center justify-center text-white font-bold tracking-wide">
                            {processing ? "A enviar..." : "Recuperar Password"}
                        </div>
                        {!processing && <RightArrowIcon className="text-white" />}
                    </button>
                </form>
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