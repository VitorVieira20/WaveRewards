import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";
import MeteorologyCard from "../../Components/Dashboard/MeteorologyCard";
import DailyGoalCard from "../../Components/Dashboard/DailyGoalCard";
import TeamInfoCard from "../../Components/Dashboard/TeamInfoCard";
import LibraryPreviewCard from "../../Components/Dashboard/LibraryPreviewCard";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DailyGoalCompleted from "../../Components/Modals/DailyGoal/DailyGoalCompleted";
import CommunityCard from "../../Components/Dashboard/CommunityCard";
import ActivitiesCard from "../../Components/Dashboard/ActivitiesCard";

export default function Dashboard({ auth, weatherData, team, goal, activities }) {
    const { flash } = usePage().props;
    const [showDailyGoalModal, setShowDailyGoalModal] = useState(false);

    useEffect(() => {
        if (flash?.daily_goal?.status === "completed") {
            setShowDailyGoalModal(true);
        }
    }, [flash]);

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed w-full text-[#1A3463] pb-4 px-6 md:px-16 text-3xl md:text-4xl lg:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#DDEFF7] 3xl:to-[#E7F3F9]">
                Bem vindo<span className="hidden text-3xl md:text-4xl lg:text-5xl min-[480px]:inline">, {auth.user.name}</span>
            </h1>

            <div className="flex flex-col lg:flex-row gap-6 w-full pt-20 px-4 md:px-16">
                <div className="flex flex-col gap-4 w-full lg:w-1/2">
                    <div className="flex flex-col lg:flex-row">
                        <TeamInfoCard auth={auth} team={team} />

                        <MeteorologyCard weatherData={weatherData} />
                    </div>

                    <div className="flex flex-col lg:flex-row">
                        <DailyGoalCard goal={goal} />

                        <LibraryPreviewCard />
                    </div>
                </div>

                <div className="flex flex-col gap-3.5 w-full lg:w-1/2">
                    <CommunityCard />

                    <ActivitiesCard activities={activities} />
                </div>

                {showDailyGoalModal && (
                    <DailyGoalCompleted
                        isOpen={showDailyGoalModal}
                        onClose={() => setShowDailyGoalModal(false)}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}
