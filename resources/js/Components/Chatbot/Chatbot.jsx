import { useEffect, useState, useRef } from "react";
import InitialQuestionCard from "./InitialQuestionCard";
import XIcon from "../Icons/XIcon";
import MessageInput from "./MessageInput";
import BotMessageCard from "./BotMessageCard";
import UserMessageCard from "./UserMessageCard";
import UserIcon from "../Icons/UserIcon";

const knowledgeBase = [
    {
        id: 'intro',
        keywords: ['ola', 'oi', 'boas', 'bom dia', 'boa tarde', 'boa noite', 'comecar', 'inicio'],
        answer: "Olá! Sou o assistente virtual da WaveRewards. Estou aqui para te ajudar com dúvidas sobre canoagem, a nossa app, o sistema de pontos ou sustentabilidade. Em que posso ser útil hoje? 🌊"
    },
    {
        id: 'waverewards_info',
        keywords: ['que e o waverewards', 'sobre a app', 'o que faz a app', 'objetivo'],
        answer: "O WaveRewards é uma plataforma gamificada desenhada para promover a canoagem na Madeira e a sustentabilidade. Podes registar as tuas atividades, ganhar pontos, subir no ranking e aprender sobre proteção ambiental."
    },
    {
        id: 'points_system',
        keywords: ['pontos', 'ganhar pontos', 'sistema de pontos', 'como pontuar', 'recompensas'],
        answer: "Ganhas pontos de várias formas: registando quilómetros percorridos 🚣, recolhendo lixo marinho durante a atividade ♻️, e participando em workshops educativos. Estes pontos ajudam-te a subir no ranking da tua equipa!"
    },
    {
        id: 'garbage',
        keywords: ['lixo', 'recolha', 'impacto', 'ambiental', 'sustentabilidade', 'poluicao'],
        answer: "A sustentabilidade é o nosso foco! Incentivamos a prática de 'Plogging' náutico. Se encontrares lixo no mar, recolhe-o e regista na app. Ganhas pontos extra e ajudas a manter os oceanos da Madeira limpos. 🌍"
    },
    {
        id: 'levels',
        keywords: ['niveis', 'nivel', 'iniciante', 'intermedio', 'avancado', 'experiencia'],
        answer: "Temos atividades para todos os níveis! Desde 'Iniciante' (águas calmas, técnica básica) até 'Avançado' (mar aberto, competição). Podes ver o teu nível atual na página de Perfil."
    },
    {
        id: 'team',
        keywords: ['equipa', 'team', 'ranking', 'kayakhomies', 'grupo'],
        answer: "Podes juntar-te a uma equipa (como os KayakHomies!) e competir no ranking global. O ranking baseia-se na soma dos pontos de todos os membros. Vai à secção 'Equipa' para veres os teus colegas."
    },
    {
        id: 'locations',
        keywords: ['onde', 'localizacao', 'funchal', 'caniço', 'ribeira', 'mapa', 'sitios'],
        answer: "As atividades principais ocorrem no Clube Naval do Funchal, Caniço e Ribeira Brava. Verifica a secção 'Atividades' para veres os pontos de encontro e rotas disponíveis."
    },
    {
        id: 'workshops',
        keywords: ['workshop', 'curso', 'aprender', 'aula', 'tecnica'],
        answer: "Oferecemos workshops teóricos e práticos! Podes inscrever-te em 'Técnicas de Remada', 'Segurança Aquática' ou 'Ecossistemas Marinhos'. Consulta a aba 'Benefícios' ou 'Início' para as próximas datas."
    },
    {
        id: 'register_login',
        keywords: ['registo', 'login', 'entrar', 'criar conta', 'senha', 'password'],
        answer: "Para acederes a todas as funcionalidades, precisas de criar conta ou fazer login. Se te esqueceres da password, podes recuperá-la facilmente na página de entrada."
    },
    {
        id: 'default',
        keywords: [],
        answer: "Desculpa, não percebi muito bem a tua questão. 🤔 Tenta perguntar sobre 'pontos', 'equipas', 'workshops' ou 'sustentabilidade'. Também podes contactar o suporte humano na página de Contactos."
    }
];

const normalizeText = (text) => {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[?!.,;:]/g, "");
};

const getBotResponse = (input) => {
    const cleanInput = normalizeText(input);

    const match = knowledgeBase.find(item =>
        item.id !== 'default' && item.keywords.some(keyword => cleanInput.includes(keyword))
    );

    return match ? match.answer : knowledgeBase.find(i => i.id === 'default').answer;
};


