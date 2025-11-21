import { Link, useForm } from "@inertiajs/react"; // Adicionei useForm se quiseres tornar o form funcional depois
import AuthenticatedLayout from "../../../Layouts/AuthenticatedLayout";
import LeftArrowIcon from "../../../Components/Icons/LeftArrowIcon";
import LocationPinIcon from "../../../Components/Icons/LocationPinIcon";
import ClockIcon from "../../../Components/Icons/ClockIcon";
import HeartIcon from "../../../Components/Icons/HeartIcon";
import StarIcon from "../../../Components/Icons/StarIcon";
import PlusIcon from "../../../Components/Icons/PlusIcon";

export default function ActivityShow({ auth, activity }) {

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed w-full text-[#1A3463] pb-4 px-6 md:px-16 text-3xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#DDEFF7] 3xl:to-[#E7F3F9] flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex items-center md:mt-3 lg:mt-0 cursor-pointer"
                >
                    <LeftArrowIcon color="#1C5E8F" />
                </button>


                <span>
                    <span className="hidden lg:inline">Atividade - </span>
                    <span className="inline font-light text-[24px] md:text-[30px] lg:text-[45px]" style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.35)" }}>
                        {activity.title}
                    </span>
                </span>
            </h1>

            <div className="
                w-full pt-24 md:pt-20 lg:pt-32 px-4 md:px-16 pb-10
                grid grid-cols-1 lg:grid-cols-12 gap-6
            ">

                <div className="lg:col-span-3 flex flex-col gap-4">
                    {activity.images && activity.images[0] && (
                        <img
                            src={activity.images[0]}
                            className="w-full h-48 lg:h-56 object-cover rounded-2xl shadow-md"
                            alt="Imagem principal"
                        />
                    )}
                    {activity.images && activity.images[1] && (
                        <img
                            src={activity.images[1]}
                            className="w-full h-48 lg:h-56 object-cover rounded-2xl shadow-md"
                            alt="Imagem secundária"
                        />
                    )}
                </div>

                <div className="lg:col-span-5 bg-[#FFFFFF]/40 backdrop-blur-sm rounded-2xl p-6 shadow-sm flex flex-col h-full">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="text-[#1C5E8F] text-2xl md:text-3xl font-semibold">
                                Informação da atividade
                            </h2>
                            <StarIcon className="w-6 h-6 text-[#1C5E8F] cursor-pointer hover:fill-current" />
                        </div>

                        <h3 className="text-[#1C5E8F] font-semibold text-lg mb-1">Descrição:</h3>
                        <p className="text-[#1D87BC] text-sm md:text-md leading-relaxed mb-6 text-justify">
                            {activity.description}
                        </p>

                        <div className="space-y-3 text-[#1C5E8F] text-sm md:text-md font-medium">
                            <p><span className="font-semibold">Nível:</span> <span className="font-normal text-[#1D87BC]">{activity.level}</span></p>
                            <p><span className="font-semibold">Duração Média:</span> <span className="font-normal text-[#1D87BC]">{activity.duration} minutos</span></p>
                            <p><span className="font-semibold">Material Necessário:</span> <span className="font-normal text-[#1D87BC]">{activity.material}</span></p>
                            <p><span className="font-semibold">Benefícios:</span> <span className="font-normal text-[#1D87BC]">{activity.benefits}</span></p>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-3 text-[#1D87BC] font-medium text-sm">
                        <div className="flex items-center gap-3">
                            <div className="w-5 ml-[3px]"><LocationPinIcon color="#1D87BC" /></div>
                            <span>{activity.location}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-5"><ClockIcon color="#1D87BC" /></div>
                            <span>{activity.datetime}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-5"><HeartIcon color="#1D87BC" /></div>
                            <span>{activity.registered_count} pessoas inscritas</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 bg-[#FFFFFF]/40 backdrop-blur-sm rounded-2xl p-6 shadow-sm h-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-[#1C5E8F] text-2xl md:text-3xl font-semibold">
                            Registo da atividade
                        </h2>
                        <PlusIcon className="w-6 h-6 text-[#1C5E8F] cursor-pointer" />
                    </div>

                    <form className="flex flex-col gap-3">

                        <div className="flex flex-col gap-1">
                            <label className="text-[#1C5E8F] text-sm font-semibold">Distância percorrida (km ou m):</label>
                            <input
                                type="text"
                                placeholder="15 km"
                                className="rounded-full bg-white border-none py-1 px-4 text-sm text-[#000000]/30 focus:outline-none focus:ring-1 focus:ring-[#1C5E8F]/40"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[#1C5E8F] text-sm font-semibold">Tempo total de prática (minutos):</label>
                            <input
                                type="text"
                                placeholder="45 min"
                                className="rounded-full bg-white border-none py-1 px-4 text-sm text-[#000000]/30 focus:outline-none focus:ring-1 focus:ring-[#1C5E8F]/40"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[#1C5E8F] text-sm font-semibold">Calorias estimadas gastas:</label>
                            <input
                                type="text"
                                placeholder="298 calorias"
                                className="rounded-full bg-white border-none py-1 px-4 text-sm text-[#000000]/30 focus:outline-none focus:ring-1 focus:ring-[#1C5E8F]/40"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[#1C5E8F] text-sm font-semibold">Frequência cardíaca média:</label>
                            <input
                                type="text"
                                placeholder="98 bpm"
                                className="rounded-full bg-white border-none py-1 px-4 text-sm text-[#000000]/30 focus:outline-none focus:ring-1 focus:ring-[#1C5E8F]/40"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[#1C5E8F] text-sm font-semibold">Grau de esforço (1-10):</label>
                            <input
                                type="text"
                                placeholder="5"
                                className="rounded-full bg-white border-none py-1 px-4 text-sm text-[#000000]/30 focus:outline-none focus:ring-1 focus:ring-[#1C5E8F]/40"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-[#1C5E8F] text-sm font-semibold">Observações/comentários pessoais:</label>
                            <textarea
                                rows="3"
                                placeholder="Escreve a tua mensagem..."
                                className="rounded-2xl bg-white border-none py-2 px-4 text-sm text-[#000000]/30 focus:outline-none focus:ring-1 focus:ring-[#1C5E8F]/40 resize-none"
                            ></textarea>
                        </div>

                        <div className="mt-2 flex justify-center">
                            <button type="button" className="bg-[#6EA8C5] hover:bg-[#5A92AF] text-white font-medium py-2 px-6 rounded-full shadow-md transition duration-200 cursor-pointer">
                                Registar atividade
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}