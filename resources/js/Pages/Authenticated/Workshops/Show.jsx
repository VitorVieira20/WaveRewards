import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "../../../Layouts/AuthenticatedLayout";
import LeftArrowIcon from "../../../Components/Icons/LeftArrowIcon";
import LocationPinIcon from "../../../Components/Icons/LocationPinIcon";
import ClockIcon from "../../../Components/Icons/ClockIcon";
import HeartIcon from "../../../Components/Icons/HeartIcon";

export default function WorkshopShow({ auth, workshop }) {

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed w-full text-[#1A3463] pb-4 px-6 md:px-16 text-3xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#EAF5FA] md:to-[#DDEFF7] 3xl:to-[#E7F3F9] flex items-center gap-4">

                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex items-center md:mt-3 lg:mt-0 cursor-pointer"
                >
                    <LeftArrowIcon color="#1C5E8F" />
                </button>

                <span>
                    <span className="hidden lg:inline">Workshop -{" "}</span>
                    <span className="inline font-light text-[24px] md:text-[30px] lg:text-[45px]" style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.35)" }}>
                        {workshop.title}
                    </span>
                </span>

            </h1>

            <div className="flex flex-col lg:flex-row justify-center gap-8 w-full pt-24 md:pt-20 lg:pt-30 xl:pt-20 px-4 md:px-16">

                <div className="flex flex-col gap-4 max-w-lg">
                    <img
                        src={workshop.image}
                        className="w-full max-h-[550px] object-cover rounded-xl"
                    />

                    <div className="bg-[#FFFFFF]/40 rounded-xl p-4 text-[#1D87BC] text-md font-medium flex flex-col gap-6">
                        <div className="flex flex-row gap-3">
                            <div className="ml-[3px]">
                                <LocationPinIcon />
                            </div>
                            <p>{workshop.location}</p>
                        </div>
                        <div className="flex flex-row gap-3">
                            <ClockIcon />
                            <p>{workshop.datetime}</p>
                        </div>
                        <div className="flex flex-row gap-3">
                            <HeartIcon />
                            <p>{workshop.registered_count} pessoas inscritas</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full bg-[#FFFFFF]/40 rounded-xl p-6 gap-4">
                    <h2 className="text-[#1C5E8F] text-2xl font-semibold">Descrição:</h2>

                    {workshop.description.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="text-[#1D87BC] text-lg font-normal">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}