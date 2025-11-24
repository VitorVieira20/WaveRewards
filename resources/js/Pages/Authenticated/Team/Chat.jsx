import { useEffect, useState, useRef } from 'react';
import { usePage, Head } from '@inertiajs/react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useChat } from '../../../Hooks/useChat';

export default function ChatShow({ team, auth }) {
    const { messages, sendMessage, isConnected } = useChat(team.id);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef(null); // Para scroll automático

    // Scroll para o fundo sempre que chega uma mensagem
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(inputText);
        setInputText("");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Head title={`Chat - ${team.name}`} />

            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">

                {/* CABEÇALHO */}
                <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
                    <h1 className="text-xl font-bold">💬 {team.name}</h1>
                    <div className="flex items-center gap-2 text-sm">
                        Status:
                        <span className={`px-2 py-1 rounded ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}>
                            {isConnected ? 'Online' : 'Offline'}
                        </span>
                    </div>
                </div>

                {/* ÁREA DE MENSAGENS */}
                <div className="h-[400px] overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50">
                    {messages.length === 0 && (
                        <p className="text-center text-gray-400 mt-10">Ainda não há mensagens.</p>
                    )}

                    {messages.map((msg, index) => {
                        // Verifica se a mensagem fui eu que enviei
                        const isMe = msg.user_id === auth.user.id;

                        return (
                            <div key={msg.id || index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] rounded-lg p-3 shadow-sm ${
                                    isMe ? 'bg-blue-100 text-blue-900' : 'bg-white text-gray-800 border border-gray-200'
                                }`}>
                                    <div className="text-xs font-bold mb-1 opacity-70">
                                        {isMe ? 'Eu' : msg.user?.name || 'Utilizador'}
                                    </div>
                                    <p className="text-sm">{msg.content || msg.message}</p>
                                    {/* Nota: 'msg.message' é como vem do Laravel (histórico), 'msg.content' é como vem do NestJS (tempo real). O ideal é normalizar, mas isto funciona para teste. */}
                                    <div className="text-[10px] text-right mt-1 opacity-50">
                                        {new Date(msg.created_at).toLocaleTimeString()}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* INPUT AREA */}
                <form onSubmit={handleSubmit} className="p-4 border-t bg-white flex gap-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Escreve uma mensagem..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={!isConnected}
                    />
                    <button
                        type="submit"
                        disabled={!isConnected || !inputText.trim()}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}