export default function Chatbot({ onClose }) {
    const [dateTime, setDateTime] = useState("");

    const initialQuestions = [
        "O que é o WaveRewards?",
        "Como ganho pontos?",
        "Tenho de ter experiência?",
        "Como ajudam o ambiente?"
    ];

    const title = "Procura algo ou explora algumas das perguntas mais frequentes";

    function getSessionMessages() {
        const stored = sessionStorage.getItem("chatbotMessages");
        return stored ? JSON.parse(stored) : [];
    }

    const [messages, setMessages] = useState(getSessionMessages());
    const [botIsTyping, setBotIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        sessionStorage.setItem("chatbotMessages", JSON.stringify(messages));
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const pad = (n) => n.toString().padStart(2, '0');
            const time = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
            const date = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
            setDateTime(`${time} - ${date}`);
        };
        updateDateTime();
        const interval = setInterval(updateDateTime, 30000);
        return () => clearInterval(interval);
    }, []);

    const showIntro = messages.length === 0;

    function sendMessage(text) {
        if (!text) return;

        setMessages((prev) => [...prev, { text, from: "user" }]);
        setBotIsTyping(true);

        const response = getBotResponse(text);

        const delay = Math.floor(Math.random() * 1000) + 1000;

        setTimeout(() => {
            setBotIsTyping(false);
            setMessages((prev) => [...prev, { text: response, from: "bot" }]);
        }, delay);
    }

    return (
        <div className="flex flex-col w-full min-w-80 max-w-86 h-full min-h-100 max-h-150 relative bg-gradient-to-b from-[#1C679A] to-[#21587A] rounded-2xl border border-blue-950/75 shadow-xl">
            <div className="flex flex-row justify-between items-center px-4 pt-4 pb-2">
                <div className="flex flex-row items-center gap-2">
                    <img className="w-8 h-8 md:w-10 md:h-10" src="/images/logo.png" alt="Logo" />
                    <div className="h-6 md:h-8 text-cyan-100 text-sm md:text-base font-normal">Assistente Waves</div>
                </div>
                <button onClick={onClose} className="p-2 text-cyan-100/80 hover:text-cyan-100 transition cursor-pointer">
                    <XIcon />
                </button>
            </div>
            <div className="w-full h-10 flex items-center justify-center text-white/70 text-base font-normal pb-2">
                {dateTime}
            </div>

            <div className="flex-1 overflow-y-auto px-3 pb-2 scroll-container">
                {showIntro && (
                    <>
                        <div className="text-white text-lg text-center font-medium mb-4 px-6">{title}</div>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                            {initialQuestions.map((q, i) => (
                                <InitialQuestionCard key={i} index={i} question={q} onClick={() => sendMessage(q)} />
                            ))}
                        </div>
                    </>
                )}

                {messages.map((msg, i) =>
                    msg.from === "user" ? (
                        <div key={i} className="flex w-full justify-end items-start mb-5">
                            <div className="flex flex-row-reverse gap-2 items-start">
                                <div className="flex items-end justify-end">
                                    <span className="w-8 h-8 bg-[#1A3463] border-2 border-[#1B2945] rounded-full flex items-center justify-center shadow-md">
                                        <UserIcon />
                                    </span>
                                </div>
                                <div className="flex items-end justify-end">
                                    <UserMessageCard message={msg.text} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div key={i} className="flex w-full justify-start items-end mb-5">
                            <div className="flex w-full flex-row gap-2 items-end">
                                <span className="w-9 h-9 flex items-end justify-center bg-white/10 rounded-full p-1">
                                     {/* Ajustei o src da imagem do bot, confirma se o caminho está certo */}
                                    <img src="/images/think-bot-logo.png" alt="Bot" className="w-full h-full object-contain"/>
                                </span>
                                <BotMessageCard message={msg.text} />
                            </div>
                        </div>
                    )
                )}

                {botIsTyping && (
                    <div className="flex mt-1 gap-2 max-w-[60%] justify-start items-center">
                        <span className="w-9 h-9 bg-[#1A3463] border-2 border-[#1B2945] rounded-full flex items-center justify-center shadow-md">
                            {/* Loading icon wrapper */}
                             <img src="/images/think-bot-logo.png" alt="Bot typing" className="w-5 h-5" />
                        </span>
                        <div className="px-3 py-1 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl bg-white/25 border border-white/30 backdrop-blur-blur text-white h-8 flex items-center">
                            <LoadingDots />
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="p-4">
                <MessageInput onSend={(text) => sendMessage(text)} />
            </div>
        </div>
    );
}

function LoadingDots() {
    return (
        <div className="flex space-x-1">
            <span className="animate-bounce bg-white rounded-full w-2 h-2"></span>
            <span className="animate-bounce animation-delay-200 bg-white rounded-full w-2 h-2"></span>
            <span className="animate-bounce animation-delay-400 bg-white rounded-full w-2 h-2"></span>
            <style>{`
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
        </div>
    );
}