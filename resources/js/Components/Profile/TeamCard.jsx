export default function TeamCard({ team }) {
    if (!team) return (
        <div className="flex flex-col justify-between bg-white/40 w-full lg:w-2/5 rounded-2xl p-4 md:p-6 h-full shadow-sm">

            <div className="text-center lg:text-left">
                <h2 className="text-[#1C5E8F] text-lg md:text-xl font-semibold leading-none mb-1">
                    A Tua Equipa
                </h2>
                <h3 className="text-[#1C5E8F] text-lg text-center font-normal opacity-90 mt-5">
                    Ainda não pertences a nenhuma equipa
                </h3>
            </div>

        </div>
    )

    return (
        <div className="flex flex-col justify-between bg-white/40 w-full lg:w-2/5 rounded-2xl p-4 md:p-6 h-full shadow-sm">

            <div className="text-center lg:text-left">
                <h2 className="text-[#1C5E8F] text-lg md:text-xl font-semibold leading-none mb-1">
                    A Tua Equipa
                </h2>
                <h3 className="text-[#1C5E8F] text-lg text-center md:text-xl font-medium">
                    {team.name}
                </h3>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-between gap-3 md:gap-4 my-4">
                {team.members.map((member, index) => (
                    <img
                        key={index}
                        src={member.avatar}
                        alt={`Membro da equipa ${index + 1}`}
                        className="
                            w-14 h-14 md:w-16 md:h-16 xl:w-20 xl:h-20
                            object-cover
                            border-4 border-[#60B4D9]
                            rounded-full shadow-sm
                            transition-transform hover:scale-110
                        "
                    />
                ))}
            </div>

            <div className="text-[#1C5E8F] space-y-1 mt-auto text-center lg:text-left">
                <p className="font-medium text-sm md:text-base">
                    Ranking: <span className="font-normal text-[#1C5E8F]">{team.rank}º lugar</span>
                </p>
                <p className="font-medium text-sm md:text-base">
                    Pontos totais: <span className="font-normal text-[#1C5E8F]">{team.points} pontos</span>
                </p>
            </div>

        </div>
    );
}