import BoatEmoji from "../Emojis/BoatEmoji";
import FireEmoji from "../Emojis/FireEmoji";
import RecycleEmoji from "../Emojis/RecycleEmoji";
import StarEmoji from "../Emojis/StarEmoji";

export default function StatsCard({ stats }) {

    const trash = (stats.total_trash / 1000).toFixed(2);

    const statsData = [
        { title: 'Distância Total', emoji: <BoatEmoji />, value: stats.total_distance, unit: 'Km', description: 'percorridos' },
        { title: 'Pontos Totais', emoji: <StarEmoji />, value: stats.total_points, unit: '', description: 'pontos acumulados' },
        { title: 'Calorias', emoji: <FireEmoji />, value: stats.total_calories, unit: '', description: 'calorias queimados' },
        { title: 'Impacto Ambiental', emoji: <RecycleEmoji />, value: trash ?? 0, unit: 'Kg', description: 'lixo recolhido' }
    ];

    return (
        <div className="flex flex-col w-full bg-white/40 p-4 rounded-2xl gap-4">
            <h2 className="text-xl text-[#1C5E8F] font-semibold">Estatísticas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {statsData.map((stat, index) => (
                    <div key={index} className="bg-[#1D87BC]/40 p-1 rounded-2xl shadow-sm flex flex-col items-center gap-2 border border-[#1C5E8F]/50">
                        <p className="text-[#1C5E8F] text-md font-medium tracking-wide text-center">
                            {stat.title}
                        </p>

                        <div className="text-5xl w-12 h-12 flex items-center justify-center rounded-full">
                            {stat.emoji}
                        </div>

                        <p className="text-[#1C5E8F] text-2xl font-medium leading-none text-center">
                            {stat.value} <span className="text-md">{stat.unit}</span>
                        </p>

                        <p className="text-[#1C5E8F]/70 text-sm text-center">
                            {stat.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}