import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function TeamCard({ team }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 150;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    if (!team) return (
        <div className="flex flex-col justify-between bg-white/40 w-full lg:w-2/5 rounded-2xl p-4 md:p-6 h-full shadow-sm border border-white/50 backdrop-blur-sm">
            <div className="text-center lg:text-left">
                <h2 className="text-[#1C5E8F] text-lg md:text-xl font-semibold leading-none mb-1">
                    A Tua Equipa
                </h2>
                <h3 className="text-[#1C5E8F] text-lg text-center font-normal opacity-90 mt-5">
                    Ainda não pertences a nenhuma equipa
                </h3>
            </div>
        </div>
    );

    const showArrows = team.members && team.members.length > 4;

    return (
        <div className="flex flex-col justify-between bg-white/40 w-full lg:w-2/5 rounded-2xl p-4 md:p-6 h-full shadow-sm border border-white/50 backdrop-blur-sm">

            <div className="text-center lg:text-left">
                <h2 className="text-[#1C5E8F] text-lg md:text-xl font-semibold leading-none mb-1">
                    A Tua Equipa
                </h2>
                <Link
                    href={route('teams.myTeam')}
                    className="block w-fit mx-auto hover:scale-105 transition-all duration-200 cursor-pointer"
                >
                    <h3 className="text-[#1C5E8F] text-lg text-center md:text-xl font-medium truncate px-2">
                        {team.name}
                    </h3>
                </Link>
            </div>

            <div className="relative my-4 group">

                {showArrows && (
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#1C5E8F] p-1 rounded-full shadow-md backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}

                <div
                    ref={scrollRef}
                    className="
                        flex items-center gap-8 md:gap-12 overflow-x-auto 
                        py-2 px-1 scroll-smooth 
                        /* Esconder scrollbar nativa */
                        [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
                    "
                >
                    {team.members.map((member, index) => (
                        <div key={index} className="shrink-0 relative group/avatar">
                            <img
                                src={member.avatar}
                                referrerPolicy="no-referrer"
                                alt={`Membro ${index + 1}`}
                                className="
                                    w-14 h-14 md:w-16 md:h-16 xl:w-20 xl:h-20
                                    object-cover
                                    border-4 border-[#60B4D9]
                                    rounded-full shadow-sm
                                    transition-transform hover:scale-105
                                "
                            />
                            {/* Tooltip simples com nome (opcional) */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#1A3463] text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover/avatar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                                {member.name || 'Membro'}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Botão Direito */}
                {showArrows && (
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#1C5E8F] p-1 rounded-full shadow-md backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                    >
                        <ChevronRight size={20} />
                    </button>
                )}
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