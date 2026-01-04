import { useEffect, useState, useRef, Fragment } from 'react'; // Adicionado Fragment
import { useChat } from '../../../Hooks/useChat';
import SendMessageIcon from '../../Icons/SendMessageIcon';

const CloseIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>;

export default function TeamChatModal({ auth, team, isOpen, onClose }) {
    const { messages, sendMessage, isConnected } = useChat(team?.id);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const formatDateLabel = (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (date.toDateString() === today.toDateString()) return "Hoje";
        if (date.toDateString() === yesterday.toDateString()) return "Ontem";
        
        return date.toLocaleDateString('pt-PT', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;
        sendMessage(inputText);
        setInputText("");
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="relative w-full max-w-2xl xl:max-w-3xl 2xl:max-w-5xl bg-[#1C679A]/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] 2xl:h-[900px] border border-white/20 backdrop-blur-lg">
                
                <div className="p-4 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-1.5 rounded-full">
                            <img src="/images/logo.png" className="w-6 h-6" alt="Logo" />
                        </div>
                        <div>
                            <h2 className="text-[#60B4D9] text-xl font-medium tracking-wide">{team.name}</h2>
                            <div className="flex items-center gap-2 text-xs">
                                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></span>
                                {isConnected ? 'Online' : 'A reconectar...'}
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="opacity-70 hover:opacity-100 transition cursor-pointer">
                        <CloseIcon />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {messages.map((msg, index) => {
                        const isMe = msg.user_id === auth.user.id;
                        
                        const currentDate = new Date(msg.created_at).toDateString();
                        const previousDate = index > 0 ? new Date(messages[index - 1].created_at).toDateString() : null;
                        const showDateSeparator = currentDate !== previousDate;

                        return (
                            <Fragment key={msg.id || index}>
                                {showDateSeparator && (
                                    <div className="flex items-center justify-center my-4">
                                        <div className="h-px bg-white/20 grow"></div>
                                        <span className="px-4 text-white/50 text-md font-medium uppercase tracking-widest">
                                            {formatDateLabel(msg.created_at)}
                                        </span>
                                        <div className="h-px bg-white/20 grow"></div>
                                    </div>
                                )}

                                <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm relative text-sm ${isMe
                                        ? 'bg-white/20 text-white rounded-tr-none backdrop-blur-md'
                                        : 'bg-white/90 text-[#1A3463] rounded-tl-none'
                                        }`}>

                                        <div className={`text-[#1A3463] font-bold text-xs mb-1 opacity-90 ${isMe ? 'uppercase' : ''}`}>
                                            {isMe ? 'EU' : msg.user?.name}
                                        </div>

                                        <p className="leading-relaxed text-[15px]">{msg.message || msg.content}</p>

                                        <span className={`text-[10px] block text-right mt-1 ${isMe ? 'text-white/70' : 'text-gray-500'}`}>
                                            {new Date(msg.created_at).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            </Fragment>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="flex items-center gap-4 px-2 md:px-8 pb-4 pt-4">
                    <div className="w-full relative">
                        <div className="flex flex-row gap-2 md:gap-3">
                            <input
                                type="text"
                                className="grow h-10 px-4 focus:outline-none text-white text-sm bg-white/25 rounded-xl border border-white/30 placeholder:text-white/60"
                                placeholder="Escrever mensagem"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim()}
                                className="w-12 h-10 bg-white/25 rounded-xl border border-white/30 flex items-center justify-center text-white cursor-pointer hover:bg-white/40 transition-colors"
                            >
                                <SendMessageIcon />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}