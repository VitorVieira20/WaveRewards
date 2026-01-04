import { Dialog, Transition, Disclosure, TransitionChild, DialogPanel, DialogTitle, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Fragment } from "react";
import { Bike, Footprints, Dumbbell, Activity, ChevronDown, Timer, MapPin, Heart, TrendingUp } from "lucide-react";

const categoryConfig = {
    Ride: { label: "Ciclismo", icon: Bike, color: "text-orange-500" },
    Run: { label: "Corrida", icon: Footprints, color: "text-green-500" },
    WeightTraining: { label: "Musculação", icon: Dumbbell, color: "text-blue-500" },
    Workout: { label: "Treino", icon: Activity, color: "text-purple-500" }
};

export default function StravaActivitiesModal({ isOpen, onClose, activities }) {
    if (!isOpen) return null;

    const formatDistance = (meters) => (meters / 1000).toFixed(2) + " km";
    const formatTime = (seconds) => Math.floor(seconds / 60) + " min";
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('pt-PT');

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-3xl bg-linear-to-b from-[#EAF5FA] to-[#DDEFF7] p-6 shadow-xl transition-all border border-white/50">
                                <DialogTitle className="text-2xl font-bold text-[#1A3463] mb-6 flex items-center justify-between">
                                    Atividades do Strava
                                    <button onClick={onClose} className="text-[#1A3463]/50 hover:text-[#1A3463] cursor-pointer">
                                        ×
                                    </button>
                                </DialogTitle>

                                <div className="space-y-3">
                                    {Object.entries(activities).map(([type, items]) => {
                                        const config = categoryConfig[type] || { label: type, icon: Activity, color: "text-gray-500" };
                                        const Icon = config.icon;

                                        return (
                                            <Disclosure key={type}>
                                                {({ open }) => (
                                                    <div className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 overflow-hidden">
                                                        <DisclosureButton className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-white/60 cursor-pointer">
                                                            <div className="flex items-center gap-3">
                                                                <div className={`p-2 rounded-xl bg-white shadow-sm ${config.color}`}>
                                                                    <Icon size={20} />
                                                                </div>
                                                                <span className="font-semibold text-[#1C5E8F]">
                                                                    {config.label} ({items.length})
                                                                </span>
                                                            </div>
                                                            <ChevronDown className={`text-[#1C5E8F] transition-transform ${open ? 'rotate-180' : ''}`} size={20} />
                                                        </DisclosureButton>

                                                        <DisclosurePanel className="px-5 pb-4 space-y-3">
                                                            {items.map((act) => (
                                                                <div key={act.id} className="bg-white/80 rounded-xl p-4 shadow-sm border border-[#1D87BC]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                                    <div>
                                                                        <h4 className="font-bold text-[#1A3463]">{act.name}</h4>
                                                                        <div className="flex items-center gap-3 mt-1 text-xs text-[#1A3463]/60 font-medium">
                                                                            <span className="flex items-center gap-1"><Timer size={12} /> {formatTime(act.moving_time)}</span>
                                                                            <span className="flex items-center gap-1"><MapPin size={12} /> {formatDate(act.start_date)}</span>
                                                                        </div>
                                                                    </div>

                                                                    <div className="flex items-center gap-4">
                                                                        {act.distance > 0 && (
                                                                            <div className="flex flex-col items-center">
                                                                                <span className="text-sm font-bold text-[#1D87BC]">{formatDistance(act.distance)}</span>
                                                                                <span className="text-[10px] uppercase text-[#1A3463]/40">Distância</span>
                                                                            </div>
                                                                        )}
                                                                        {act.has_heartrate && (
                                                                            <div className="flex flex-col items-center">
                                                                                <span className="text-sm font-bold text-red-500 flex items-center gap-1">
                                                                                    <Heart size={12} fill="currentColor" /> {Math.round(act.average_heartrate)}
                                                                                </span>
                                                                                <span className="text-[10px] uppercase text-[#1A3463]/40">BPM</span>
                                                                            </div>
                                                                        )}
                                                                        {act.total_elevation_gain > 0 && (
                                                                            <div className="flex flex-col items-center">
                                                                                <span className="text-sm font-bold text-emerald-600 flex items-center gap-0.5">
                                                                                    <TrendingUp size={12} /> {act.total_elevation_gain}m
                                                                                </span>
                                                                                <span className="text-[10px] uppercase text-[#1A3463]/40">Subida</span>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </DisclosurePanel>
                                                    </div>
                                                )}
                                            </Disclosure>
                                        );
                                    })}
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}