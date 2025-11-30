import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import ObjectiveIcon from "../Icons/ObjectiveIcon";
import PlusIcon from "../Icons/PlusIcon";

export default function DailyGoalCard({ goal }) {
    const currentMeters = goal ? parseFloat(goal.current_distance) : 0;
    const targetMeters = goal ? parseFloat(goal.target_distance) : 5000;

    const currentKm = (Math.floor((currentMeters / 1000) * 100) / 100);
    const targetKm = Number((targetMeters / 1000).toFixed(2));

    const percentage = targetMeters > 0
        ? Math.min(100, Math.max(0, Math.floor((currentMeters / targetMeters) * 100)))
        : 0;

    return (
        <div className="flex flex-col items-center bg-white/40 p-4 pb-6 w-full mx-auto md:mx-0 max-w-[600px] lg:max-w-[300px] relative border-b border-b-[#1A3463]/75 lg:border-b-0 lg:border-r lg:border-r-[#1A3463]/75 rounded-t-xl lg:rounded-t-none lg:rounded-l-xl backdrop-blur-sm">

            <div className="mb-2 flex flex-col items-center">
                <ObjectiveIcon />
                <h2 className="text-[#1C5E8F] text-lg font-semibold">Objetivo diário</h2>
            </div>

            <p className="text-[#1C5E8F] font-nomral text-lg mb-3">
                Remar {targetKm} km
            </p>

            <div className="w-full max-w-[220px] h-2 bg-[#EAF5FA] rounded-full overflow-hidden mb-2">
                <div
                    className="h-full bg-[#3699C5] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <p className="text-[#1C5E8F] font-medium text-sm mb-5 opacity-80">
                {currentKm} - {percentage}%
            </p>

            <div className={`
                px-6 py-2 rounded-[20px] text-white font-medium text-sm shadow-md
                ${goal?.is_completed
                    ? "bg-[#0E99A4]/70 shadow-[#000000]/20"
                    : "bg-[#1D5F90]/50 shadow-[#000000]/20"
                }
            `}>
                {goal?.is_completed ? "Objetivo Concluído!" : "Atividade a decorrer"}
            </div>
        </div>
    );
}