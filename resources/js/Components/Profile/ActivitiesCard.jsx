import { CheckCircleIcon } from "lucide-react";
import LocationPinIcon from "../Icons/LocationPinIcon";
import PlusIcon from "../Icons/PlusIcon";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";


export default function ActivitiesCard({ activities }) {
    return (
        <div className="bg-white/40 w-full lg:w-3/5 rounded-2xl p-4 h-full flex flex-col shadow-sm relative">

            <div className="flex justify-between items-center">
                <h2 className="text-[#1C5E8F] text-lg font-semibold leading-none">Histórico de atividades</h2>
                <Link href={route("activities.history")} className="text-[#1C5E8F] hover:text-[#1A3463] transition cursor-pointer">
                    <PlusIcon />
                </Link>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 overflow-x-auto">
                {activities.map((activity, index) => (
                    <div key={index} className="flex flex-row justify-between items-end w-full lg:w-1/2 min-w-[300px] border-b lg:border-b-0 lg:border-r border-[#1C5E8F]/20 last:border-0 p-2 pt-">

                        <div className="flex flex-col gap-1 text-sm text-[#1A3463]">

                            <div className="flex items-center gap-1 text-[#1C5E8F] font-medium mt-2">
                                📍
                                <span>{activity.date}</span>
                            </div>

                            <p className="font-normal text-[#1C5E8F]"><span className="font-medium text-[#1C5E8F] ml-2">Atividade:</span> {activity.title}</p>
                            <p className="font-normal text-[#1C5E8F]"><span className="font-medium text-[#1C5E8F] ml-2">Distância:</span> {activity.distance} | <span className="font-medium text-[#1C5E8F]">Duração:</span> {activity.duration}</p>
                            <p className="font-normal text-[#1C5E8F]"><span className="font-medium text-[#1C5E8F] ml-2">Pontos ganhos:</span> +{activity.points}</p>

                            <div className="flex items-center gap-1">
                                <span className="font-medium text-[#1C5E8F] ml-2">Desafio completado:</span>
                                <span className="font-normal text-[#1C5E8F]">{activity.challenge}</span>
                                ✅
                            </div>

                            <div className="mt-2 w-full h-16 relative opacity-80">
                                <svg viewBox="0 0 200 60" className="w-full h-full drop-shadow-sm">
                                    <path d="M10,50 Q30,55 50,45 T90,40 T130,20 T180,10" fill="none" stroke="#84CCEB" strokeWidth="4" strokeLinecap="round" />
                                    <circle cx="10" cy="50" r="4" fill="#4A90E2" />
                                    <circle cx="180" cy="10" r="4" fill="#4A90E2" />
                                    <path d="M180,10 L180,-5 L190,0 L180,5" fill="#4A90E2" />
                                </svg>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}