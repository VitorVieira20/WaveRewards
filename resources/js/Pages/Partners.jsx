import { motion } from "framer-motion";
import Layout from "../Layouts/Layout";

export default function Partners({ auth }) {
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: (i = 0) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
        }),
    };

    return (
        <Layout auth={auth}>
            <h1 className="fixed w-full text-[#1A3463] pb-4 px-6 md:px-16 text-4xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#DDEFF7] 3xl:to-[#E7F3F9]">
                Parcerias
            </h1>

            <div className="flex flex-col px-6 md:px-16 py-8 gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
                    <motion.div
                        key={1}
                        className="flex flex-col bg-white/40 rounded-3xl p-6 shadow-sm text-center"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        custom={1}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <h2 className="text-[#1C5E8F] text-xl font-semibold mb-4 text-left">Educativas e Científicas</h2>

                        <div className="flex flex-col justify-center items-center w-full gap-2">
                            <a className="cursor-pointer" href="https://www.uma.pt/" target="_blank">
                                <img
                                    className="w-[280px] h-[100px]"
                                    src="/images/partners/UMa.png"
                                    alt="Universidade da Madeira"
                                />
                            </a>

                            <p className="text-[#1A3463]/80 font-medium">Departamento de Educação <br />Física e Desporto (DEFD)</p>
                            <p className="text-[#1A3463]/80 font-medium">Centro de Investigação em <br />Educação e Inovação</p>
                        </div>
                    </motion.div>

                    <motion.div
                        key={2}
                        className="flex flex-col bg-white/40 rounded-3xl p-6 shadow-sm text-center"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        custom={2}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <h2 className="text-[#1C5E8F] text-xl font-semibold mb-4 text-left">Entidades Públicas e < br />Governamentais</h2>

                        <div className="flex flex-col justify-center items-center w-full gap-2">
                            <div className="flex flex-row gap-2">
                                <a className="cursor-pointer" href="https://www.madeira.gov.pt/drd" target="_blank">
                                    <img
                                        className="w-[120px] h-[120px]"
                                        src="/images/partners/DRD.png"
                                        alt="Direção Regional do Desporto"
                                    />
                                </a>
                                <a className="cursor-pointer" href="https://apram.pt/" target="_blank">
                                    <img
                                        className="w-[200px] h-[115px]"
                                        src="/images/partners/PortosMadeira.png"
                                        alt="APRAM - Portos da Madeira"
                                    />
                                </a>
                            </div>
                            <a className="cursor-pointer" href="https://www.madeira.gov.pt/dram/" target="_blank">
                                <img
                                    className="w-[390px] h-[65px]"
                                    src="/images/partners/SRA.png"
                                    alt="Secretaria Regional de Ambiente, Recursos Naturais e Alterações Climáticas"
                                />
                            </a>

                        </div>
                    </motion.div>

                    <motion.div
                        key={3}
                        className="flex flex-col bg-white/40 rounded-3xl p-6 shadow-sm text-center"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        custom={3}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <h2 className="text-[#1C5E8F] text-xl font-semibold mb-4 text-left">Associações e Federações < br />Náuticas</h2>

                        <div className="flex flex-row justify-center items-center w-full gap-2">
                            <a className="cursor-pointer" href="https://www.fpcanoagem.pt/" target="_blank">
                                <img
                                    className="w-[200px] h-[160px]"
                                    src="/images/partners/FPC.png"
                                    alt="Federação Portuguesa de Canoagem"
                                />
                            </a>

                            <a className="cursor-pointer" href="https://www.canoagemmadeira.com/" target="_blank">
                                <img
                                    className="w-[160px] h-[155px]"
                                    src="/images/partners/ARCM.png"
                                    alt="Associação Regional de Canoagem da Madeira"
                                />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        key={4}
                        className="flex flex-col bg-white/40 rounded-3xl p-6 shadow-sm text-center"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        custom={4}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <h2 className="text-[#1C5E8F] text-xl font-semibold mb-4 text-left">Organizações e Projetos < br />Ambientais</h2>

                        <div className="flex flex-col justify-center items-center w-full">
                            <a className="cursor-pointer self-end" href="https://aigmadeira.pt/" target="_blank">
                                <img
                                    className="w-[180px] h-[110px]"
                                    src="/images/partners/AIG.png"
                                    alt="Associação Insular de Geografia"
                                />
                            </a>

                            <a className="cursor-pointer self-start" href="https://www.facebook.com/prazeresdaquinta/" target="_blank">
                                <img
                                    className="w-[250px] h-[100px]"
                                    src="/images/partners/QuintaPrazeres.png"
                                    alt="Quinta Pedagógica dos Prazeres"
                                />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        key={5}
                        className="flex flex-col bg-white/40 rounded-3xl p-6 shadow-sm text-center"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        custom={5}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <h2 className="text-[#1C5E8F] text-xl font-semibold mb-4 text-left">Turismo, Inovação e < br />Comunicação</h2>

                        <div className="flex flex-col justify-center items-center w-full gap-2">
                            <div className="flex flex-row gap-2 md:gap-4 lg:gap-8">
                                <a className="cursor-pointer" href="https://visitmadeira.com/pt" target="_blank">
                                    <img
                                        className="w-[120px] h-[120px]"
                                        src="/images/partners/MadeiraIslands.png"
                                        alt="Madeira Islands"
                                    />
                                </a>

                                <a className="cursor-pointer" href="https://startupmadeira.eu/" target="_blank">
                                    <img
                                        className="w-[190px] h-[120px]"
                                        src="/images/partners/StartUpMadeira.png"
                                        alt="Start Up Madeira"
                                    />
                                </a>
                            </div>

                            <a className="cursor-pointer" href="https://www.madeira.gov.pt/srtac" target="_blank">
                                <img
                                    className="w-[380px] h-[80px]"
                                    src="/images/partners/SRTC.png"
                                    alt="Secretaria Regional do Turismo e Cultura"
                                />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
