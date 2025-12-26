import { useState } from 'react';
import { router } from "@inertiajs/react";
import { Search, Users, Plus } from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import LeftArrowIcon from "@/Components/Icons/LeftArrowIcon";
import CreateTeamModal from '../../../Components/Modals/Team/CreateTeam';

export default function TeamsIndex({ auth, allTeams, canCreate }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const joinTeam = (teamId) => {
        router.post(route('teams.join', teamId));
    };

    const teamsList = allTeams?.data || (Array.isArray(allTeams) ? allTeams : []);

    const filteredTeams = teamsList.filter(team =>
        team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed flex gap-3 w-full text-[#1A3463] pb-4 px-6 md:px-16 text-3xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#DDEFF7] 3xl:to-[#E7F3F9]">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center cursor-pointer hover:scale-110 transition-transform"
                >
                    <LeftArrowIcon color="#1C5E8F" />
                </button>
                Equipas
            </h1>

            <div className="w-full pt-28 px-4 md:px-20 pb-10 mx-auto">

                <div className="bg-white/30 backdrop-blur-md p-2 rounded-2xl shadow-sm border border-white/50 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">

                    <div className="w-full md:flex-1 flex flex-col md:flex-row gap-4 items-center justify-between">

                        <div className="relative w-full md:max-w-lg group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A3463]/60" size={18} />
                            <input
                                type="text"
                                placeholder="Procurar equipa..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white/50 border border-white/50 rounded-xl focus:ring-2 focus:ring-[#60B4D9] focus:bg-white/80 text-[#1A3463] placeholder-[#1A3463]/50 font-medium text-md transition-all outline-none"
                            />
                        </div>

                        {canCreate && (
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#6EA8C5] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#5A92AF] transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                            >
                                <Plus size={18} />
                                Criar Equipa
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTeams.map((team) => (
                        <div
                            key={team.id}
                            className="
                                group relative overflow-hidden
                                bg-[#DDEFF7]/60 backdrop-blur-sm
                                border border-white/60
                                p-6 rounded-3xl
                                shadow-sm hover:shadow-xl hover:-translate-y-1
                                transition-all duration-300
                                flex flex-col items-center text-center
                            "
                        >
                            <div className="w-24 h-24 mb-4 rounded-full bg-white p-1 shadow-inner relative">
                                <div className="w-full h-full rounded-full bg-linear-to-br from-[#1A3463] to-[#1D87BC] flex items-center justify-center text-3xl font-bold text-white overflow-hidden">
                                    {team.image ? (
                                        <img src={team.image.startsWith('http') ? team.image : `/${team.image}`} alt={team.name} className="w-full h-full object-cover" />
                                    ) : (
                                        team.name.charAt(0)
                                    )}
                                </div>
                                <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm">
                                    <Users size={16} className="text-[#1D87BC]" />
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold text-[#1A3463] mb-1 line-clamp-1 group-hover:text-[#1D87BC] transition-colors">
                                {team.name}
                            </h3>

                            <div className="flex items-center gap-2 text-[#1A3463]/60 text-sm font-medium mb-6">
                                <span>{team.users_count} membros</span>
                                <span className="w-1 h-1 bg-[#1A3463]/40 rounded-full"></span>
                                <span>{team.users_sum_total_points || 0} pts</span>
                            </div>

                            <button
                                onClick={() => joinTeam(team.id)}
                                className="
                                    w-full py-3 rounded-2xl
                                    bg-white text-[#1A3463] font-semibold
                                    border border-[#1A3463]/10
                                    hover:bg-[#1D87BC] hover:text-white
                                    shadow-sm hover:shadow-md
                                    transition-all duration-300 cursor-pointer
                                "
                            >
                                Juntar-se à Equipa
                            </button>
                        </div>)
                    )}
                </div>

                {canCreate && (
                    <CreateTeamModal
                        isOpen={isCreateModalOpen}
                        onClose={() => setIsCreateModalOpen(false)}
                    />
                )}

            </div>
        </AuthenticatedLayout>
    );
}