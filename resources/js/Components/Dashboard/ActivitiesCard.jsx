import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function ActivitiesCard({ activities }) {

    return (
        <div className="flex flex-col items-center bg-white/40 p-4 pb-6 px-6 h-full w-full mx-auto md:mx-0 max-w-[700px] rounded-xl">
            <div className="w-full flex flex-row justify-between mb-2">
                <h2 className="text-[#1C5E8F] text-lg font-semibold">Atividades</h2>
                <Link 
                    href={route('activities.index')}
                    className="text-[#1C5E8F] text-sm font-medium"
                >
                    Ver mais atividades
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {activities.map((activity) => (
                    <Link href={route('activities.show', activity.id)} key={activity.id} className="flex bg-[#1D87BC]/40 p-3 rounded-xl flex-col gap-2 group cursor-pointer">
                        <div className="w-full aspect-4/3 rounded-xl overflow-hidden shadow-sm">
                            <img 
                                src={activity.images[0]} 
                                alt={activity.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                    e.target.src = "https://placehold.co/400x300/87C5E0/1A3463?text=Atividade";
                                }}
                            />
                        </div>
                        <p className="text-[#1C5E8F] text-center text-sm font-">
                            {activity.title}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}