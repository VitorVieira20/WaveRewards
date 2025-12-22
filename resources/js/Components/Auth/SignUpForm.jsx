import { useForm } from "@inertiajs/react";
import FacebookIcon from "../Icons/FacebookIcon";
import GoogleIcon from "../Icons/GoogleIcon";
import LinkedinIcon from "../Icons/LinkedinIcon";
import RightArrowIcon from "../Icons/RightArrowIcon";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

export default function SignUpForm({ isLogin, setIsLogin }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });


    const handleSignUp = (e) => {
        e.preventDefault();
        post(route('signup.store'), {
            onSuccess: () => {
                reset();
                clearErrors();
                setIsLogin(true);
            }
        });
    };

    return (
        <div
            className={`absolute top-0 right-0 w-full md:w-[57.15%] h-full flex flex-col items-center justify-center p-5 transition-all duration-700 ease-in-out bg-white/10 md:bg-transparent
        ${isLogin ? "translate-x-full opacity-0 z-0" : "translate-x-0 opacity-100 z-10"}`}
        >
            <div className="flex flex-col md:flex-row w-full h-full items-center md:items-stretch justify-between overflow-hidden gap-4 md:gap-0">

                <div className="flex flex-col justify-center md:justify-between items-center md:items-start w-full h-full px-4">
                    <h2 className="text-blue-950 text-4xl font-bold leading-[66px] [text-shadow:0px_4px_4px_rgb(0_0_0/0.25)]">
                        Regista-te
                    </h2>

                    <form id="signup-form" onSubmit={handleSignUp} className="flex flex-col w-full max-w-xs md:max-w-80 gap-5 flex-grow overflow-y-auto pt-4 md:pt-8 pb-2 scroll-container">
                        <div className="relative w-full">
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="w-full bg-transparent border-b border-b-[#1C679A]/60 text-blue-950 text-lg transition-all duration-300 focus:outline-none placeholder-blue-950/50"
                                placeholder="Nome"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1 ml-1">{errors.name}</p>}
                        </div>

                        <div className="relative w-full">
                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="w-full bg-transparent border-b border-b-[#1C679A]/60 text-blue-950 text-lg transition-all duration-300 focus:outline-none placeholder-blue-950/50"
                                placeholder="Email"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>}
                        </div>

                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                className="w-full bg-transparent border-b border-b-[#1C679A]/60 text-blue-950 text-lg transition-all duration-300 focus:outline-none placeholder-blue-950/50"
                                placeholder="Password"
                                required
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-blue-950/70"
                            >
                                {showPassword ? <EyeClosed /> : <Eye />}
                            </span>
                            {errors.password && <p className="text-red-500 text-sm mt-1 ml-1">{errors.password}</p>}
                        </div>

                        <div className="relative w-full">
                            <input
                                type={showPasswordConfirm ? "text" : "password"}
                                name="password_confirmation"
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                className="w-full bg-transparent border-b border-b-[#1C679A]/60 text-blue-950 text-lg transition-all duration-300 focus:outline-none placeholder-blue-950/50"
                                placeholder="Confirmar Password"
                                required
                            />
                            <span
                                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-blue-950/70"
                            >
                                {showPasswordConfirm ? <EyeClosed /> : <Eye />}
                            </span>
                            {errors.password_confirmation && (
                                <p className="text-red-500 text-sm mt-1 ml-1">{errors.password_confirmation}</p>
                            )}
                        </div>
                    </form>

                    <button
                        type="submit"
                        form="signup-form"
                        className={`flex flex-row items-center justify-between w-full max-w-xs md:max-w-80 h-12 bg-gradient-to-r from-sky-800/50 via-sky-800/75 to-sky-800 rounded-[36.55px] backdrop-blur-blur transition-all px-6 font-medium cursor-pointer mt-4 ${processing ? "opacity-50 cursor-not-allowed" : "hover:bg-sky-800/90"
                            }`}
                        disabled={processing}
                    >
                        <div className="w-full flex items-center justify-center text-white">
                            {processing ? (
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                </svg>
                            ) : (
                                "Criar conta"
                            )}
                        </div>
                        {!processing && <RightArrowIcon />}
                    </button>

                    <div className="md:hidden mt-6 text-blue-950">
                        Já tens conta? <span onClick={() => setIsLogin(true)} className="font-bold underline cursor-pointer">Faz Login</span>
                    </div>
                </div>

                <div className="flex flex-row md:flex-col items-center justify-center w-full md:w-auto px-5 gap-4 md:gap-0">
                    <div className="h-px w-full md:w-px md:h-full bg-blue-950/75"></div>
                    <div className="text-blue-950 text-lg font-normal font-['Poppins'] leading-loose my-2 shrink-0">
                        OR
                    </div>
                    <div className="h-px w-full md:w-px md:h-full bg-blue-950/75"></div>
                </div>

                <div className="flex flex-row md:flex-col items-center justify-center gap-8 md:gap-5 h-auto md:h-full pb-4 md:pb-0">
                    <div className="scale-110 cursor-pointer hover:opacity-80 transition-opacity">
                        <a href="/auth/google">
                            <GoogleIcon />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}