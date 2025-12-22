import { useForm, Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
import ActivityRegistered from "../../../Components/Modals/Activities/ActivityResgistered";
import LeftArrowIcon from "../../../Components/Icons/LeftArrowIcon";

export default function FreeActivityCreate({ auth }) {
    const { flash } = usePage().props;
    const [showActivityResgisteredModal, setShowActivityResgisteredModal] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const { data, setData, post, processing, reset, clearErrors } = useForm({
        custom_title: '',
        date: '',
        start_time: '',
        distance: '',
        practice_time: '',
        wasted_calories: '',
        frequency: '',
        effort: '',
        custom_location: '',
        custom_conditions: '',
        training_goal: '',
        custom_equipment: '',
        trash_collected: '',
        observations: '',
        counts_for_goal: true,
        photo: null
    });

    useEffect(() => {
        if (flash?.activity_completed?.status === "completed") {
            setShowActivityResgisteredModal(true);
        }
    }, [flash]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('photo', file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('activities.free.store'), {
            onSuccess: () => {
                setPreviewImage(null);
                reset();
                clearErrors();
            }
        });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed w-full text-[#1A3463] pb-4 px-6 md:px-16 text-2xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#DDEFF7] 3xl:to-[#E7F3F9] flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex items-center md:mt-3 lg:mt-0 cursor-pointer"
                >
                    <LeftArrowIcon color="#1C5E8F" />
                </button>


                <span>Registo de atividade livre</span>
            </h1>

            <div className="pt-24 pb-10 px-4 md:px-16 min-h-screen">
                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">

                    <div className="w-full lg:w-1/2 bg-[#FFFFFF]/40 backdrop-blur-sm rounded-3xl p-6 shadow-sm">
                        <h2 className="text-[#1C5E8F] text-2xl font-semibold mb-4">Detalhes da Atividade</h2>

                        <div className="relative">
                            <div className="mb-4">
                                <label className="block text-[#1C5E8F] font-semibold text-sm mb-1">Tipo de atividade:</label>
                                <input
                                    type="text"
                                    value={data.custom_title}
                                    onChange={e => setData('custom_title', e.target.value)}
                                    placeholder="Ex: Canoagem noturna"
                                    className="w-full rounded-full border-none px-4 py-1 text-sm bg-white focus:ring-[#1C5E8F] placeholder-[#1C5E8F]/40"
                                />
                            </div>

                            <div className="mb-4">
                                {previewImage ? (
                                    <div className="relative w-full h-48 rounded-2xl overflow-hidden shadow-md group">
                                        <img
                                            src={previewImage}
                                            className="w-full h-full object-cover"
                                            alt="Preview"
                                        />
                                        <label className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                                            <svg className="w-8 h-8 text-white mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            <span className="text-white font-medium text-sm">Alterar foto</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                        </label>
                                    </div>
                                ) : (
                                    <label className="w-full h-32 border-2 border-dashed border-[#1C5E8F]/40 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/30 hover:border-[#1C5E8F] transition-all duration-300 group">
                                        <div className="bg-white/60 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                                            <svg className="w-6 h-6 text-[#1C5E8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        </div>
                                        <span className="text-[#1C5E8F] font-medium text-sm">Adicionar uma foto</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                                <label className="block text-[#1C5E8F] font-semibold text-sm mb-1">Data:</label>
                                <input type="date" value={data.date} onChange={e => setData('date', e.target.value)} className="w-full rounded-full border-none px-4 py-1 text-sm bg-white" />
                            </div>
                            <div>
                                <label className="block text-[#1C5E8F] font-semibold text-sm mb-1">Hora de início:</label>
                                <input type="time" value={data.start_time} onChange={e => setData('start_time', e.target.value)} className="w-full rounded-full border-none px-4 py-1 text-sm bg-white" />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="block text-[#1C5E8F] font-semibold text-sm mb-1">Local:</label>
                            <input type="text" value={data.custom_location} onChange={e => setData('custom_location', e.target.value)} className="w-full rounded-full border-none px-4 py-1 text-sm bg-white" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                                <label className="block text-[#1C5E8F] font-semibold text-sm mb-1">Condições:</label>
                                <input type="text" value={data.custom_conditions} onChange={e => setData('custom_conditions', e.target.value)} className="w-full rounded-full border-none px-4 py-1 text-sm bg-white" />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="block text-[#1C5E8F] font-semibold text-sm mb-1">Equipamento usado:</label>
                            <input type="text" value={data.custom_equipment} onChange={e => setData('custom_equipment', e.target.value)} className="w-full rounded-full border-none px-4 py-1 text-sm bg-white" />
                        </div>

                        <div className="mb-3">
                            <label className="block text-[#1C5E8F] font-semibold text-sm mb-1">Observações/comentários pessoais:</label>
                            <textarea
                                rows="4"
                                placeholder="Escreve a tua mensagem..."
                                value={data.observations}
                                onChange={e => setData('observations', e.target.value)}
                                className="w-full rounded-2xl border-none px-4 py-2 text-sm bg-white resize-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 bg-[#FFFFFF]/40 backdrop-blur-sm rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            <h2 className="text-[#1C5E8F] text-2xl font-semibold mb-4">Métricas e Progresso</h2>

                            <div className="space-y-3">
                                <div>
                                    <label className="block text-[#1C5E8F] font-semibold text-sm mb-1">Distância percorrida (m):</label>
                                    <input type="number" value={data.distance} onChange={e => setData('distance', e.target.value)} className="w-full rounded-full border-none px-4 py-1 text-sm bg-white" />
                                </div>
                                <div>
                                    <label className="block text-[#1C5E8F] font-semibold text-sm mb-1">Tempo total de prática (minutos):</label>
                                    <input type="number" value={data.practice_time} onChange={e => setData('practice_time', e.target.value)} className="w-full rounded-full border-none px-4 py-1 text-sm bg-white" />
                                </div>
                                <div>
                                    <label className="block text-[#1C5E8F] font-semibold text-sm mb-1">Calorias estimadas gastas (kcal):</label>
                                    <input type="number" value={data.wasted_calories} onChange={e => setData('wasted_calories', e.target.value)} className="w-full rounded-full border-none px-4 py-1 text-sm bg-white" />
                                </div>
                                <div>
                                    <label className="block text-[#1C5E8F] font-semibold text-sm mb-1">Frequência cardíaca média (bpm):</label>
                                    <input type="number" value={data.frequency} onChange={e => setData('frequency', e.target.value)} className="w-full rounded-full border-none px-4 py-1 text-sm bg-white" />
                                </div>
                                <div>
                                    <label className="block text-[#1C5E8F] font-semibold text-sm mb-1">Grau de esforço (1-10):</label>
                                    <input type="number" min="1" max="10" value={data.effort} onChange={e => setData('effort', e.target.value)} className="w-full rounded-full border-none px-4 py-1 text-sm bg-white" />
                                </div>
                                <div>
                                    <label className="block text-[#1C5E8F] font-semibold text-sm mb-1">Lixo Recolhido (g):</label>
                                    <input type="number" value={data.trash_collected} onChange={e => setData('trash_collected', e.target.value)} placeholder="Opcional" className="w-full rounded-full border-none px-4 py-1 text-sm bg-white" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center justify-between bg-white/50 p-3 rounded-2xl border border-[#1A3463]/5 mb-4">
                                <div className="flex flex-col">
                                    <span className="text-[#1C5E8F] font-semibold text-sm">Objetivo Diário</span>
                                    <span className="text-[#1C5E8F]/70 text-xs">Contar para a meta de hoje?</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={data.counts_for_goal} onChange={(e) => setData('counts_for_goal', e.target.checked)} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6EA8C5]"></div>
                                </label>
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" disabled={processing} className="bg-[#5A92AF] hover:bg-[#4a7a94] text-white font-medium py-3 px-8 rounded-full shadow-lg transition duration-200 cursor-pointer disabled:opacity-50">
                                    Registar atividade
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                {showActivityResgisteredModal && (
                    <ActivityRegistered
                        isOpen={showActivityResgisteredModal}
                        onClose={() => setShowActivityResgisteredModal(false)}
                        points={flash?.activity_completed?.points}
                    />
                )}
            </div>
        </AuthenticatedLayout>
    );
}