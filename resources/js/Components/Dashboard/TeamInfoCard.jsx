import { useState } from 'react';
import TeamChatIcon from "../Icons/TeamChatIcon";
import TeamIcon from "../Icons/TeamIcon";
import TeamChatModal from '../Modals/Team/TeamChat';

export default function TeamInfoCard({ auth, team }) {
    const [isChatOpen, setIsChatOpen] = useState(false);

    if (!team) return (
        <div className="flex flex-col items-center text-center bg-white/40 p-2 pb-4 w-full mx-auto md:mx-0 max-w-[700px] lg:max-w-[350px] relative border-b border-b-[#1A3463]/75 lg:border-b-0 lg:border-r lg:border-r-[#1A3463]/75 rounded-t-xl lg:rounded-t-none lg:rounded-l-xl backdrop-blur-sm">
            <div className="relative w-full flex justify-center items-center mb-1">
                <TeamIcon />
            </div>
            <h2 className="text-[#1C5E8F] text-lg font-semibold">Sem equipa</h2>
        </div>
    )

    return (
        <>
            <div className="flex flex-col items-center text-center bg-white/40 p-2 pb-4 w-full mx-auto md:mx-0 max-w-[700px] lg:max-w-[350px] relative border-b border-b-[#1A3463]/75 lg:border-b-0 lg:border-r lg:border-r-[#1A3463]/75 rounded-t-xl lg:rounded-t-none lg:rounded-l-xl backdrop-blur-sm">

                <div className="relative w-full flex justify-center items-center mb-1">
                    <TeamIcon />
                    <button
                        onClick={() => setIsChatOpen(true)}
                        className="absolute top-0 right-0 p-1 rounded-full hover:bg-[#1D87BC]/20 transition cursor-pointer"
                    >
                        <TeamChatIcon className="w-6 h-6 text-[#1D87BC]" />
                    </button>
                </div>
                <h2 className="text-[#1C5E8F] text-lg font-semibold">A tua equipa</h2>
                <h2 className="text-[#1D87BC] text-xl font-medium mt-3">{team.name}</h2>
                <p className="text-[#1C5E8F] text-md mt-2"><span className="font-medium">Ranking: </span>{team.rank}º lugar</p>
                <p className="text-[#1C5E8F] text-md mt-1"><span className="font-medium">Pontos totais: </span>{team.points} pontos</p>
            </div>

            {isChatOpen && (
                <TeamChatModal
                    auth={auth}
                    team={team}
                    isOpen={isChatOpen}
                    onClose={() => setIsChatOpen(false)}
                />
            )}
        </>
    );
}