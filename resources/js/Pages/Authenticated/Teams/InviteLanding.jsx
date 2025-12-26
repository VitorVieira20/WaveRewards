import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function InviteLanding({ auth, team, alreadyInTeam }) {
    const handleJoin = () => {
        router.post(route('teams.join', team.id));
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
                <div className="w-32 h-32 bg-[#1D87BC] rounded-full mb-6 flex items-center justify-center text-5xl font-bold text-white shadow-xl overflow-hidden">
                    {team.image ? <img src={team.image} alt={team.name} /> : team.name.charAt(0)}
                </div>

                <h1 className="text-3xl font-bold text-[#1A3463] mb-2">Convite para Equipa</h1>
                <p className="text-xl text-[#1D87BC] font-semibold mb-4">{team.name}</p>

                <div className="bg-white/40 p-6 rounded-3xl border border-white/60 mb-8 max-w-md">
                    <p className="text-[#1A3463]/80 mb-4">{team.description || "Esta equipa está à tua espera!"}</p>
                    <div className="flex justify-around">
                        <div className="text-center">
                            <p className="text-2xl font-semibold text-[#1D87BC]">{team.points}</p>
                            <p className="text-xs uppercase font-bold opacity-60 text-[#1A3463]">Pontos</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-semibold text-[#1D87BC]">{team.members_count}</p>
                            <p className="text-xs uppercase font-bold opacity-60 text-[#1A3463]">Membros</p>
                        </div>
                        <div className="text-center">
                            <p className="text-2xl font-semibold text-[#1D87BC]">{team.rank}º</p>
                            <p className="text-xs uppercase font-bold opacity-60 text-[#1A3463]">Ranking</p>
                        </div>
                    </div>
                </div>

                {alreadyInTeam ? (
                    <p className="text-red-500 font-medium">Já pertences a uma equipa. Tens de sair da atual para te juntares a esta.</p>
                ) : (
                    <button
                        onClick={handleJoin}
                        className="bg-linear-to-r from-[#1D87BC] to-[#60B4D9] text-white px-10 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-all cursor-pointer"
                    >
                        Enviar Pedido de Adesão
                    </button>
                )}
            </div>
        </AuthenticatedLayout>
    );
}