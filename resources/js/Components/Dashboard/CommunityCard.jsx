import { Link } from "@inertiajs/react";
import CommunityUserIcon from "../Icons/CommunityUserIcon";
import { route } from "ziggy-js";

export default function CommunityCard({ messages }) {

    return (
        <div className="flex flex-col items-center bg-white/40 p-4 pb-6 px-6 h-full w-full mx-auto md:mx-0 max-w-[700px] rounded-xl">
            <div className="flex w-full flex-row justify-between">
                <h2 className="text-[#1C5E8F] text-lg font-semibold">Comunidade</h2>
                <Link
                    href={route('community.index')}
                    className="text-[#1C5E8F] text-sm font-medium"
                >
                    Ver mais informação
                </Link>
            </div>

            <div className="bg-[#1D87BC]/40 w-full rounded-xl p-4 flex flex-col h-full justify-center gap-1.5">
                {messages.map((item, index) => (
                    <div
                        key={item.name + item.content}
                        className={`
                            flex flex-row items-center gap-3 py-3 
                            ${index !== messages.length - 1 ? 'border-b border-white/40' : ''}
                        `}
                    >
                        <div className="shrink-0">
                            <CommunityUserIcon />
                        </div>
                        <p className="text-[#1C5E8F] text-sm font-normal leading-snug truncate flex-1 min-w-0">
                            <span className="font-bold mr-1">{item.name}:</span>
                            <span className="opacity-90 font-normal">{item.content.charAt(0).toUpperCase() + item.content.slice(1)}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}