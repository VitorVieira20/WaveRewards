import { Check, Shield, X } from "lucide-react";
import { router } from "@inertiajs/react";

export default function PendingRequests({ pendingRequests }) {

    const handleAccept = (userId) => {
        router.post(route('teams.requests.accept', userId), {}, {
            preserveScroll: true,
            onSuccess: () => {
                console.log("Aceite!");
            }
        });
    };

    const handleReject = (userId) => {
        router.delete(route('teams.requests.reject', userId), {
            preserveScroll: true,
        });
    };

    return (
        <div className="w-full xl:w-120 2xl:w-162 shrink-0 animate-in slide-in-from-right-4 fade-in duration-700">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-lg">
                <div className="bg-black/10 px-4 py-3 flex items-center justify-between border-b border-white/10">
                    <h3 className="font-bold text-white flex items-center gap-2 text-sm 2xl:text-lg">
                        <Shield className="text-[#FFD700] w-4 h-4 2xl:w-5 2xl:h-5" />
                        Pedidos de Acesso
                    </h3>
                    <span className="bg-[#FFD700] text-[#1A3463] text-xs 2xl:text-sm font-extrabold px-2 py-0.5 rounded-full">
                        {pendingRequests.length}
                    </span>
                </div>

                <div className="p-3 space-y-2 max-h-48 overflow-y-auto custom-scrollbar-light">
                    {pendingRequests.map((req) => (
                        <div key={req.id} className="flex items-center justify-between p-2 bg-white/10 rounded-xl border border-white/5 hover:bg-white/20 transition-colors gap-2">

                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                <img
                                    src={req.avatar || `https://ui-avatars.com/api/?name=${req.name}&background=random`}
                                    referrerPolicy="no-referrer"
                                    alt={req.name}
                                    className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-full object-cover border border-white/30 shrink-0"
                                />
                                <div className="text-left min-w-0">
                                    <p className="font-bold text-white text-xs 2xl:text-base truncate">{req.name}</p>

                                    <div className="flex items-center gap-1.5 text-[10px] 2xl:text-xs text-blue-200">
                                        <span>Pendente</span>
                                        <span className="text-white/30">•</span>
                                        <span className="text-yellow-400 font-bold">{req.points} pts</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-1.5 shrink-0">
                                {/* Botão Aceitar */}
                                <button
                                    onClick={() => handleAccept(req.id)}
                                    className="w-7 h-7 2xl:w-9 2xl:h-9 flex items-center justify-center bg-white text-green-600 rounded-lg hover:bg-green-400 hover:text-white transition-all shadow-sm cursor-pointer"
                                    title="Aceitar"
                                >
                                    <Check className="w-3.5 h-3.5 2xl:w-5 2xl:h-5" strokeWidth={3} />
                                </button>

                                {/* Botão Rejeitar */}
                                <button
                                    onClick={() => handleReject(req.id)}
                                    className="w-7 h-7 2xl:w-9 2xl:h-9 flex items-center justify-center bg-white text-red-600 rounded-lg hover:bg-red-400 hover:text-white transition-all shadow-sm cursor-pointer"
                                    title="Rejeitar"
                                >
                                    <X className="w-3.5 h-3.5 2xl:w-5 2xl:h-5" strokeWidth={3} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}