import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

const Icons = {
    Distance: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    Time: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Fire: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" /></svg>,
    Bolt: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    Trash: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
    Star: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
};

export default function ActivityDetailsModal({ isOpen, onClose, activity }) {
    if (!isOpen || !activity) return null;

    const isSystemActivity = !!activity.activity_id;
    const displayTitle = isSystemActivity ? activity.title : activity.custom_title;
    
    const stats = [
        { 
            label: "Distância", 
            value: activity.distance ? `${activity.distance} km` : "--", 
            icon: Icons.Distance 
        },
        { 
            label: "Duração", 
            value: activity.practice_time ? `${activity.practice_time} min` : "--", 
            icon: Icons.Time 
        },
        { 
            label: "Calorias", 
            value: activity.calories ? `${activity.calories} kcal` : "--", 
            icon: Icons.Fire 
        },
        { 
            label: "Esforço", 
            value: activity.effort || "Moderado", 
            icon: Icons.Bolt 
        },
        { 
            label: "Pontos", 
            value: activity.points ? `+${activity.points}` : "0", 
            icon: Icons.Star,
            highlight: false
        },
    ];

    if (activity.trash_collected && activity.trash_collected > 0) {
        stats.push({ 
            label: "Lixo Recolhido", 
            value: `${activity.trash_collected} L`, 
            icon: Icons.Trash, 
            highlight: true 
        });
    }

    const displayDate = activity.performed_at || activity.date;

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
                        bg-[#1D87BC]/60 backdrop-blur-md
                        rounded-3xl shadow-2xl
                        p-6 flex flex-col items-center
                    "
                    style={{
                        boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
                    }}
                >
                    <button 
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="absolute top-4 right-4 z-50 text-[#1A3463] hover:scale-110 transition-transform p-1 bg-white/20 rounded-full cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>

                    <div className="text-center mb-6 w-full mt-2">
                        <h2 className="w-full text-[#1A3463] text-xl md:text-2xl font-semibold drop-shadow-sm leading-tight px-6">
                            {displayTitle}
                        </h2>
                        <p className="text-[#1A3463] text-sm mt-1 font-medium opacity-80">
                            {displayDate}
                        </p>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-3 mb-8">
                        {stats.map((stat, index) => (
                            <div 
                                key={index} 
                                className={`
                                    flex flex-col items-center justify-center p-3 rounded-2xl
                                    transition-all
                                    ${stat.highlight 
                                        ? 'bg-[#1A3463]/80 text-white shadow-lg' 
                                        : 'bg-white/40 text-[#1A3463] hover:bg-white/50'}
                                `}
                            >
                                <div className="flex items-center gap-1 mb-1 opacity-90">
                                    <stat.icon />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">{stat.label}</span>
                                </div>
                                <span className="text-lg font-bold">{stat.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col w-full gap-3">
                        {isSystemActivity && (
                            <Link
                                href={route('activities.show', activity.activity_id)}
                                className="
                                    w-full
                                    bg-[#0E99A4]/70
                                    text-white font-semibold text-lg text-center
                                    px-10 py-3 rounded-full
                                    shadow-[0_4px_14px_rgba(0,0,0,0.25)]
                                    hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)]
                                    active:scale-95
                                    transition-all duration-300
                                "
                            >
                                Ver Atividade
                            </Link>
                        )}
                        
                        <button
                            type="button"
                            onClick={onClose}
                            className={`
                                w-full
                                font-semibold text-lg
                                px-10 py-3 rounded-full
                                transition-all duration-300
                                active:scale-95
                                cursor-pointer
                                ${isSystemActivity 
                                    ? 'bg-white/30 text-[#1A3463] hover:bg-white/40' 
                                    : 'bg-[#0E99A4]/70 text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:scale-105'}
                            `}
                        >
                            Fechar
                        </button>
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}