export default function ObjectivesCard({ upcoming_achievements }) {

    const unitsMap = {
        workshops: 'workshops',
        distance: 'km',
        calories: 'kcal',
        trash: 'kg',
        time: 'min',
        activities: 'atividades'
    };

    return (
        <div className="flex flex-col w-full bg-white/40 p-4 rounded-2xl gap-2">
            <h2 className="text-xl text-[#1C5E8F] font-semibold">Objetivos</h2>
            {upcoming_achievements.map((objective, index) => {
                const translatedName = objective.name
                    .replace(/silver/i, 'Prata')
                    .replace(/gold/i, 'Ouro');

                const isTrash = objective.category === 'trash';
                const displayCurrent = isTrash ? objective.current / 1000 : objective.current;

                const percentage = Math.min(100, Math.round((displayCurrent / objective.target) * 100));
                const unit = unitsMap[objective.category] || '';

                return (
                    <div key={index} className="bg-[#1D87BC]/40 pl-4 pr-4 pt-2 pb-2 rounded-2xl shadow-sm flex flex-col gap-1 border border-[#1C5E8F]/50">

                        <h2 className="text-md text-[#1C5E8F] items-start font-medium">
                            {index + 1}. {translatedName}
                        </h2>

                        <div className="flex flex-col md:flex-row md:justify-between text-sm px-2">
                            <p className="text-[#1C5E8F] font-medium">
                                Meta: <span className="font-normal">{objective.target} {unit}</span>
                            </p>
                        </div>

                        <p className="text-[#1C5E8F] font-medium text-sm px-2">
                            Progresso: <span className="font-normal">
                                {isTrash ? displayCurrent.toFixed(2) : displayCurrent} / {objective.target} {unit}
                            </span>
                        </p>

                        <div className="mx-2 mt-2 mb-1 bg-white/40 rounded-full h-1.5 overflow-hidden shadow-inner">
                            <div
                                className="bg-[#3699C5] h-1.5 rounded-full transition-all duration-700 ease-out"
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}