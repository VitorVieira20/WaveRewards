import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import LeftArrowIcon from "../../../Components/Icons/LeftArrowIcon";
import CommunityUserIcon from "../../../Components/Icons/CommunityUserIcon";
import { useState } from "react";

const ChevronDownIcon = () => (
    <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
);

export default function CommunityIndex({ auth, posts, tags, currentTag }) {
    const handleFilter = (tagName) => {
        router.get(route('community.index'), { tag: tagName }, { preserveState: true });
    };

    const allTags = [{ id: 'all', name: 'Geral' }, ...tags];

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed flex gap-3 w-full text-[#1A3463] pb-4 px-6 md:px-16 text-3xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#DDEFF7] 3xl:to-[#E7F3F9]">
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex items-center cursor-pointer"
                >
                    <LeftArrowIcon color="#1C5E8F" />
                </button>

                Comunidade
            </h1>

            <div className="pt-24 pb-10 px-4 md:px-16 min-h-screen">

                <div className="bg-white/40 p-4 pr-6 pb-6 rounded-2xl">

                    <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6">

                        <div className="
                            w-full lg:w-auto 
                            grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap lg:justify-start 
                            gap-2
                        ">
                            {allTags.map((tag) => (
                                <button
                                    key={tag.id}
                                    onClick={() => handleFilter(tag.name)}
                                    className={`
                                        px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
                                        flex justify-center items-center text-center truncate shadow-sm
                                        ${currentTag === tag.name
                                            ? 'bg-linear-to-r from-[#1C5E8F]/50 via-[#1C5E8F]/75 to-[#1C5E8F] text-white shadow-md'
                                            : 'bg-linear-to-r from-[#1C5E8F]/25 via-[#1C5E8F]/40 to-[#1C5E8F]/50 text-white hover:scale-105'}
                                        `}
                                >
                                    {tag.name.charAt(0).toUpperCase() + tag.name.slice(1)}
                                </button>
                            ))}
                        </div>

                        <Link
                            href={route('community.create')}
                            className="
                                w-full lg:w-auto flex justify-center items-center
                                bg-[#0E99A4]/70 hover:bg-[#0b7c85]/70 
                                text-white px-6 py-2 rounded-full font-medium 
                                shadow-md transition-all active:scale-95 whitespace-nowrap
                            "
                        >
                            Partilhar com a comunidade
                        </Link>
                    </div>
                    <div className="bg-[#1D87BC]/40 backdrop-blur-sm rounded-2xl p-6 h-[600px] flex flex-col justify-start relative overflow-hidden">

                        <div className="flex flex-col w-full overflow-y-auto h-full pr-2 pb-10 
                            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

                            {posts.length > 0 ? posts.map((post, index) => (
                                <div
                                    key={post.id}
                                    className="flex flex-row items-center justify-between gap-4 w-full px-2 shrink-0"
                                >
                                    <div className={`flex items-center py-2 gap-3 flex-1 min-w-0 border-t-2 border-white/50 ${index === posts.length - 1 ? 'border-b-2 border-white/50' : ''}`}>
                                        <div className="shrink-0 p-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                                            <CommunityUserIcon className="w-5 h-5 text-[#1A3463]" />
                                        </div>
                                        <p className="text-[#1C5E8F] text-sm md:text-base font-medium truncate">
                                            <span className="font-normal mr-1">{post.user.name}:</span>
                                            <span className="font-normal opacity-90">{post.content.charAt(0).toUpperCase() + post.content.slice(1)}</span>
                                        </p>
                                    </div>

                                    <div className="hidden md:flex gap-2 shrink-0">
                                        {post.tags.map(tag => (
                                            <span
                                                key={tag.id}
                                                className="
                                                    w-[140px] flex justify-center items-center text-center
                                                    bg-[#0E99A4]/40 text-white text-sm px-5 py-2 
                                                    rounded-full font-medium shadow-sm backdrop-blur-sm 
                                                    truncate
                                                "
                                                title={tag.name}
                                            >
                                                {tag.name.charAt(0).toUpperCase() + tag.name.slice(1)}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-20 text-[#1A3463]/60 flex flex-col items-center justify-center h-full">
                                    <p className="text-lg font-medium">Ainda não há mensagens nesta categoria.</p>
                                    <p className="text-sm">Sê o primeiro a partilhar!</p>
                                </div>
                            )}
                        </div>

                        {posts.length > 6 && (
                            <div className="absolute bottom-0 left-0 w-full h-16 bg-linear-to-t from-[#60B4D9]/80 to-transparent flex justify-center items-end pb-2 pointer-events-none rounded-b-2xl">
                                <div className="animate-bounce bg-[#1A3463]/20 p-1 rounded-full backdrop-blur-md">
                                    <ChevronDownIcon />
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}