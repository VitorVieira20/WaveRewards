import EnvelopIcon from "../Icons/EnvelopIcon";
import LocationIcon from "../Icons/LocationIcon";
import PhoneIcon from "../Icons/PhoneIcon";
import RightArrowIcon from "../Icons/RightArrowIcon";

export default function ContactsPage({ handleSubmit, data, setData, errors, processing }) {

    return (
        <div className="flex flex-col xl:flex-row justify-center items-center gap-16 px-6 pt-4 min-h-[50vh]">

            <form
                onSubmit={handleSubmit}
                className="w-full xl:w-2/4 bg-[#1D87BC]/40 backdrop-blur-md rounded-3xl p-6 shadow-lg"
            >
                <div className="text-[#1A3463] text-2xl font-semibold mb-6">
                    Como te podemos ajudar?
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col">
                        <label className="text-[#1A3463] text-sm mb-1">Nome</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="John Carter"
                            className={`w-full px-4 py-2.5 rounded-full bg-white text-[#1A3463] placeholder-gray-400 outline-none shadow-sm focus:ring-2 ${errors.name ? "ring-2 ring-red-500" : "focus:ring-[#1D87BC]"
                                }`}
                        />
                        {errors.name && (
                            <span className="text-red-500 text-xs mt-1">{errors.name}</span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[#1A3463] text-sm mb-1">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            placeholder="exemplo@email.com"
                            className={`w-full px-4 py-2.5 rounded-full bg-white text-[#1A3463] placeholder-gray-400 outline-none shadow-sm focus:ring-2 ${errors.email ? "ring-2 ring-red-500" : "focus:ring-[#1D87BC]"
                                }`}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs mt-1">{errors.email}</span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[#1A3463] text-sm mb-1">Telemóvel</label>
                        <input
                            type="text"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                            placeholder="(351) 912 345 678"
                            className={`w-full px-4 py-2.5 rounded-full bg-white text-[#1A3463] placeholder-gray-400 outline-none shadow-sm focus:ring-2 ${errors.phone ? "ring-2 ring-red-500" : "focus:ring-[#1D87BC]"
                                }`}
                        />
                        {errors.phone && (
                            <span className="text-red-500 text-xs mt-1">{errors.phone}</span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label className="text-[#1A3463] text-sm mb-1">Empresa</label>
                        <input
                            type="text"
                            value={data.company}
                            onChange={(e) => setData("company", e.target.value)}
                            placeholder="exemplo"
                            className={`w-full px-4 py-2.5 rounded-full bg-white text-[#1A3463] placeholder-gray-400 outline-none shadow-sm focus:ring-2 ${errors.company ? "ring-2 ring-red-500" : "focus:ring-[#1D87BC]"
                                }`}
                        />
                        {errors.company && (
                            <span className="text-red-500 text-xs mt-1">{errors.company}</span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col mb-4">
                    <label className="text-[#1A3463] text-sm mb-1">Mensagem</label>
                    <textarea
                        value={data.message}
                        onChange={(e) => setData("message", e.target.value)}
                        placeholder="Escreve a tua mensagem..."
                        rows={4}
                        className={`w-full px-4 py-2.5 rounded-3xl bg-white text-[#1A3463] placeholder-gray-400 resize-none outline-none shadow-sm focus:ring-2 ${errors.message ? "ring-2 ring-red-500" : "focus:ring-[#1D87BC]"
                            }`}
                    />
                    {errors.message && (
                        <span className="text-red-500 text-xs mt-1">{errors.message}</span>
                    )}
                </div>


                <button
                    type="submit"
                    disabled={processing}
                    className={`flex flex-row items-center justify-between w-full md:w-56 h-12 bg-gradient-to-r from-[#1C5E8F]/50 via-[#1C5E8F]/75 to-[#1C5E8F] rounded-full backdrop-blur-md transition-all px-6 font-medium cursor-pointer mt-4 text-white shadow-md ${processing ? "opacity-50 cursor-not-allowed" : "hover:bg-[#1C5E8F]/90"
                        }`}
                >
                    <div className="w-full flex items-center justify-center">
                        {processing ? (
                            <svg
                                className="animate-spin h-5 w-5 mr-2 text-white"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                />
                            </svg>
                        ) : (
                            "Enviar mensagem"
                        )}
                    </div>
                    {!processing && <RightArrowIcon />}
                </button>

            </form>

            <div className="flex flex-col justify-start w-full xl:w-1/3 min-h-[30vh] bg-[#FFFFFF]/50 rounded-3xl shadow-md p-6">
                <div className="justify-start text-[#1A3463] text-2xl font-semibold">Contacta-nos</div>
                <div className="justify-start text-[#1B5D8F] text-md font-normal mt-2">Estamos disponíveis para esclarecer qualquer uma das tuas dúvidas!</div>
                {/* <div className="flex flex-row items-center gap-4 mt-6">
                    <EnvelopIcon />
                    <div className="text-center justify-start text-[#1B5D8F]/80 text-lg font-normal">contacto@waverewards.com</div>
                </div> */}
                <div className="flex flex-row items-center gap-4 mt-4">
                    <PhoneIcon />
                    <div className="text-center justify-start text-[#1B5D8F]/80 text-lg font-normal">(+351) 291 705 000</div>
                </div>
                <div className="flex flex-row items-center gap-4 mt-2">
                    <LocationIcon />
                    <div className="text-start justify-start text-[#1B5D8F]/80 text-lg font-normal">Campus Universitário da Penteada<br />9020-105 Funchal - Portugal</div>
                </div>
            </div>
        </div>
    );
}