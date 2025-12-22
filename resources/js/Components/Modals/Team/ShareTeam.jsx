import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Copy } from "lucide-react";
import { useState } from "react";
import CustomQRCode from "../../CustomQRCode";
import { route } from "ziggy-js";

export default function ShareTeamModal({ show, onClose, team }) {
    if (!show) return null;

    const [copied, setCopied] = useState(false);

    const shareUrl = route('teams.invite', { code: team.invite_code} );

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-xs overflow-y-auto"
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
                            Recrutar para a Equipa
                        </h2>
                    </div>

                    <div className="flex justify-center mb-6">
                        <CustomQRCode
                            url={shareUrl}
                            preset="gradient"
                        />
                    </div>

                    <div className="w-full max-w-xl items-center justify-center">
                        <p className="text-[#1A3463] text-center text-md mb-6">
                            Digitaliza para te juntares à equipa <b>{team.name}</b>
                        </p>

                        <div className="flex items-center gap-2 bg-[#EAF5FA] p-3 rounded-2xl border border-[#1D87BC]/20">
                            <input
                                readOnly
                                value={shareUrl}
                                className="bg-transparent border-none text-sm text-[#1A3463] flex-1 outline-none truncate"
                            />
                            <button onClick={handleCopy} className="text-[#1D87BC] hover:scale-110 transition-transform cursor-pointer">
                                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
