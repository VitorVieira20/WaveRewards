import { Link } from "@inertiajs/react";
import PlayVideoIcon from "../Icons/PlayVideoIcon";
import { route } from "ziggy-js";

export default function TutorialsSections({ tutorials, showHeader = true }) {

    return (
        <div className="flex flex-col gap-4">
            {showHeader &&
                <Link href={route("tutorials.index")} className="flex justify-center items-center text-[#1C5E8F] text-2xl font-semibold bg-[#FFFFFF]/40 shadow-xl p-6 rounded-xl w-full max-w-[320px]">
                    Vídeos/Tutoriais
                </Link>
            }

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {tutorials.map((tutorial) => (
                    <div
                        key={tutorial.id}
                        className="flex flex-col items-center bg-[#FFFFFF]/40 shadow-xl p-4 rounded-xl w-full md:max-w-[320px]"
                    >
                        <Link href={route("tutorials.show", tutorial.id)} className="w-full relative block rounded-xl overflow-hidden">

                            <img
                                src={tutorial.thumbnail}
                                className="w-full h-48 object-cover"
                            />

                            <div className="absolute inset-0 bg-black/55 flex justify-center items-center">
                                <PlayVideoIcon className="w-14 h-14 text-white drop-shadow-2xl" />
                            </div>

                        </Link>

                        <h3 className="text-center text-[#1D87BC] font-semibold mt-2">
                            {tutorial.title}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
}