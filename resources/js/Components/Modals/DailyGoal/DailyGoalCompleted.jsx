import { motion, AnimatePresence } from "framer-motion";

export default function DailyGoalCompleted({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                    className="
                        relative w-full max-w-xl
                        bg-[#1D87BC]/50 backdrop-blur-md
                        rounded-3xl shadow-2xl
                        p-6 flex flex-col items-center text-center
                    "
                    style={{
                        boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
                    }}
                >
                    <h2 className="w-full text-[#1A3463] text-xl md:text-2xl font-semibold mb-3 drop-shadow-sm">
                        Uau!! Mais um objetivo cumprido.
                    </h2>

                    <p className="text-[#1A3463] text-lg font-normal mb-8">
                        Parabéns, estás num bom caminho!!
                    </p>

                    <button
                        onClick={onClose}
                        className="
                            bg-[#0E99A4]/70
                            text-white font-semibold text-lg
                            px-10 py-3 rounded-full
                            shadow-[0_4px_14px_rgba(0,0,0,0.25)]
                            hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)]
                            active:scale-95
                            transition-all duration-300
                            cursor-pointer
                        "
                    >
                        Objetivo diário concluído com sucesso!
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}