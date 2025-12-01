import { Link } from "@inertiajs/react";
import PlayVideoIcon from "../Icons/PlayVideoIcon";
import PlayIcon from "../Icons/PlayIcon";
import PlusIcon from "../Icons/PlusIcon";

export default function LibraryPreviewCard() {

    return (
        <div className="flex flex-col justify-center items-center bg-white/40 p-2 pb-4 w-full mx-auto md:mx-0
max-w-[700px] lg:max-w-[350px] border-t border-t-[#1A3463]/75 lg:border-t-0 lg:border-l lg:border-l-[#1A3463]/75 rounded-b-xl lg:rounded-l-none lg:rounded-r-xl relative">
            <PlayIcon />
            <h2 className="text-[#1C5E8F] text-lg font-semibold">Biblioteca</h2>
            <div className="flex flex-col items-center bg-transparent pt-0.5 px-4 rounded-xl w-full md:max-w-[350px]">
                <Link href={route('tutorials.show', 1)} className="w-full relative block rounded-xl overflow-hidden">
                    <img
                        src="/images/tutorials/tutorial_1.png"
                        className="w-full h-48 object-cover"
                    />

                    <div className="absolute inset-0 bg-black/55 flex justify-center items-center">
                        <PlayVideoIcon className="w-14 h-14 text-white drop-shadow-2xl" />
                    </div>
                </Link>
            </div>

            <Link href={route("library.index")} className="absolute top-2 right-2 p-1 rounded-full hover:bg-[#1D87BC]/20 transition">
                <PlusIcon className="w-6 h-6 text-[#1D87BC]" />
            </Link>
        </div>
    );
}