import { motion } from "framer-motion";
import WavesIcon from "../Components/Icons/WavesIcon";
import GlobeIcon from "../Components/Icons/GlobeIcon";
import Layout from "../Layouts/Layout";
import LeafIcon from "../Components/Icons/LeafIcon";
import TrophyIcon from "../Components/Icons/TrophyIcon";
import OarsIcon from "../Components/Icons/OarsIcon";

export default function AboutUs({ auth }) {
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <Layout auth={auth}>
            <h1 className="fixed w-full text-[#1A3463] pb-4 px-6 md:px-16 text-4xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#EAF5FA] md:to-[#DDEFF7] xl:to-[#E7F3F9]">
                Sobre nós
            </h1>
            <div className="flex flex-col px-6 md:px-16 py-6 gap-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 pt-16 px-6">
                    <div className="flex flex-col justify-between h-full">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <WavesIcon />
                                <h2 className="text-[#1C5E8F] text-2xl md:text-3xl font-semibold">Missão</h2>
                            </div>
                            <p className="text-[#1C5E8F] text-base md:text-lg font-normal mb-6 ml-10">
                                Promover um estilo de vida ativo, saudável e sustentável através da prática
                                de canoagem, envolvendo o utilizador através de uma experiência interativa e tecnológica.
                            </p>
                        </div>

                        <div className="flex justify-center lg:justify-end px-6">
                            <img
                                src="/images/about1.png"
                                alt="Missão - Canoagem"
                                className="w-full md:w-120 max-w-md rounded-xl object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-between h-full">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <GlobeIcon />
                                <h2 className="text-[#1C5E8F] text-2xl md:text-3xl font-semibold">Visão</h2>
                            </div>
                            <p className="text-[#1C5E8F] text-base md:text-lg font-normal mb-6 ml-10">
                                Tornar-nos a principal plataforma digital de promoção das atividades náuticas em Portugal,
                                criando uma comunidade ativa e consciente que valoriza o mar, transformando cada remada numa conquista.
                            </p>
                        </div>

                        <div className="flex justify-center lg:justify-start px-6">
                            <img
                                src="/images/about2.png"
                                alt="Visão - Limpeza do mar"
                                className="w-full md:w-120 max-w-md rounded-xl object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
                    {[{
                        title: "Promoção da canoagem",
                        text: "A canoagem é uma atividade náutica acessível, saudável e de baixo impacto ambiental que oferece benefícios físicos e mentais comprovados.",
                        Icon: OarsIcon
                    }, {
                        title: "Sustentabilidade",
                        text: "Cultivamos a sustentabilidade através de desafios ecológicos, incentivamos práticas responsáveis, mantendo a consciencialização sobre a importância da conservação marinha.",
                        Icon: LeafIcon
                    }, {
                        title: "Gamificação",
                        text: "Transformamos a prática de canoagem numa experiência digital e motivadora através de gamificação. O sistema de equipas promove o espírito comunitário e a competição saudável.",
                        Icon: TrophyIcon
                    }].map(({ title, text, Icon }, i) => (
                        <motion.div
                            key={i}
                            className="flex flex-col justify-between bg-white/40 rounded-3xl p-6 min-h-[300px] shadow-sm"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                        >
                            <div>
                                <h2 className="text-[#1C5E8F] text-2xl font-semibold">{title}</h2>
                                <p className="text-[#1C5E8F] text-base md:text-lg font-normal mt-2.5">{text}</p>
                            </div>
                            <div className="flex justify-center mt-6">
                                <Icon className="w-14 h-14 text-[#1C5E8F]" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
