import { router, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function ProfileCard({ user }) {
    const { data, setData, put, processing, errors, clearErrors } = useForm({
        name: user.name,
        email: user.email,
        username: user.username,
        address: user.address
    });

    const resetUserFields = () => {
        setData("name", user.name);
        setData("email", user.email);
        setData("username", user.username);
        setData("address", user.address);
    }

    const handleSubmit = () => {
        const changedData = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== user[key])
        );

        if (Object.keys(changedData).length > 0) {
            put(route('settings.profile.update'), {
                data: changedData,
                preserveScroll: true,
                preserveState: true,
            });
        }
    };


    return (
        <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-sm w-full">
            <h2 className="text-[#1C5E8F] text-xl font-semibold mb-4">Perfil</h2>

            <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label htmlFor="name" className="text-[#1A3463]/80 text-md font-medium sm:w-24 shrink-0">
                        Nome:
                    </label>
                    <input
                        className="font-light rounded-full bg-white border-none px-3 py-1 text-sm text-[#000000]/60 w-full focus:outline-none focus:ring-2 focus:ring-[#1C5E8F]/40 transition-all"
                        type="text"
                        id="name"
                        name="name"
                        value={data.name}
                        placeholder="Teu Nome"
                        onChange={(e) => setData("name", e.target.value)}
                    />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label htmlFor="email" className="text-[#1A3463]/80 text-md font-medium sm:w-24 shrink-0">
                        Email:
                    </label>
                    <input
                        className="font-light rounded-full bg-white border-none px-3 py-1 text-sm text-[#000000]/60 w-full focus:outline-none focus:ring-2 focus:ring-[#1C5E8F]/40 transition-all"
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        placeholder="teu.email@exemplo.com"
                        onChange={(e) => setData("email", e.target.value)}
                    />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label htmlFor="username" className="text-[#1A3463]/80 text-md font-medium sm:w-24 shrink-0">
                        Username:
                    </label>
                    <input
                        className="font-light rounded-full bg-white border-none px-3 py-1 text-sm text-[#000000]/60 w-full focus:outline-none focus:ring-2 focus:ring-[#1C5E8F]/40 transition-all"
                        type="text"
                        id="username"
                        name="username"
                        value={data.username}
                        placeholder="@teu_username"
                        onChange={(e) => setData("username", e.target.value)}
                    />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <label htmlFor="address" className="text-[#1A3463]/80 text-md font-medium sm:w-24 shrink-0">
                        Localização:
                    </label>
                    <input
                        className="font-light rounded-full bg-white border-none px-3 py-1 text-sm text-[#000000]/60 w-full focus:outline-none focus:ring-2 focus:ring-[#1C5E8F]/40 transition-all"
                        type="text"
                        id="address"
                        name="address"
                        value={data.address}
                        placeholder="Funchal, Madeira"
                        onChange={(e) => setData("address", e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6">
                <button
                    onClick={handleSubmit}
                    disabled={processing}
                    className="w-full sm:w-auto flex-1 max-w-[200px] bg-linear-to-r from-[#1C5E8F]/50 via-[#1C5E8F]/75 to-[#1C5E8F] text-white px-6 py-2.5 transition-all duration-300 transform hover:scale-105 hover:shadow-lg tracking-wide text-sm font-medium rounded-full cursor-pointer justify-center shadow-md"
                >
                    Guardar alterações
                </button>
                <button
                    onClick={resetUserFields}
                    className="w-full sm:w-auto flex-1 max-w-[200px] md:max-w-[140px] bg-white/60 text-[#3699C5] px-6 py-2.5 transition-all duration-300 transform hover:scale-105 hover:bg-white/80 tracking-wide text-sm font-medium rounded-full cursor-pointer justify-center border border-white/50 shadow-sm"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
}