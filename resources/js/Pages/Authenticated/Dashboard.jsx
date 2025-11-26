import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import TeamIcon from "../../Components/Icons/TeamIcon";
import ObjectiveIcon from "../../Components/Icons/ObjectiveIcon";
import PlayIcon from "../../Components/Icons/PlayIcon";
import PlusIcon from "../../Components/Icons/PlusIcon";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import { useState } from "react";
import MeteorologyCard from "../../Components/Dashboard/MeteorologyCard";
import PlayVideoIcon from "../../Components/Icons/PlayVideoIcon";

export default function Dashboard({ auth, weatherData, team }) {

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed w-full text-[#1A3463] pb-4 px-6 md:px-16 text-3xl md:text-4xl lg:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#DDEFF7] 3xl:to-[#E7F3F9]">
                Bem vindo
                <span className="hidden text-3xl md:text-4xl lg:text-5xl min-[480px]:inline">, {auth.user.name}</span>
            </h1>

            <div className="flex flex-row gap-8 w-full pt-20 px-4 md:px-16">
                <div className="flex flex-col gap-4 w-full lg:w-1/2">
                    <div className="flex flex-col lg:flex-row">
                        <div className="flex flex-col items-center text-center bg-white/40 p-2 pb-4 w-full mx-auto md:mx-0
 max-w-[600px] lg:max-w-[300px] relative border-b border-b-[#1A3463]/75 lg:border-b-0 lg:border-r lg:border-r-[#1A3463]/75 rounded-t-xl lg:rounded-t-none lg:rounded-l-xl">
                            <TeamIcon />
                            <h2 className="text-[#1C5E8F] text-lg font-semibold">A tua equipa</h2>
                            <h2 className="text-[#1D87BC] text-xl font-medium mt-3">{team.name}</h2>
                            <p className="text-[#1C5E8F] text-md mt-2"><span className="font-medium">Ranking: </span>{team.rank}º lugar</p>
                            <p className="text-[#1C5E8F] text-md mt-1"><span className="font-medium">Pontos totais: </span>{team.points} pontos</p>
                        </div>

                        <MeteorologyCard weatherData={weatherData} />
                    </div>

                    <div className="flex flex-col lg:flex-row">
                        <div className="flex flex-col items-center bg-white/40 p-2 pb-4 w-full mx-auto md:mx-0 max-w-[600px] lg:max-w-[300px] relative border-b border-b-[#1A3463]/75 lg:border-b-0 lg:border-r lg:border-r-[#1A3463]/75 rounded-t-xl lg:rounded-t-none lg:rounded-l-xl">
                            <ObjectiveIcon />
                            <h2 className="text-[#1C5E8F] text-lg font-semibold">Objetivo diário</h2>
                            <Link href={route("activities.index")} className="absolute top-2 right-2 p-1 rounded-full hover:bg-[#1D87BC]/20 transition">
                                <PlusIcon className="w-6 h-6 text-[#1D87BC]" />
                            </Link>
                        </div>

                        <div className="flex flex-col justify-center items-center bg-white/40 p-2 pb-4 w-full mx-auto md:mx-0
max-w-[600px] lg:max-w-[300px] border-t border-t-[#1A3463]/75 lg:border-t-0 lg:border-l lg:border-l-[#1A3463]/75 rounded-b-xl lg:rounded-l-none lg:rounded-r-xl relative">
                            <PlayIcon />
                            <h2 className="text-[#1C5E8F] text-lg font-semibold">Biblioteca</h2>
                            <div className="flex flex-col items-center bg-transparent pt-0.5 px-4 rounded-xl w-full md:max-w-[350px]">
                                <Link href={route('tutorials.show', 1)} className="w-full relative block rounded-xl overflow-hidden">
                                    <img
                                        src="/storage/tutorials/tutorial_1.png"
                                        className="w-full h-48 object-cover"
                                    />

                                    <div className="absolute inset-0 bg-black/55 flex justify-center items-center">
                                        <PlayVideoIcon className="w-14 h-14 text-white drop-shadow-2xl" />
                                    </div>
                                </Link>
                            </div>

                            <Link href={route("library.index")} className="absolute top-2 right-2 p-1 rounded-full hover:bg-[#1D87BC]/20 transition">
                                <PlusIcon className="w-6 h-6 text-[#1D87BC]" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
