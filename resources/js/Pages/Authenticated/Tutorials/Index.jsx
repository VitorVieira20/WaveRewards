import { Link } from "@inertiajs/react";
import LeftArrowIcon from "../../../Components/Icons/LeftArrowIcon";
import AuthenticatedLayout from "../../../Layouts/AuthenticatedLayout";
import TutorialsSections from "../../../Components/Library/TutorialsSections";

export default function TutorialsIndex({ auth, tutorials }) {

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

                <span>Vídeos/Tutoriais</span>
            </h1>

            <div className="flex flex-col gap-12 w-full pt-20 px-4 md:px-16">
                <TutorialsSections tutorials={tutorials} showHeader={false} />
            </div>

        </AuthenticatedLayout >
    );
}