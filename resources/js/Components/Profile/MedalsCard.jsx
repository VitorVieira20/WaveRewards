import { useState } from "react";
import BadgesListModal from "../Modals/Profile/BadgesList";

export default function MedalsCard({ medals, recent_achievements, all_earned_badges }) {
    const order = ['gold', 'silver', 'bronze'];
    const [selectedTier, setSelectedTier] = useState(null);

    return (
        <div className="flex flex-col w-full bg-white/40 p-4 rounded-2xl gap-2">
            <h2 className="text-xl text-[#1C5E8F] font-semibold">Medalhas</h2>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-row bg-[#1D87BC]/40 pl-4 pr-4 pt-2 pb-2 rounded-2xl shadow-sm gap-1 border border-[#1C5E8F]/50 w-full justify-between items-center">
                    {order.map((tier) => {
                        const medal = medals[tier];
                        return (
                            <div
                                key={tier}
                                onClick={() => setSelectedTier(tier)}
                                className="flex flex-col items-center gap-2 cursor-pointer">
                                <img
                                    src={medal.image}
                                    className="w-20 object-cover"
                                />
                                <p className="text-[#1C5E8F] font-normal">{medal.count} medalhas</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-md text-[#1C5E8F] font-semibold px-1 mt-2">Últimas Conquistas</h3>
                <div className="flex flex-col gap-3">
                    {recent_achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-3 bg-white/30 p-2 rounded-xl border border-white/50">
                            <img src={achievement.image} className="w-8 h-8 object-contain" />
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-[#1A3463] leading-none">{achievement.name}</span>
                                <span className="text-xs text-[#1A3463]/60">{achievement.date}</span>
                            </div>
                        </div>
                    ))}
                    {recent_achievements.length === 0 && (
                        <p className="text-[10px] text-center text-[#1C5E8F]/50 py-2">Ainda sem conquistas.</p>
                    )}
                </div>
            </div>

            <BadgesListModal
                show={!!selectedTier}
                onClose={() => setSelectedTier(null)}
                tier={selectedTier}
                badges={all_earned_badges[selectedTier]}
            />
        </div>
    );
}