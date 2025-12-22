import { router, useForm } from "@inertiajs/react";
import { useRef } from "react";
import LocationPinIcon from "../Icons/LocationPinIcon";

export default function UserCard({ user, onOpenPasswordModal }) {
    const fileInputRef = useRef();

    const {processing } = useForm({
        _method: 'PATCH',
        avatar: null,
    });

    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            router.post(route("profile.update"), {
                _method: 'PATCH',
                avatar: file,
            }, {
                forceFormData: true,
                preserveScroll: true,
            });
        }
    };

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route("logout"), {
            _method: 'POST',
        }, {
            onSuccess: () => sessionStorage.removeItem("chatbotMessages"),
        });
    };

    return (
        <div className="flex flex-col justify-between gap-1 bg-white/40 w-full lg:w-2/5 rounded-2xl p-4 h-full shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start pt-2">

                <div className="relative px-4 group cursor-pointer" onClick={handleAvatarClick}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />

                    <img
                        src={user.avatar}
                        referrerPolicy="no-referrer"
                        className="border-4 border-[#60B4D9] w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-md transition-all group-hover:brightness-90"
                        alt="Avatar do utilizador"
                    />

                    <div className="absolute bottom-0 right-4 bg-[#3699C5] p-1.5 rounded-full border-2 border-white shadow-lg text-white transition-transform group-hover:scale-110">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                        </svg>
                    </div>
                </div>

                <div className="flex flex-col gap-1 text-sm font-medium text-[#1C5E8F] pl-4 md:pl-2 mt-2 md:mt-0 text-center md:text-left leading-tight">
                    <p>Nome: <span className="font-normal">{user.name}</span></p>
                    <p>Username: <span className="font-normal">{user.username}</span></p>
                    <div className="flex flex-row items-center justify-center md:justify-start gap-1">
                        <LocationPinIcon color="#3699C5" className="w-4 h-4" />
                        <span className="font-normal">{user.address}</span>
                    </div>
                    <p>Membro desde: <span className="font-normal">{user.created_at}</span></p>
                    <p>Nível: <span className="font-normal">Avançado</span></p>
                </div>
            </div>

            <div className="border border-[#1C679A]/50 mx-6 my-1"></div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-3 mb-1">
                <button onClick={handleLogout} disabled={processing}
                    className="flex bg-linear-to-r from-[#1C5E8F]/50 via-[#1C5E8F]/75 to-[#1C5E8F] text-white px-5 py-2 transition-all duration-300 transform hover:scale-105 tracking-wide text-xs sm:text-sm font-medium rounded-full cursor-pointer whitespace-nowrap">
                    Terminar sessão
                </button>
                <button onClick={onOpenPasswordModal} className="flex bg-white/40 text-[#3699C5] px-5 py-2 transition-all duration-300 transform hover:scale-105 tracking-wide text-xs sm:text-sm font-medium rounded-full cursor-pointer whitespace-nowrap">
                    Mudar password
                </button>
            </div>
        </div>
    );
}