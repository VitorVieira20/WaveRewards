import PendingRequests from "./PendingRequests";
import { MessageCircle } from "lucide-react";

export default function MyTeamInformation({ myTeam, pendingRequests, onOpenChat }) {

    const isAdmin = myTeam.role === 'admin';
    const hasPendingRequests = pendingRequests && pendingRequests.length > 0;

    return (
        <div className="relative overflow-hidden bg-linear-to-r from-[#1D87BC] to-[#60B4D9] rounded-3xl p-6 md:p-8 shadow-xl text-white">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-20 w-40 h-40 bg-[#60B4D9]/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col xl:flex-row items-center xl:items-start justify-between gap-8">

                <div className="flex flex-col md:flex-row items-center gap-8 flex-1 text-center md:text-left">
                    {/* Avatar da Equipa */}
                    <div className="shrink-0 w-32 h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-5xl font-bold border-4 border-white/30 shadow-inner">
                        {myTeam.name.charAt(0)}
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-col md:flex-row items-center gap-3 mb-2 justify-center md:justify-start">
                            <h2 className="text-3xl md:text-4xl font-bold">{myTeam.name}</h2>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isAdmin ? 'bg-[#FFD700] text-[#1A3463]' : 'bg-white/20 text-white'
                                }`}>
                                {isAdmin ? 'Administrador' : 'Membro'}
                            </span>
                        </div>
                        
                        <p className="text-blue-100 max-w-lg mb-6">
                            Juntos vamos mais longe! Participa nos desafios e acumula pontos para a tua equipa subir no ranking.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="flex items-center justify-center md:justify-start gap-6">
                                <div className="flex flex-col items-center md:items-start">
                                    <span className="text-3xl font-bold">#{myTeam.rank || '-'}</span>
                                    <span className="text-xs uppercase opacity-70">Ranking Global</span>
                                </div>
                                <div className="w-px h-10 bg-white/20"></div>
                                <div className="flex flex-col items-center md:items-start">
                                    <span className="text-3xl font-bold">{myTeam.points || 0}</span>
                                    <span className="text-xs uppercase opacity-70">Pontos Totais</span>
                                </div>
                            </div>

                            <div className="hidden sm:block w-px h-10 bg-white/20"></div>

                            <button
                                onClick={onOpenChat}
                                className="
                                    flex items-center gap-2 
                                    bg-white text-[#1D87BC] 
                                    px-5 py-2.5 rounded-xl 
                                    font-semibold text-sm uppercase tracking-wide
                                    hover:bg-[#EAF5FA] hover:scale-105 active:scale-95
                                    transition-all duration-300 shadow-md cursor-pointer
                                "
                            >
                                <MessageCircle size={20} fill="currentColor" className="opacity-80"/>
                                Chat de Equipa
                            </button>
                        </div>
                    </div>
                </div>

                {isAdmin && hasPendingRequests && (
                    <PendingRequests pendingRequests={pendingRequests} />
                )}
            </div>
        </div>
    );
}