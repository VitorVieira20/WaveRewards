const objectivesData = [
    { title: 'Distância Mensal', goal: 130, remaining_days: 8, progress: 67, unit: 'Km' },
    { title: 'Desafios Completados', goal: 10, remaining_days: 10, progress: 8, unit: 'desafios' },
    { title: 'Lixos Recolhidos', goal: 20, remaining_days: 4, progress: 14, unit: 'Kg' }
];

export default function ObjectivesCard() {

    return (
        <div className="flex flex-col w-full bg-white/40 p-4 rounded-2xl gap-2">
            <h2 className="text-xl text-[#1C5E8F] font-semibold">Objetivos</h2>
            {objectivesData.map((objective, index) => {
                const percentage = Math.min(100, Math.round((objective.progress / objective.goal) * 100));

                return (
                    <div key={index} className="bg-[#1D87BC]/40 pl-4 pr-4 pt-2 pb-2 rounded-2xl shadow-sm flex flex-col gap-1 border border-[#1C5E8F]/50">

                        <h2 className="text-md text-[#1C5E8F] items-start font-medium">
                            {index + 1}. {objective.title}
                        </h2>

                        <div className="flex flex-col md:flex-row md:justify-between text-sm px-2">
                            <p className="text-[#1C5E8F] font-medium">
                                Meta: <span className="font-normal">{objective.goal} {objective.unit}</span>
                            </p>
                            <p className="text-[#1C5E8F] font-medium">
                                Dias restantes: <span className="font-normal">{objective.remaining_days} dias</span>
                            </p>
                        </div>

                        <p className="text-[#1C5E8F] font-medium text-sm px-2">
                            Progresso: <span className="font-normal">{objective.progress}/{objective.goal}</span>
                        </p>

                        <div className="mx-2 mt-2 mb-1 bg-white/40 rounded-full h-1.5 overflow-hidden">
                            <div
                                className="bg-[#3699C5] h-1.5 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${percentage}%` }}
                            ></div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}