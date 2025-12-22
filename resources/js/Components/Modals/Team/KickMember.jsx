import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";

export default function KickMemberModal({ show, onClose, onConfirm, member, processing }) {
    if (!show || !member) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-xs"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                    className="
                        relative w-full max-w-2xl
                        bg-[#1D87BC]/60 backdrop-blur-md
                        rounded-3xl shadow-2xl
                        p-6
                        flex flex-col items-center
                    "
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-[#1A3463] hover:scale-110 transition-transform p-1.5 bg-white/20 rounded-full cursor-pointer"
                    >
                        <X size={22} strokeWidth={2.5} />
                    </button>

                    <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-full bg-red-100">
                        <AlertTriangle className="text-red-600" size={26} />
                    </div>

                    <h2 className="text-[#1A3463] text-xl md:text-2xl font-semibold mb-3 text-center">
                        Expulsar Membro
                    </h2>

                    <p className="text-md text-[#1A3463] text-center">
                        Tens a certeza que queres expulsar{" "}
                        <b>{member.name}</b> da equipa?
                    </p>

                    <p className="mt-2 text-sm text-[#1A3463]/70 text-center">
                        Esta ação é imediata e o membro perderá acesso à equipa.
                    </p>

                    <div className="mt-8 flex w-full justify-center gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-[#1C5E8F] bg-white/40 rounded-full hover:bg-white/60 transition-all cursor-pointer"
                        >
                            Cancelar
                        </button>

                        <button
                            disabled={processing}
                            onClick={() => onConfirm(member.id)}
                            className="
                                bg-linear-to-r 
                                from-[#CE2828]/60 via-[#CE2828]/80 to-[#CE2828] 
                                text-white px-6 py-2.5
                                rounded-full text-sm font-medium
                                hover:scale-105 hover:shadow-lg
                                transition-all cursor-pointer
                            "
                        >
                            {processing ? "A expulsar..." : "Expulsar"}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
