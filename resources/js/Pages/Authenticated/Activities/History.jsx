import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "../../../Layouts/AuthenticatedLayout";
import LeftArrowIcon from "../../../Components/Icons/LeftArrowIcon";
import { route } from "ziggy-js";

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

            <div className="flex flex-col gap-12 w-full pt-20 px-4 md:px-16 pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {activities.map((activity) => {
                        const isSystemActivity = !!activity.activity_id;

                        const displayTitle = isSystemActivity 
                            ? activity.title 
                            : activity.custom_title;

                        let displayImage = "https://placehold.co/600x400/DDEFF7/1A3463?text=Sem+Imagem"; // Imagem padrão

                        if (isSystemActivity && activity.images && activity.images.length > 0) {
                            displayImage = activity.images[0];
                        } else if (!isSystemActivity && activity.image) {
                            displayImage = activity.image;
                        }

                        const Wrapper = isSystemActivity ? Link : 'div';
                        const wrapperProps = isSystemActivity ? {
                            href: route('activities.show', activity.activity_id),
                            className: "group block cursor-pointer"
                        } : {
                            className: "group block cursor-default"
                        };

                        return (
                            <Wrapper key={activity.id} {...wrapperProps}>
                                <div className="
                                    bg-[#DDEFF7]/60 backdrop-blur-sm
                                    border border-white/40
                                    p-3 rounded-2xl
                                    h-full flex flex-col
                                    shadow-sm hover:shadow-md
                                    transition-all duration-300
                                    hover:-translate-y-1
                                ">
                                    {/* Container da Imagem */}
                                    <div className="w-full aspect-4/3 overflow-hidden rounded-xl bg-white relative">
                                        <img
                                            src={displayImage}
                                            alt={displayTitle}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/600x400/DDEFF7/1A3463?text=Sem+Imagem";
                                            }}
                                        />
                                        
                                        {/* Badge opcional para distinguir visualmente */}
                                        {!isSystemActivity && (
                                            <div className="absolute top-2 right-2 bg-[#1C5E8F]/80 text-white text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-md">
                                                LIVRE
                                            </div>
                                        )}
                                    </div>

                                    {/* Título e Data */}
                                    <div className="mt-3 text-center grow flex flex-col items-center justify-start px-1">
                                        <h3 className="text-[#1D87BC] font-semibold text-lg leading-tight mb-1">
                                            {displayTitle}
                                        </h3>
                                        {/* Mostra a data se disponível */}
                                        <span className="text-[#1A3463]/60 text-xs">
                                            {activity.date || (activity.created_at && new Date(activity.created_at).toLocaleDateString())}
                                        </span>
                                    </div>
                                </div>
                            </Wrapper>
                        );
                    })}
                </div>
            </div>

        </AuthenticatedLayout >
    );
}