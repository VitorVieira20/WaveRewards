import { useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Users, AlignLeft, Camera } from "lucide-react";
import { useState } from "react";
import { route } from "ziggy-js";

export default function CreateTeamModal({ isOpen, onClose }) {
    const [preview, setPreview] = useState(null);

    const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
        name: '',
        description: '',
        image: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('teams.store'), {
            onSuccess: () => {
                reset();
                setPreview(null);
                onClose();
            },
        });
    };

    const handleClose = () => {
        clearErrors();
        reset();
        setPreview(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-sm overflow-y-auto"
                onClick={handleClose}
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
                        p-6 md:p-8 lg:p-10
                        flex flex-col items-center
                        my-auto
                    "
                >
                    <button 
                        type="button"
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-50 text-[#1A3463] hover:scale-110 transition-transform p-1.5 bg-white/20 rounded-full cursor-pointer"
                    >
                        <X size={22} strokeWidth={2.5} />
                    </button>

                    <div className="text-center mb-6 md:mb-10 w-full mt-2">
                        <h2 className="text-[#1A3463] text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-sm leading-tight">
                            Criar Nova Equipa
                        </h2>
                        <p className="text-[#1A3463] text-sm md:text-base mt-1 font-medium opacity-80">
                            Preenche os dados para começar a tua jornada
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            
                            <div className="md:col-span-1">
                                <label className="
                                    flex flex-col items-center justify-center 
                                    aspect-square md:aspect-auto md:h-full 
                                    min-h-[200px] md:min-h-[280px]
                                    bg-white/40 hover:bg-white/50 
                                    rounded-2xl cursor-pointer transition-all 
                                    border-2 border-dashed border-[#1A3463]/20 
                                    relative overflow-hidden group
                                ">
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                    
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                                    ) : (
                                        <div className="flex flex-col items-center gap-2 text-[#1A3463]">
                                            <Camera className="w-8 h-8 md:w-10 md:h-10 opacity-70" />
                                            <span className="text-xs uppercase font-bold tracking-wider">Logótipo</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-[#1A3463]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Upload className="text-white w-8 h-8" />
                                    </div>
                                </label>
                                {errors.image && <p className="text-red-900 text-xs mt-2 font-bold text-center">{errors.image}</p>}
                            </div>

                            <div className="md:col-span-2 flex flex-col gap-4">                                
                                <div className="flex flex-col bg-white/40 p-4 rounded-2xl transition-all focus-within:bg-white/50 focus-within:shadow-inner">
                                    <div className="flex items-center gap-2 mb-2 opacity-90 text-[#1A3463]">
                                        <Users className="w-4 h-4" />
                                        <span className="text-xs uppercase font-bold tracking-wider">Nome da Equipa</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="Wave Warriors..."
                                        className="bg-transparent border-none p-0 text-lg font-bold text-[#1A3463] placeholder:text-[#1A3463]/30 w-full focus:ring-0 outline-none"
                                    />
                                    {errors.name && <p className="text-red-900 text-xs font-bold mt-1">{errors.name}</p>}
                                </div>

                                <div className="flex flex-col bg-white/40 p-4 rounded-2xl transition-all focus-within:bg-white/50 focus-within:shadow-inner flex-grow">
                                    <div className="flex items-center gap-2 mb-2 opacity-90 text-[#1A3463]">
                                        <AlignLeft className="w-4 h-4" />
                                        <span className="text-xs uppercase font-bold tracking-wider">Descrição</span>
                                    </div>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        placeholder="Qual é o vosso lema?"
                                        rows="4"
                                        className="bg-transparent border-none p-0 text-base md:text-lg font-medium text-[#1A3463] placeholder:text-[#1A3463]/30 focus:ring-0 outline-none w-full resize-none scrollbar-hide"
                                    />
                                    {errors.description && <p className="text-red-900 text-xs font-bold mt-1">{errors.description}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4 mt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 bg-[#0E99A4]/70 text-white font-bold text-lg text-center px-10 py-4 rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] active:scale-95 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                            >
                                {processing ? 'A criar...' : 'Criar Equipa'}
                            </button>
                            
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 bg-white/30 text-[#1A3463] font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 hover:bg-white/40 active:scale-95 cursor-pointer"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}