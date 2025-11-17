import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "../../../Layouts/AuthenticatedLayout";
import LeftArrowIcon from "../../../Components/Icons/LeftArrowIcon";

export default function InformationShow({ auth, information }) {

    const renderDescription = (text) => {
        const lines = text.split('\n');

        return lines.map((line, index) => {
            const trimmedLine = line.trim();

            if (trimmedLine === "") {
                return <div key={index} className="h-4" />;
            }

            if (trimmedLine.startsWith('•')) {
                return (
                    <div key={index} className="flex items-start gap-3 pl-4 mb-2">
                        <span className="text-[#1D87BC] font-bold text-xl leading-none mt-1">•</span>
                        <p className="text-[#1D87BC] text-base md:text-md font-normal leading-relaxed">
                            {trimmedLine.substring(1).trim()}
                        </p>
                    </div>
                );
            }

            return (
                <p key={index} className="text-[#1C5E8F] text-base md:text-md font-medium leading-relaxed mb-1">
                    {line}
                </p>
            );
        });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed w-full text-[#1A3463] pb-4 px-6 md:px-16 text-3xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#EAF5FA] md:to-[#DDEFF7] 3xl:to-[#E7F3F9] flex items-center gap-4">

                <Link href={route('library.index')} className="flex items-center md:mt-3 lg:mt-0">
                    <LeftArrowIcon color="#1C5E8F" />
                </Link>

                <span>
                    <span className="hidden lg:inline">Informação -{" "}</span>
                    <span className="inline font-light text-[24px] md:text-[30px] lg:text-[45px]" style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.35)" }}>
                        {information.title}
                    </span>
                </span>

            </h1>

            <div className="flex flex-col lg:flex-row justify-center gap-8 w-full pt-24 md:pt-20 lg:pt-30 xl:pt-20 px-4 md:px-16 pb-10">

                <div className="flex flex-col gap-4 w-full lg:max-w-lg">
                    <img
                        src={information.image}
                        className="w-full max-h-[300px] lg:max-h-[400px] object-cover rounded-xl shadow-md"
                    />

                    <div className="bg-[#FFFFFF]/40 rounded-xl p-6 text-[#1D87BC] flex flex-col gap-2 shadow-sm border border-white/20">
                        <h3 className="text-[#1A3463] text-xl md:text-2xl font-semibold mb-1">
                            Curiosidade:
                        </h3>
                        <p className="text-base md:text-md font-normal leading-relaxed">
                            {information.curiosity}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col w-full bg-[#FFFFFF]/40 rounded-xl p-6 shadow-sm border border-white/20 h-fit">
                    {renderDescription(information.description)}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}