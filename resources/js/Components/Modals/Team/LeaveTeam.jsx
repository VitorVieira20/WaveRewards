import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Listbox } from "@headlessui/react";

export default function LeaveTeamModal({ show, onClose, onConfirm, members, isLastAdmin, name }) {
    if (!show) return null;

    const [selectedAdmin, setSelectedAdmin] = useState(null);

    const handleConfirm = () => {
        if (isLastAdmin && members.length > 0 && !selectedAdmin) {
            alert("Por favor, seleciona um novo administrador.");
            return;
        }

        onConfirm(selectedAdmin?.id ?? null);
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
                            Sair da Equipa
                        </h2>
                    </div>

                    <p className="text-md text-[#1A3463] text-center">
                        Tens a certeza que queres sair de <b>{name}</b>?
                    </p>

                    {isLastAdmin && members.length > 0 && (
                        <div className="mt-6 w-full max-w-2xl p-4 bg-yellow-50 border border-yellow-200 rounded-2xl">
                            <p className="text-xs font-bold text-yellow-800 uppercase mb-2">
                                Atenção: És o único administrador
                            </p>
                            <p className="text-sm text-yellow-700 mb-4">
                                Antes de saíres, tens de promover um membro a administrador para liderar a equipa.
                            </p>

                            {/* Improved select */}
                            <Listbox value={selectedAdmin} onChange={setSelectedAdmin}>
                                <div className="relative">
                                    <Listbox.Button
                                        className="
                                            relative w-full cursor-pointer rounded-xl bg-white/90 
                                            py-2.5 pl-4 pr-10 text-left text-sm 
                                            text-[#1A3463] shadow-sm 
                                            focus:outline-none focus:ring-2 focus:ring-[#1D87BC]
                                        "
                                    >
                                        <span className="block truncate">
                                            {selectedAdmin ? selectedAdmin.name : "Seleciona um sucessor..."}
                                        </span>

                                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                            <ChevronDown size={18} className="text-[#1A3463]" />
                                        </span>
                                    </Listbox.Button>

                                    <Listbox.Options
                                        className="
                                            absolute z-50 mt-2 max-h-60 w-full overflow-auto 
                                            rounded-xl bg-white shadow-xl 
                                            ring-1 ring-black/5 focus:outline-none
                                        "
                                    >
                                        {members.map(member => (
                                            <Listbox.Option
                                                key={member.id}
                                                value={member}
                                                className={({ active }) =>
                                                    `relative cursor-pointer select-none py-2 pl-10 pr-4 text-sm
                                                    ${active
                                                        ? "bg-[#1D87BC]/10 text-[#1A3463]"
                                                        : "text-[#1A3463]"
                                                    }`
                                                }
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span className={`block truncate ${selected ? "font-semibold" : ""}`}>
                                                            {member.name}
                                                        </span>

                                                        {selected && (
                                                            <span className="absolute inset-y-0 left-3 flex items-center">
                                                                <Check size={16} className="text-[#1D87BC]" />
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </div>
                            </Listbox>
                        </div>
                    )}

                    <div className="mt-8 flex w-full max-w-md justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-[#1C5E8F] bg-white/40 rounded-full hover:bg-white/60 transition-all cursor-pointer"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleConfirm}
                            className="
                                flex-1 bg-linear-to-r 
                                from-[#CE2828]/50 via-[#CE2828]/75 to-[#CE2828] 
                                text-white px-6 py-2.5 
                                transition-all duration-300 
                                hover:scale-105 hover:shadow-lg 
                                text-sm font-medium rounded-full cursor-pointer
                            "
                        >
                            Confirmar Saída
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
