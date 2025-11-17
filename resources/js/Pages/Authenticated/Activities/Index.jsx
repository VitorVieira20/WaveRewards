import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "../../../Layouts/AuthenticatedLayout";
import { route } from "ziggy-js";

export default function ActivitiesIndex({ auth, activities, categories }) {

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed w-full text-[#1A3463] pb-4 px-6 md:px-16 text-3xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#EAF5FA] md:to-[#DDEFF7] 3xl:to-[#E7F3F9]">
                Atividades
            </h1>

            <div className="flex flex-col gap-12 w-full pt-18 px-4 md:px-16 pb-20">

                {categories.map((categoryName) => {

                    const categoryActivities = activities.filter(act => act.category === categoryName);

                    if (categoryActivities.length === 0) return null;

                    return (
                        <section key={categoryName} className="flex flex-col gap-6">
                            <Link href={route("activities.indexByCategory", categoryName)} className="flex justify-center items-center text-[#1C5E8F] text-2xl font-semibold bg-[#FFFFFF]/40 shadow-xl p-6 rounded-xl w-full max-w-[320px]">
                                {categoryName}
                            </Link>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {categoryActivities.map((activity) => (
                                    <Link
                                        key={activity.id}
                                        href={route('activities.show', activity.id)}
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

                        </section>
                    );
                })}

            </div>

        </AuthenticatedLayout >
    );
}