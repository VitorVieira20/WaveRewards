import LeftArrowIcon from "../Icons/LeftArrowIcon";
import RightArrowIcon from "../Icons/RightArrowIcon";

export default function FormOverlay({ isLogin, setIsLogin }) {

    return (
        <div
            className={`hidden md:block absolute top-0 left-[57.15%] w-[42.85%] h-full bg-[url('/images/kayak-over-water.png')] bg-cover bg-center transition-all duration-700 ease-in-out
    ${isLogin ? "translate-x-0" : "translate-x-[-132.85%]"}`}
        >
            <button
                onClick={() => setIsLogin(!isLogin)}
                className={`w-2/5 h-14 absolute top-0 bg-teal-800 backdrop-blur-blur transition-all duration-700 ease-in-out
            ${isLogin ? "translate-x-0 left-0" : "translate-x-[150%] left-0"} cursor-pointer`}
            >
                {isLogin ? (
                    <div className="flex flex-row items-center justify-between px-3">
                        <LeftArrowIcon />
                        <div className="mx-2">Criar conta</div>
                    </div>
                ) : (

                    <div className="flex flex-row items-center justify-between px-3">
                        <div className="mx-2">Login</div>
                        <RightArrowIcon />
                    </div>
                )}
            </button>
        </div>
    );
}