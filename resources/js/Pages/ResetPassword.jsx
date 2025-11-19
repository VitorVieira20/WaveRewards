import { Link, useForm } from "@inertiajs/react";
import FacebookIcon from "../Components/Icons/FacebookIcon";
import InstagramIcon from "../Components/Icons/InstagramIcon";
import LinkedinIcon from "../Components/Icons/LinkedinIcon";
import RightArrowIcon from "../Components/Icons/RightArrowIcon";
import TwitterIcon from "../Components/Icons/TwitterIcon";
import YoutubeIcon from "../Components/Icons/YoutubeIcon";
import FlashMessages from "../Components/FlashMessages";

export default function ResetPassword({ token }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#BED3DC] via-[#60B4D9] via-[#1D87BC] to-[#1C5E8F] text-white px-4">
            <FlashMessages />

            <Link href={route('home.index')} className="flex items-center justify-center mb-8 cursor-pointer">
                <img src="/images/logo.png" alt="Wave Rewards Logo" className="h-12 w-auto rounded-full shadow-md" />
                <div className="ml-3">
                    <span className="text-[#1A3463] text-2xl font-bold leading-none drop-shadow-md">Wave</span>
                    <span className="text-[#1C679A] text-2xl font-bold leading-none drop-shadow-md">Rewards</span>
                </div>
            </Link>

            <div className="w-full justify-center mx-auto items-center max-w-xl bg-white/40 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/30">
                <h2 className="text-[#1A3463] text-3xl font-bold mb-2 text-center [text-shadow:0px_2px_2px_rgb(0_0_0/0.1)]">
                    Nova Password
                </h2>
                <p className="text-[#1A3463]/80 text-center mb-8 text-sm">
                    Define a tua nova palavra-passe
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
                            required
                        />
                        {errors.email && errors.email === "passwords.user" && <p className="text-red-500 text-sm mt-1 font-medium">O email e o token não coincidem</p>}
                        {errors.email && errors.email !== "passwords.user" && <p className="text-red-500 text-sm mt-1 font-medium">{errors.email}</p>}
                    </div>

                    <div className="relative w-full">
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full bg-transparent border-b border-b-[#1C679A]/60 text-[#1A3463] text-lg py-1 px-2 transition-all duration-300 focus:outline-none placeholder-[#1A3463]/50 focus:border-blue-900"
                            placeholder="Nova Password"
                            required
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1 font-medium">{errors.password}</p>}
                    </div>

                    <div className="relative w-full">
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full bg-transparent border-b border-b-[#1C679A]/60 text-[#1A3463] text-lg py-1 px-2 transition-all duration-300 focus:outline-none placeholder-[#1A3463]/50 focus:border-blue-900"
                            placeholder="Confirmar Password"
                            required
                        />
                        {errors.password_confirmation && <p className="text-red-500 text-sm mt-1 font-medium">{errors.password_confirmation}</p>}
                    </div>

                    <button
                        type="submit"
                        className={`flex flex-row items-center justify-between w-full h-12 bg-gradient-to-r from-sky-800/80 to-sky-900 rounded-full backdrop-blur-sm transition-all px-6 font-medium cursor-pointer mt-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${processing ? "opacity-70 cursor-not-allowed" : "hover:bg-sky-800"}`}
                        disabled={processing}
                    >
                        <div className="w-full flex items-center justify-center text-white font-bold tracking-wide">
                            {processing ? "A alterar..." : "Alterar Password"}
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