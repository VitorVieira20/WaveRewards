import Layout from "../Layouts/Layout";
import { useState } from "react";

const teamMembers = [
    {
        name: "Leonor Freitas",
        role: "UX/UI Designer",
        image: "/images/team/leonor2.png",
        hoverImage: "/images/team/leonor2.png",
    },
    {
        name: "Vitor Vieira",
        role: "Web Developer",
        image: "/images/team/vitor2.png",
        hoverImage: "/images/team/vitor2.png",
    },
    {
        name: "Roberto Andrade",
        role: "RP do Gin Garden",
        image: "/images/team/roberto2.png",
        hoverImage: "/images/team/roberto2.png",
    },
    {
        name: "David França",
        role: "Content / Social",
        image: "/images/team/david2.png",
        hoverImage: "/images/team/david2.png",
    },
];

export default function Team({ auth }) {
    const [selectedMember, setSelectedMember] = useState(null);

    return (
        <Layout auth={auth}>
            <h1 className="fixed w-full text-[#1A3463] pb-4 px-6 md:px-16 text-4xl md:text-5xl font-semibold z-50 bg-linear-to-b from-[#EAF5FA] to-[#EAF5FA] md:to-[#DDEFF7] 3xl:to-[#E7F3F9]">
                A Nossa Equipa
            </h1>

            <div className="flex flex-col lg:flex-row gap-12 px-4 md:px-10 py-6">
                <div className="w-full lg:w-1/2 pt-10 lg:pt-36 px-10">
                    <h2 className="justify-start text-[#1C5E8F] text-lg font-medium mb-6">
                        Somos movidos pela determinação e pelo esforço.
                    </h2>
                    <div className=" justify-start">
                        <span className="text-[#1D87BC] text-lg font-normal leading-relaxed mb-4">
                            Cada elemento da nossa plataforma nasce do espírito criativo, da ambição coletiva e da motivação da nossa equipa.<br />
                        </span>
                        <span className="text-[#1D87BC] text-lg font-normal leading-4"><br /></span>
                        <span className="text-[#1D87BC] text-lg font-normal leading-8">
                            Trabalhamos com paixão para construir uma experiência saudável, gamificada, sustentável e educativa que responda verdadeiramente às necessidade não só dos nossos desportistas portugueses, como de todos aqueles que queiram enriquecer mais com este projeto.
                        </span>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col pt-4 md:pt-10 items-stretch gap-6 xl:gap-0">
                    {teamMembers.map((member, index) => {
                        const isEven = index % 2 === 0; // left (start) for even, right (end) for odd
                        return (
                            <div
                                key={index}
                                // alinhamento do card na coluna (left/right)
                                className={`flex w-full md:w-fit ${isEven ? "self-center md:self-start" : "self-center md:self-end"}`}
                            >
                                <div
                                    onClick={() => setSelectedMember(member)}
                                    className={`
                        relative flex items-center gap-4
                        bg-white/45
                        backdrop-blur-sm
                        rounded-full
                        shadow-lg
                        p-3
                        w-full md:w-[50vw] lg:w-[35vw] xl:w-[24vw]
                        transition-transform duration-300 hover:scale-[1.01] cursor-pointer
                    `}
                                >
                                    <div className="order-1 shrink-0">
                                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400 opacity-100 hover:opacity-0"
                                            />
                                            <img
                                                src={member.hoverImage}
                                                alt={member.name + " hover"}
                                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400 opacity-0 hover:opacity-100"
                                            />
                                        </div>
                                    </div>

                                    <div className={`flex flex-col w-full justify-center items-center order-1`}>
                                        <h3 className="text-[#1C5E8F] md:text-xl font-semibold">{member.name}</h3>
                                        <p className="text-[#1D87BC]">{member.role}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}
