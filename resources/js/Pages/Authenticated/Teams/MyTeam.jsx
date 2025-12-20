import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import LeftArrowIcon from "@/Components/Icons/LeftArrowIcon";
import MyTeamInformation from "../../../Components/Teams/MyTeamInformation";
import MyTeamMembers from "../../../Components/Teams/MyTeamMembers";
import TeamChatModal from "../../../Components/Modals/Team/TeamChat";

export default function MyTeam({ auth, myTeam, pendingRequests }) {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed flex gap-3 w-full text-[#1A3463] pb-4 px-6 md:px-16 text-3xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#DDEFF7] 3xl:to-[#E7F3F9]">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center cursor-pointer hover:scale-110 transition-transform"
                >
                    <LeftArrowIcon color="#1C5E8F" />
                </button>
                A Minha Equipa
            </h1>

            <div className="w-full pt-28 px-4 md:px-20 pb-10 mx-auto">
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <MyTeamInformation myTeam={myTeam} pendingRequests={pendingRequests} onOpenChat={() => setIsChatOpen(true)} />

                    <MyTeamMembers auth={auth} myTeam={myTeam} />
                </div>
            </div>

            {isChatOpen && (
                <TeamChatModal
                    auth={auth}
                    team={myTeam}
                    isOpen={isChatOpen}
                    onClose={() => setIsChatOpen(false)}
                />
            )}
        </AuthenticatedLayout>
    );
}