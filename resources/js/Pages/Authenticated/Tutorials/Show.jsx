import { Link } from "@inertiajs/react";
import AuthenticatedLayout from "../../../Layouts/AuthenticatedLayout";
import LeftArrowIcon from "../../../Components/Icons/LeftArrowIcon";

export default function TutorialShow({ auth, tutorial }) {

    const getEmbedUrl = (url) => {
        if (!url) return "";
        if (url.includes("/embed/")) return url;

        try {
            const urlObj = new URL(url);
            const videoId = urlObj.searchParams.get("v");
            return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
        } catch (e) {
            return url;
        }
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <h1 className="fixed w-full text-[#1A3463] pb-4 px-6 md:px-16 text-3xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#DDEFF7] 3xl:to-[#E7F3F9] flex items-center gap-4">

                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex items-center md:mt-3 lg:mt-0 cursor-pointer"
                >
                    <LeftArrowIcon color="#1C5E8F" />
                </button>

                <span>
                    <span className="hidden lg:inline">Vídeo -{" "}</span>
                    <span className="inline font-light text-[24px] md:text-[30px] lg:text-[45px]" style={{ textShadow: "0px 2px 4px rgba(0,0,0,0.35)" }}>
                        {tutorial.title}
                    </span>
                </span>

            </h1>

            <div className="flex flex-col items-center justify-start w-full min-h-screen pt-18 px-4 md:px-16 pb-10">
                <div className="w-full max-w-4xl bg-[#FFFFFF]/40 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-lg border border-white/40">

                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/10 shadow-inner">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src={getEmbedUrl(tutorial.url)}
                            title={tutorial.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>

                    <div className="flex justify-end mt-4">
                        <a
                            href={tutorial.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#1C5E8F] hover:text-[#1A3463] hover:underline transition flex items-center gap-1"
                        >
                            Ver no YouTube ↗
                        </a>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}