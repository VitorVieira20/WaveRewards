import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

export const useChat = (teamId) => {
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const socketRef = useRef(null);

    useEffect(() => {
        axios.get(`/chat/messages/${teamId}`)
            .then(res => {
                setMessages(res.data);
            })
            .catch(err => console.error("Erro ao carregar histórico:", err));

        axios.get(`/chat/token/${teamId}`)
            .then(res => {
                const token = res.data.token;

                socketRef.current = io('http://localhost:3000', {
                    auth: { token },
                    transports: ['websocket']
                });

                socketRef.current.on('connect', () => {
                    //console.log("✅ Conectado ao WebSocket!");
                    setIsConnected(true);
                });

                socketRef.current.on('disconnect', () => {
                    //console.log("❌ Desconectado.");
                    setIsConnected(false);
                });

                socketRef.current.on('connect_error', (err) => {
                    console.error("Erro de conexão socket:", err.message);
                });

                // C. Ouvir Novas Mensagens
                socketRef.current.on('newMessage', (newMessage) => {
                    //console.log("📩 Nova mensagem recebida:", newMessage);
                    setMessages((prev) => [...prev, newMessage]);
                });
            })
            .catch(err => console.error("Erro ao obter token de chat:", err));

        return () => {
            if (socketRef.current) socketRef.current.disconnect();
        };
    }, [teamId]);

    const sendMessage = (content) => {
        if (socketRef.current && content.trim() !== "") {
            socketRef.current.emit('sendMessage', { content });
        }
    };

    return { messages, sendMessage, isConnected };
};