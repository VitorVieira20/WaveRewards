import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import TeamIcon from "../../Components/Icons/TeamIcon";
import ObjectiveIcon from "../../Components/Icons/ObjectiveIcon";
import PlayIcon from "../../Components/Icons/PlayIcon";
import PlusIcon from "../../Components/Icons/PlusIcon";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function Dashboard({ auth }) {

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed w-full text-[#1A3463] pb-4 px-6 md:px-16 text-4xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#EAF5FA] md:to-[#DDEFF7] 3xl:to-[#E7F3F9]">
                Bem vindo, {auth.user.name}
            </h1>

            <div className="flex flex-row gap-8 w-full pt-20 px-4 md:px-16">
                <div className="flex flex-col gap-4 w-1/2">
                    <div className="flex flex-row">
                        <div className="flex flex-col items-center bg-white/40 p-2 pb-4 border-r border-r-[#1A3463]/75 rounded-l-xl w-full max-w-[300px] relative">
                            <TeamIcon />
                            <h2 className="text-[#1C5E8F] text-lg font-semibold">A tua equipa</h2>
                            <h2 className="text-[#1D87BC] text-xl font-medium mt-3">KayakHomies</h2>
                            <p className="text-[#1C5E8F] text-md mt-2"><span className="font-medium">Ranking:</span> 2º lugar</p>
                            <p className="text-[#1C5E8F] text-md mt-1"><span className="font-medium">Pontos totais:</span> 9000 pontos</p>
                        </div>

                        <div className="flex flex-col justify-center items-center bg-white/40 p-2 pb-4 border-l border-l-[#1A3463]/75 rounded-r-xl w-full max-w-[300px] relative">
                            <h2 className="text-[#1C5E8F] text-lg font-semibold">FAZER A</h2>
                            <h2 className="text-[#1C5E8F] text-lg font-semibold">METEOROLOGIA</h2>
                            <Link href={route('meteorology.index')} className="absolute top-2 right-2 p-1 rounded-full hover:bg-[#1D87BC]/20 transition">
                                <PlusIcon className="w-6 h-6 text-[#1D87BC]" />
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <div className="flex flex-col items-center bg-white/40 p-2 pb-4 border-r border-r-[#1A3463]/75 rounded-l-xl w-full max-w-[300px] relative">
                            <ObjectiveIcon />
                            <h2 className="text-[#1C5E8F] text-lg font-semibold">Objetivo diário</h2>
                            <Link href="/objetivo-diario" className="absolute top-2 right-2 p-1 rounded-full hover:bg-[#1D87BC]/20 transition">
                                <PlusIcon className="w-6 h-6 text-[#1D87BC]" />
                            </Link>
                        </div>

                        <div className="flex flex-col justify-center items-center bg-white/40 p-2 pb-4 border-l border-l-[#1A3463]/75 rounded-r-xl w-full max-w-[300px] relative">
                            <PlayIcon />
                            <h2 className="text-[#1C5E8F] text-lg font-semibold">Biblioteca</h2>
                            <svg width="256" height="162" viewBox="0 0 256 162" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="256" height="162" rx="10" fill="black" fill-opacity="0.4" />
                            </svg>

                            <Link href="/biblioteca" className="absolute top-2 right-2 p-1 rounded-full hover:bg-[#1D87BC]/20 transition">
                                <PlusIcon className="w-6 h-6 text-[#1D87BC]" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
