import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import RightArrowIcon from '../Icons/RightArrowIcon';

export default function UpdatePasswordModal({ show, onClose }) {
    const { data, setData, put, processing, errors, reset, clearErrors } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    console.log(errors)

    useEffect(() => {
        if (!show) {
            reset();
            clearErrors();
        }
    }, [show]);

    const submit = (e) => {
        e.preventDefault();
        put(route('profile.password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-200 flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-black/40 transition-opacity"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-md bg-[#1D87BC]/50 backdrop-blur-md rounded-3xl shadow-2xl p-8 transform transition-all scale-100">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#1C5E8F] hover:text-[#1A3463] transition-colors cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-[#1A3463] text-xl md:text-2xl font-semibold mb-2 text-center">
                    Alterar Password
                </h2>
                <p className="text-[#1C5E8F] text-sm text-center mb-8">
                    Atualiza a tua palavra-passe de segurança
                </p>

                <form onSubmit={submit} className="flex flex-col gap-5">

                    <div className="relative w-full">
                        <input
                            type="password"
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            className="w-full bg-transparent border-b border-b-[#1C679A]/60 text-[#1A3463] text-lg py-1 px-2 transition-all duration-300 focus:outline-none placeholder-[#1A3463]/40 focus:border-[#1A3463]"
                            placeholder="Password Atual"
                        />
                        {errors.current_password && <p className="text-red-500 text-xs mt-1 font-medium ml-2">{errors.current_password}</p>}
                    </div>

                    <div className="relative w-full">
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full bg-transparent border-b border-b-[#1C679A]/60 text-[#1A3463] text-lg py-1 px-2 transition-all duration-300 focus:outline-none placeholder-[#1A3463]/40 focus:border-[#1A3463]"
                            placeholder="Nova Password"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1 font-medium ml-2">{errors.password}</p>}
                    </div>

                    <div className="relative w-full">
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full bg-transparent border-b border-b-[#1C679A]/60 text-[#1A3463] text-lg py-1 px-2 transition-all duration-300 focus:outline-none placeholder-[#1A3463]/40 focus:border-[#1A3463]"
                            placeholder="Confirmar Nova Password"
                        />
                        {errors.password_confirmation && <p className="text-red-500 text-xs mt-1 font-medium ml-2">As passwords não coincidem</p>}
                    </div>

                    <button
                        type="submit"
                        className={`flex flex-row items-center justify-between w-full h-12 bg-gradient-to-r from-sky-800/80 to-sky-900 rounded-full text-white px-6 font-medium cursor-pointer mt-4 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ${processing ? "opacity-70 cursor-not-allowed" : ""}`}
                        disabled={processing}
                    >
                        <div className="w-full flex items-center justify-center font-bold tracking-wide">
                            {processing ? "A Guardar..." : "Guardar Alterações"}
                        </div>
                        {!processing && <RightArrowIcon className="w-5 h-5 text-white" />}
                    </button>
                </form>
            </div>
        </div>
    );
}