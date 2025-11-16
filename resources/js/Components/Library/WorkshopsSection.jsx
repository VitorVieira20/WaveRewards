import { Link } from "@inertiajs/react";

export default function WorkshopsSections({ workshops }) {

    return (
        <div className="flex flex-col gap-4">
            <h2 className="flex justify-center items-center text-[#1C5E8F] text-2xl font-semibold bg-[#FFFFFF]/40 shadow-xl p-6 rounded-xl w-full max-w-[320px]">
                Workshops
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {workshops.map((workshop) => (
                    <div key={workshop.image} className="flex flex-col items-center bg-[#FFFFFF]/40 shadow-xl p-4 rounded-xl w-full md:max-w-[320px]">
                        <Link>
                            <img
                                src={workshop.image}
                                className="w-full rounded-xl"
                            />
                            <h3 className="text-center text-[#1D87BC] font-semibold mt-2">{workshop.title}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}