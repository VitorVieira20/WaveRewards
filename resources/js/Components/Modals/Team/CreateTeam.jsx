import { useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Users, Type, AlignLeft } from "lucide-react";
import { useState } from "react";
import { route } from "ziggy-js";

// Componente auxiliar para os campos do formulário (inspirado no StatCard)
const FormFieldCard = ({ icon: Icon, label, children, error }) => (
    <div className="bg-white/60 p-4 rounded-2xl border border-white/80 shadow-sm flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-1">
            <div className="bg-[#DDEFF7] p-2.5 rounded-xl text-[#1D87BC] shrink-0">
                <Icon size={22} />
            </div>
            <h3 className="text-[#1A3463] font-bold text-sm uppercase tracking-wider">
                {label}
            </h3>
        </div>
        <div className="pl-1">
            {children}
        </div>
        {error && <p className="text-red-500 text-xs pl-1">{error}</p>}
    </div>
);

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
                className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1A3463]/40 px-4 backdrop-blur-md"
                onClick={handleClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    onClick={(e) => e.stopPropagation()}
                    className="
                        w-full max-w-4xl // Mais largo para acomodar 2 colunas
                        bg-[#EAF5FA] rounded-[2rem] shadow-2xl
                        border border-white/50
                        overflow-hidden
                        max-h-[90vh] overflow-y-auto custom-scrollbar-light
                    "
                >
                    {/* --- CABEÇALHO (Idêntico ao ActivityDetails) --- */}
                    <div className="bg-linear-to-r from-[#1A3463] to-[#1D87BC] p-6 md:p-8 relative overflow-hidden">
                        {/* Background Patterns */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#60B4D9]/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all duration-300 hover:rotate-90"
                        >
                            <X size={20} strokeWidth={2.5} />
                        </button>

                        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                            <div className="shrink-0 relative group">
                                <div className="absolute inset-0 bg-[#FFD700] rounded-[2rem] rotate-6 opacity-20 group-hover:rotate-12 transition-transform duration-500"></div>
                                <div className="bg-linear-to-br from-[#FFD700] to-[#FFA500] p-4 rounded-[2rem] text-[#1A3463] shadow-lg relative transform transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
                                    <Users size={40} strokeWidth={2} className="drop-shadow-sm" />
                                </div>
                            </div>

                            <div className="flex-1 pt-2">
                                <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-2 drop-shadow-sm">
                                    Criar Nova Equipa
                                </h2>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-blue-100 font-medium text-sm">
                                    <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                                        <Users size={14} className="text-[#FFD700]" />
                                        <span>Comunidade</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                                        <hexagon size={14} className="text-[#FFD700]" />
                                        <span>Rankings & Desafios</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- CORPO DO FORMULÁRIO (Grelha 2 Colunas) --- */}
                    <form onSubmit={handleSubmit} className="p-6 md:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

                            {/* COLUNA ESQUERDA: Upload de Imagem (Estilo "Mapa") */}
                            <div className="flex flex-col h-full">
                                <h3 className="text-[#1A3463] font-bold text-lg mb-4 flex items-center gap-2">
                                    <Upload className="text-[#1D87BC]" size={20} />
                                    Logótipo / Capa
                                </h3>
                                <div className="relative group flex-1 min-h-[300px] rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-white transition-all duration-300 hover:shadow-xl">
                                    <input
                                        type="file"
                                        id="team-image"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    <label
                                        htmlFor="team-image"
                                        className={`
                                            absolute inset-0 flex items-center justify-center cursor-pointer transition-all duration-500
                                            ${preview ? 'bg-black/5' : 'bg-[#DDEFF7]/50 hover:bg-[#DDEFF7]'}
                                        `}
                                    >
                                        {preview ? (
                                            <img src={preview} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        ) : (
                                            <div className="flex flex-col items-center text-[#1C5E8F]/60 gap-3 p-6 text-center group-hover:scale-105 transition-transform">
                                                <div className="bg-white p-4 rounded-full shadow-md">
                                                    <Upload size={32} className="text-[#1D87BC]" />
                                                </div>
                                                <span className="font-bold text-lg">Carregar Imagem</span>
                                                <span className="text-sm opacity-70 max-w-[200px]">Recomendado: Formato quadrado ou retangular (PNG, JPG)</span>
                                            </div>
                                        )}

                                        {/* Overlay no Hover se já houver imagem */}
                                        {preview && (
                                            <div className="absolute inset-0 bg-[#1A3463]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 backdrop-blur-xs">
                                                <div className="bg-white/20 p-3 rounded-full backdrop-blur-md border border-white/50 text-white">
                                                    <Upload size={28} />
                                                </div>
                                            </div>
                                        )}
                                    </label>
                                </div>
                                {errors.image && <p className="text-red-500 text-xs mt-2 pl-2 font-medium">{errors.image}</p>}
                            </div>

                            {/* COLUNA DIREITA: Campos do Formulário */}
                            <div className="flex flex-col gap-5">
                                
                                {/* Campo Nome */}
                                <FormFieldCard icon={Type} label="Nome da Equipa" error={errors.name}>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="Ex: Wave Warriors"
                                        className="w-full bg-transparent border-b border-[#1A3463]/10 py-2 text-lg font-bold text-[#1A3463] placeholder:text-[#1A3463]/30 focus:outline-none focus:border-[#1D87BC] transition-colors"
                                    />
                                </FormFieldCard>

                                {/* Campo Descrição */}
                                <FormFieldCard icon={AlignLeft} label="Descrição / Lema" error={errors.description}>
                                    <textarea
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        rows="5"
                                        placeholder="Qual é o objetivo ou lema da vossa equipa? (Opcional)"
                                        className="w-full bg-transparent border-b border-[#1A3463]/10 py-2 font-medium text-[#1A3463] placeholder:text-[#1A3463]/30 focus:outline-none focus:border-[#1D87BC] transition-colors resize-none custom-scrollbar-light leading-relaxed"
                                    ></textarea>
                                </FormFieldCard>

                                {/* Botão de Submissão */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="
                                        mt-auto
                                        w-full py-4 rounded-2xl
                                        bg-linear-to-r from-[#1D87BC] to-[#60B4D9]
                                        text-white font-bold text-lg uppercase tracking-wider
                                        shadow-lg shadow-[#1D87BC]/30
                                        border border-white/20
                                        hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
                                        transition-all duration-300
                                        disabled:opacity-70 disabled:cursor-not-allowed
                                        flex items-center justify-center gap-3
                                        group
                                    "
                                >
                                    {processing ? (
                                        <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Criar Equipa
                                            <Users size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}