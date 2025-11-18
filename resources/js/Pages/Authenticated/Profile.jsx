import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import UserCard from "../../Components/Profile/UserCard";
import ProgressChartCard from "../../Components/Profile/ProgressChartCard";
import StatsCard from "../../Components/Profile/StatsCard";
import ObjectivesCard from "../../Components/Profile/ObjectivesCard";
import MedalsCard from "../../Components/Profile/MedalsCard";
import ActivitiesCard from "../../Components/Profile/ActivitiesCard";
import TeamCard from "../../Components/Profile/TeamCard";
import { useState } from "react";
import UpdatePasswordModal from "../../Components/Profile/UpdatePasswordModal";

export default function Profile({ auth, user }) {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed w-full text-[#1A3463] pb-4 px-6 md:px-16 text-4xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#EAF5FA] md:to-[#DDEFF7] 3xl:to-[#E7F3F9]">
                Perfil
            </h1>

            <div className="flex flex-col gap-1 w-full pt-16 px-4 md:px-16">
                <div className="flex flex-col lg:flex-row gap-4 w-full p-4 items-stretch lg:h-[300px]">
                    <UserCard user={user} onOpenPasswordModal={() => setIsPasswordModalOpen(true)} />

                    <ProgressChartCard />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full p-4">
                    <StatsCard />

                    <ObjectivesCard />

                    <MedalsCard />
                </div>

                <div className="flex flex-col lg:flex-row gap-4 w-full p-4 items-stretch lg:h-[300px]">
                    <TeamCard />

                    <ActivitiesCard />
                </div>
            </div>

            <UpdatePasswordModal show={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
        </AuthenticatedLayout>
    );
}