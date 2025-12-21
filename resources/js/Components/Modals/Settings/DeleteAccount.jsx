import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function DeleteAccountModal({ show, onClose, onConfirm, processing }) {
    if (!show) return null;

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
                                Eliminar Conta Permanentemente
                            </h2>

                            <p className="mt-4 text-md text-[#1A3463]">
                                Tens a certeza que desejas eliminar a tua conta? Esta ação é <strong>irreversível</strong> e todos os teus dados (atividades, medalhas e pontos) serão perdidos para sempre.
                            </p>
                        </div>

                        <div className="mt-6 flex flex-col md:flex-row justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm font-medium text-[#1C5E8F] bg-white/40 rounded-full hover:bg-white/60 transition-all cursor-pointer"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={processing}
                                className="w-full sm:w-auto flex-1 max-w-[300px] bg-linear-to-r from-[#CE2828]/50 via-[#CE2828]/75 to-[#CE2828] text-white px-6 py-2.5 transition-all duration-300 transform hover:scale-105 hover:shadow-lg tracking-wide text-sm font-medium rounded-full cursor-pointer justify-center shadow-md"
                            >
                                {processing ? "A eliminar..." : "Sim, eliminar conta"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </>
    );
}