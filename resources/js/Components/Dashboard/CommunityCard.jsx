import { Link } from "@inertiajs/react";
import CommunityUserIcon from "../Icons/CommunityUserIcon";

export default function CommunityCard() {
    const communityUpdates = [
        { id: 1, text: "Ana Costa partilhou uma nova rota", type: 'user' },
        { id: 2, text: 'Pedro Silva compartilhou o desafio "Guardião do rio"', type: 'user' },
        { id: 3, text: 'Nova equipa criada "Marés vivas"', type: 'group' },
        { id: 4, text: 'Diana Serrão partilhou um comentário "Maré perigosa na zona da Madalena do mar"', type: 'user' },
    ];

    return (
        <div className="flex flex-col items-center bg-white/40 p-4 pb-6 px-6 h-full w-full mx-auto md:mx-0 max-w-[700px] rounded-xl">
            <div className="flex w-full flex-row justify-between">
                <h2 className="text-[#1C5E8F] text-lg font-semibold">Comunidade</h2>
                <Link 
                    href="#" 
                    className="text-[#1C5E8F] text-sm font-medium"
                >
                    Ver mais informação
                </Link>
            </div>

            <div className="bg-[#1D87BC]/40 rounded-xl p-4 flex flex-col h-full justify-center">
                {communityUpdates.map((item, index) => (
                    <div 
                        key={item.id} 
                        className={`
                            flex flex-row items-center gap-3 py-3 
                            ${index !== communityUpdates.length - 1 ? 'border-b border-white/40' : ''}
                        `}
                    >
                        <div className="shrink-0">
                            <CommunityUserIcon />
                        </div>
                        <p className="text-[#1C5E8F] text-sm font-normal leading-snug">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}