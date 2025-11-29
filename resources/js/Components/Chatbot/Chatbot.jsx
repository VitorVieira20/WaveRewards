import { useEffect, useState, useRef } from "react";
import InitialQuestionCard from "./InitialQuestionCard";
import XIcon from "../Icons/XIcon";
import MessageInput from "./MessageInput";
import BotMessageCard from "./BotMessageCard";
import UserMessageCard from "./UserMessageCard";
import UserIcon from "../Icons/UserIcon";

const normalizeText = (text) => {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[?!.,;:]/g, "");
};

const getBotResponse = (input) => {
    const cleanInput = normalizeText(input);

    const inputWords = cleanInput.split(/\s+/);

    let bestMatch = null;
    let maxScore = 0;

    knowledgeBase.forEach(item => {
        if (item.id === 'default') return;

        let score = 0;
        item.keywords.forEach(keyword => {
            if (cleanInput.includes(keyword)) {
                score += keyword.split(' ').length;
            }
        });

        if (score > maxScore) {
            maxScore = score;
            bestMatch = item;
        }
    });

    return bestMatch ? bestMatch.answer : knowledgeBase.find(i => i.id === 'default').answer;
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

    async function sendMessage(text) {
        if (!text) return;

        setMessages((prev) => [...prev, { text, from: "user" }]);
        setBotIsTyping(true);

        try {
            const response = await fetch('http://localhost:8000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ message: text })
            });

            if (!response.ok) throw new Error('Falha na resposta');

            const data = await response.json();

            setMessages((prev) => [...prev, { text: data.response, from: "bot" }]);

        } catch (error) {
            console.error("Erro no chat:", error);
            setMessages((prev) => [...prev, { 
                text: "Desculpa, estou com dificuldades de conexão ao mar neste momento. 🌊 Tenta mais tarde.", 
                from: "bot" 
            }]);
        } finally {
            setBotIsTyping(false);
        }
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
                                    <img src="/images/think-bot-logo.png" alt="Bot" className="w-full h-full object-contain" />
                                </span>
                                <BotMessageCard message={msg.text} />
                            </div>
                        </div>
                    )
                )}

                {botIsTyping && (
                    <div className="flex mt-1 gap-2 max-w-[60%] justify-start items-center">
                        <span className="w-9 h-9 bg-[#1A3463] border-2 border-[#1B2945] rounded-full flex items-center justify-center shadow-md">
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