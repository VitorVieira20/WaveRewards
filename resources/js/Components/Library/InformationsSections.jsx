import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function InformationsSections({ informations, showHeader = true }) {

    return (
        <div className="flex flex-col gap-4">
            {showHeader &&
                <Link href={route("informations.index")} className="flex justify-center items-center text-[#1C5E8F] text-2xl font-semibold bg-[#FFFFFF]/40 shadow-xl p-6 rounded-xl w-full max-w-[320px]">
                    Painel Informativo
                </Link>
            }

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {informations.map((information) => (
                    <div key={information.image} className="flex flex-col items-center bg-[#FFFFFF]/40 shadow-xl p-4 rounded-xl w-full md:max-w-[320px]">
                        <Link href={route("informations.show", information.id)}>
                            <img
                                src={information.image}
                                className="w-full rounded-xl"
                            />
                            <h3 className="text-center text-[#1D87BC] font-semibold mt-2">{information.title}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}