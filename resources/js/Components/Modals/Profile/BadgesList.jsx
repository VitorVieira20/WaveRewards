import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function BadgesListModal({ show, onClose, tier, badges }) {
    if (!show) return null;

    const titles = { gold: 'Ouro', silver: 'Prata', bronze: 'Bronze' };

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-xs overflow-y-auto"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="
                        relative w-full 
                        max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl 2xl:max-w-5xl
                        bg-[#1D87BC]/60 backdrop-blur-md 
                        rounded-3xl shadow-2xl 
                        p-4 lg:p-6
                        flex flex-col items-center
                        my-auto
                    "
                    >
                        <button
                            type="button"
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 text-[#1A3463] hover:scale-110 transition-transform p-1.5 bg-white/20 rounded-full cursor-pointer"
                        >
                            <X size={22} strokeWidth={2.5} />
                        </button>

                        <div className="text-center mb-6 md:mb-10 w-full mt-2">
                            <h2 className="text-[#1A3463] text-xl md:text-2xl lg:text-3xl font-semibold drop-shadow-sm leading-tight">
                                Medalhas de {titles[tier]} ({badges?.length || 0})
                            </h2>
                        </div>

                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
                            {badges?.map((badge, index) => (
                                <div key={index} className="flex items-center gap-4 bg-white/60 p-4 rounded-2xl border border-[#1D87BC]/20">
                                    <img src={badge.image} alt={badge.name} className="w-16 h-16 object-contain" />
                                    <div>
                                        <h3 className="font-semibold text-[#1A3463] text-md">{badge.name}</h3>
                                        <p className="text-sm text-[#1A3463]/70 leading-tight mb-1">{badge.description}</p>
                                        <span className="text-sm font-semibold text-[#1D87BC] uppercase">Ganha em {badge.date}</span>
                                    </div>
                                </div>
                            ))}
                            {(!badges || badges.length === 0) && (
                                <p className="text-center col-span-2 py-10 text-[#1A3463]/50">Ainda não tens medalhas neste nível.</p>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </>
    );
}