import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "../../../Layouts/AuthenticatedLayout";
import LeftArrowIcon from "../../../Components/Icons/LeftArrowIcon";

export default function ActivitiesHistory({ auth, activities }) {

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed flex gap-3 w-full text-[#1A3463] pb-4 px-6 md:px-16 text-3xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#DDEFF7] 3xl:to-[#E7F3F9]">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex items-center cursor-pointer"
                >
                    <LeftArrowIcon color="#1C5E8F" />
                </button>

                Histórico de Atividades
            </h1>

            <div className="flex flex-col gap-12 w-full pt-20 px-4 md:px-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {activities.map((activity) => (
                        <Link
                            key={activity.id}
                            href={route('activities.show', activity.activity_id)}
                            className="group block"
                        >
                            <div className="
                            bg-[#DDEFF7]/60 backdrop-blur-sm
                            border border-white/40
                            p-3 rounded-2xl
                            h-full flex flex-col
                            shadow-sm hover:shadow-md
                            transition-all duration-300
                            hover:-translate-y-1
                        ">
                                <div className="w-full aspect-[4/3] overflow-hidden rounded-xl bg-white">
                                    <img
                                        src={activity.images[0]}
                                        alt={activity.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <div className="mt-3 text-center flex-grow flex items-center justify-center px-1">
                                    <h3 className="text-[#1D87BC] font-semibold text-lg leading-tight">
                                        {activity.title}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

        </AuthenticatedLayout >
    );
}