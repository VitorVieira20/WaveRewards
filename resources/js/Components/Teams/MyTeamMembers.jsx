import { useState, useMemo } from "react";
import { Users, ChevronDown, Search, Crown, UserMinus } from "lucide-react";
import { useForm } from "@inertiajs/react";
import KickMemberModal from "../Modals/Team/KickMember";

export default function MyTeamMembers({ auth, myTeam }) {
    const [visibleCount, setVisibleCount] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAdminsOnly, setShowAdminsOnly] = useState(false);
    const [kickMember, setKickMember] = useState(null);

    const { delete: destroy, processing } = useForm();

    const processedMembers = useMemo(() => {
        let data = [...myTeam.members];

        data.sort((a, b) => b.points - a.points);

        if (showAdminsOnly) {
            data = data.filter(member => member.role === 'admin');
        }

        if (searchQuery) {
            data = data.filter(member =>
                member.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return data;
    }, [myTeam.members, searchQuery, showAdminsOnly]);

    const displayedMembers = processedMembers.slice(0, visibleCount);
    const hasMoreMembers = visibleCount < processedMembers.length;

    const isAdmin = myTeam.role === 'admin';

    const handleKick = () => {
        if (!kickMember) return;
        destroy(route("teams.kick", kickMember.id), {
            onSuccess: () => setKickMember(null),
        });
    };

    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 10);
    };

    return (
        <div className="w-full gap-8">
            <div className="w-full space-y-6">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center justify-between md:justify-start gap-4">
                        <h3 className="text-2xl font-semibold text-[#1A3463] flex items-center gap-2">
                            <Users className="text-[#1D87BC]" />
                            Membros
                        </h3>
                        <span className="text-sm font-bold text-[#1A3463]/60 bg-white/40 px-3 py-1 rounded-full border border-white/50 whitespace-nowrap">
                            {displayedMembers.length} de {processedMembers.length}
                        </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">

                        <button
                            onClick={() => setShowAdminsOnly(!showAdminsOnly)}
                            className={`
                                            flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border cursor-pointer
                                            ${showAdminsOnly
                                    ? 'bg-[#FFD700] text-[#1A3463] border-[#FFD700] shadow-md'
                                    : 'bg-white/50 text-[#1A3463] border-white/60 hover:bg-white'}
                                        `}
                        >
                            <Crown size={16} strokeWidth={2.5} />
                            {showAdminsOnly ? 'A ver Admins' : 'Ver Admins'}
                        </button>

                        {/* Input de Pesquisa */}
                        <div className="relative group w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1A3463]/40 group-focus-within:text-[#1D87BC] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Procurar membro..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white/50 border border-white/60 rounded-xl focus:ring-2 focus:ring-[#60B4D9] focus:bg-white text-[#1A3463] placeholder-[#1A3463]/40 font-medium text-sm transition-all outline-none shadow-sm"
                            />
                        </div>
                    </div>
                </div>

                {displayedMembers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {displayedMembers.map((member, index) => {
                            const isMe = member.id === auth.user.id;
                            const isAdminMember = member.role === 'admin';

                            const internalRank = index + 1;

                            return (
                                <div
                                    key={member.id || member.name}
                                    className="
                                                    group relative flex flex-col items-center
                                                    bg-[#DDEFF7]/60 backdrop-blur-sm
                                                    border border-white/40
                                                    p-5 rounded-3xl
                                                    shadow-sm hover:shadow-md
                                                    transition-all duration-300
                                                    hover:-translate-y-1
                                                    animate-in fade-in zoom-in-95
                                                "
                                >
                                    {!searchQuery && !showAdminsOnly && internalRank <= 3 && (
                                        <div className={`
                                                        absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm
                                                        ${internalRank === 1 ? 'bg-[#FFD700] text-[#1A3463]' :
                                                internalRank === 2 ? 'bg-gray-300 text-gray-700' :
                                                    'bg-orange-300 text-orange-800'}
                                                    `}>
                                            {internalRank}º
                                        </div>
                                    )}

                                    {isAdmin && !isMe && (
                                        <button
                                            onClick={() => setKickMember(member)}
                                            className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600 cursor-pointer z-20"
                                            title="Expulsar membro"
                                        >
                                            <UserMinus size={14} strokeWidth={3} />
                                        </button>
                                    )}

                                    <div className="relative mb-3">
                                        <img
                                            src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}&background=random&size=256`}
                                            referrerPolicy="no-referrer"
                                            alt={member.name}
                                            className="
                                                            w-20 h-20 xl:w-24 xl:h-24
                                                            object-cover
                                                            border-4 border-[#60B4D9] 
                                                            rounded-full shadow-sm
                                                            transition-transform duration-300 group-hover:scale-110
                                                        "
                                        />
                                        {isAdminMember && (
                                            <div className="absolute -top-1 -right-1 bg-[#FFD700] text-[#1A3463] p-1.5 rounded-full shadow-sm border-2 border-white z-10">
                                                <Crown size={12} fill="currentColor" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="text-center w-full">
                                        <h4 className="text-[#1A3463] font-semibold text-lg leading-tight truncate px-2">
                                            {member.name}
                                        </h4>
                                        <div className="mt-1 mb-3 flex items-center justify-center gap-2">
                                            <span className="text-[#1A3463]/60 text-xs font-medium uppercase tracking-wide">
                                                {isAdminMember ? 'Admin' : 'Membro'}
                                            </span>
                                            {isMe && (
                                                <span className="bg-[#1D87BC] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">TU</span>
                                            )}
                                        </div>
                                        <div className="bg-white/50 border border-white/60 rounded-xl py-2 px-4 inline-flex flex-col items-center w-full lg:max-w-[200px]">
                                            <span className="text-xl font-semibold text-[#1D87BC]">{member.points}</span>
                                            <span className="text-[9px] text-[#1A3463]/50 font-bold uppercase">Pontos</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 bg-white/20 rounded-3xl border border-white/30 text-center">
                        <div className="bg-white/40 p-4 rounded-full mb-3">
                            <Search size={32} className="text-[#1A3463]/40" />
                        </div>
                        <p className="text-[#1A3463] font-bold text-lg">Nenhum membro encontrado</p>
                        <p className="text-[#1A3463]/60 text-sm">Tenta ajustar a pesquisa ou os filtros.</p>
                        {(searchQuery || showAdminsOnly) && (
                            <button
                                onClick={() => { setSearchQuery(""); setShowAdminsOnly(false); }}
                                className="mt-4 text-[#1D87BC] font-bold hover:underline text-sm"
                            >
                                Limpar filtros
                            </button>
                        )}
                    </div>
                )}

                {hasMoreMembers && (
                    <div className="flex justify-center mt-8 pt-4">
                        <button
                            onClick={handleShowMore}
                            className="
                                            group flex items-center gap-2
                                            bg-white border-2 border-[#60B4D9]/20
                                            text-[#1A3463] font-semibold text-sm
                                            px-6 py-3 rounded-full
                                            hover:bg-[#60B4D9] hover:text-white hover:border-[#60B4D9]
                                            transition-all duration-300 shadow-sm hover:shadow-lg cursor-pointer
                                        "
                        >
                            Ver mais membros
                            <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
                        </button>
                    </div>
                )}
            </div>

            <KickMemberModal
                show={!!kickMember}
                member={kickMember}
                onClose={() => setKickMember(null)}
                onConfirm={handleKick}
                processing={processing}
            />

        </div>
    );
}