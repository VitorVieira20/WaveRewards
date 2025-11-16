import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import WorkshopsSections from "../../Components/Library/WorkshopsSection";
import TutorialsSections from "../../Components/Library/TutorialsSections";
import InformationsSections from "../../Components/Library/InformationsSections";

export default function Library({ auth, workshops, tutorials, informations }) {

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed w-full text-[#1A3463] pb-4 px-6 md:px-16 text-3xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#EAF5FA] md:to-[#DDEFF7] 3xl:to-[#E7F3F9]">
                Biblioteca
            </h1>

            <div className="flex flex-col gap-12 w-full pt-20 px-4 md:px-16">
                <WorkshopsSections workshops={workshops} />
                <TutorialsSections tutorials={tutorials} />
                <InformationsSections informations={informations} />
            </div>

        </AuthenticatedLayout >
    );
}
