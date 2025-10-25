import { motion } from "framer-motion";
import Layout from "../Layouts/Layout";
import HeartRateIcon from "../Components/Icons/HeartRateIcon";
import PlantIcon from "../Components/Icons/PlantIcon";
import TrophyStarIcon from "../Components/Icons/TrophyStarIcon";
import ComunityIcon from "../Components/Icons/ComunityIcon";
import StocksIcon from "../Components/Icons/StocksIcon";

export default function Benefits({ auth }) {
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: (i = 0) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
        }),
    };

    const benefits = [
        {
            title: "Saúde e Bem-Estar",
            text: "Acompanha distância, tempo e calorias queimadas. Fortalece músculos, melhora a resistência e promove o bem-estar.",
            Icon: HeartRateIcon,
        },
        {
            title: "Impacto Ambiental",
            text: "Recolhe lixo flutuante, adotando várias práticas sustentáveis. Cada remada contribui para um oceano mais limpo.",
            Icon: PlantIcon,
        },
        {
            title: "Gamificação e Recompensas",
            text: "Ganha pontos, desbloqueia medalhas e progride de nível. Celebra as conquistas e motiva-te com recompensas personalizadas.",
            Icon: TrophyStarIcon,
        },
        {
            title: "Comunidade e Equipas",
            text: "Cria ou adere a equipas, participa em desafios coletivos e compete nos rankings. Fortalece laços e motiva-te através do apoio mútuo.",
            Icon: ComunityIcon,
        },
        {
            title: "Acompanhamento de Progresso",
            text: "Acede a gráficos interativos que mostram a tua evolução física e ambiental. Define novos objetivos com base em dados concretos.",
            Icon: StocksIcon,
        },
        {
            title: "Educação e Recursos",
            text: "Explora vídeos, tutoriais, guias de segurança e conteúdos sobre conservação marinha. Aprende e torna-te um embaixador do oceano.",
            Icon: ComunityIcon,
        },
    ];

    return (
        <Layout auth={auth}>
            <h1 className="fixed w-full text-[#1A3463] pb-4 px-6 md:px-16 text-4xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#EAF5FA] md:to-[#DDEFF7] 3xl:to-[#E7F3F9]">
                Benefícios
            </h1>

            <div className="flex flex-col px-6 md:px-16 py-8 gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
                    {benefits.map(({ title, text, Icon }, i) => (
                        <motion.div
                            key={i}
                            className="flex flex-col items-center bg-white/40 rounded-3xl p-6 shadow-sm text-center"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            custom={i}
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {/* Ícone no topo */}
                            <div className="flex justify-center mb-4">
                                <Icon className="w-14 h-14 text-[#1C5E8F]" />
                            </div>

                            {/* Título e texto */}
                            <div>
                                <h2 className="text-[#1C5E8F] text-xl font-semibold mb-2">{title}</h2>
                                <p className="text-[#1C5E8F] text-base md:text-md font-normal">{text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
