"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Search, MoreHorizontal, Paperclip, Smile, Send } from "lucide-react";
import Header from "../ui/header/page";
import style from "./messages.module.css";
import { cn } from "@/lib/utils";
import ProtectedRoute from "../ProtectedRoute";
import { io } from "socket.io-client";

export default function MessagesPage() {
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState({});
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);


    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const userId = 1;

    const currentChat = chats.find(chat => chat.id === selectedChat);
    const currentMessages = useMemo(() => messages[selectedChat] || [], [messages, selectedChat]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentMessages]);

    useEffect(() => {
        const socketInstance = io("http://localhost:4000", {
            withCredentials: true,
        });

        setSocket(socketInstance);

        socketInstance.emit("user_connected", userId);

        socketInstance.on("update_online_users", (users) => {
            setOnlineUsers(users);
        });

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket.on("receive_message", (data) => {
            const { from, ...message } = data;

            setMessages((prev) => {
                const chatId = from.toString();
                return {
                    ...prev,
                    [chatId]: [...(prev[chatId] || []), { ...message, isOwn: false }]
                };
            });

            if (!chats.some(c => c.id === from.toString())) {
                setChats(prev => [
                    ...prev,
                    {
                        id: from.toString(),
                        name: `Пользователь ${from}`,
                        avatar: "/user.png",
                        lastMessage: message.text,
                        time: new Date().toLocaleTimeString(),
                        unread: 1,
                        isOnline: onlineUsers.includes(from)
                    }
                ]);
            }
        });

        socket.on("message_read_ack", ({ chatId }) => {
            setMessages((prev) => {
                const updated = prev[chatId]?.map((msg) =>
                    msg.isOwn ? { ...msg, read: true } : msg
                );
                return { ...prev, [chatId]: updated };
            });
        });

        return () => {
            socket.off("receive_message");
            socket.off("update_online_users");
            socket.off("message_read_ack");
        };

    }, [chats, onlineUsers]);


    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedChat) return;

        if (newMessage.trim()) {
            // Отправка сообщения
            console.log("Sending message:", newMessage);
            setNewMessage("");
        }
    };

    const handleKeyPress = (e) => {
        if (newMessage.trim()) {
            const message = {
                id: Date.now().toString(),
                text: newMessage,
                time: new Date().toLocaleTimeString(),
                isOwn: true,
                read: false,
            };

            setMessages((prev) => ({
                ...prev,
                [selectedChat]: [...(prev[selectedChat] || []), message]
            }));

            socket.emit("send_message", {
                to: Number(selectedChat),
                from: userId,
                message,
            });

            setNewMessage("");
        }
    };

    const handleSelectChat = (chatId) => {
        setSelectedChat(chatId);
        // При открытии отправляем "прочитано"
        socket.emit("message_read", {
            from: userId,
            to: Number(chatId),
        });
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, selectedChat]);

    const selectedMessages = messages[selectedChat] || [];

    return (
        <>
            <ProtectedRoute>
                <Header />
                <div className={style.mainContainer}>
                    <div className={style.messagesLayout}>
                        <div className={style.messagesSidebar}>
                            <div className={style.messagesSidebarHeader}>
                                <h1 className={style.messagesTitle}>Сообщения</h1>
                                <div className={style.messagesSearch}>
                                    <Search className={style.messagesSearchIcon} size={16} />
                                    <input
                                        type="text"
                                        placeholder="Поиск сообщений..."
                                        className={style.messagesSearchInput}
                                    />
                                </div>
                            </div>

                            <div className={style.messagesList}>
                                {chats.map((chat) => {
                                    const isOnline = onlineUsers.includes(chat.id);

                                    return (
                                        <div
                                            key={chat.id}
                                            className={cn(style.chatItem, selectedChat === chat.id && style.active)}
                                            onClick={() => handleSelectChat(chat.id)}
                                        >
                                            <div className={style.chatAvatarContainer}>
                                                <img
                                                    src={chat.avatar}
                                                    alt={chat.name}
                                                    className={style.chatAvatar}
                                                />
                                                <div className={cn(style.chatStatusIndicator, isOnline ? style.online : style.offline)}></div>
                                            </div>

                                            <div className={style.chatInfo}>
                                                <div className={style.chatName}>
                                                    {chat.name}
                                                    {onlineUsers.includes(Number(chat.id)) && (
                                                        <span className={style.onlineDot} />
                                                    )}
                                                </div>
                                                <div className={style.chatLastMessage}>{chat.lastMessage}</div>
                                            </div>

                                            <div className={style.chatMeta}>
                                                <div className={style.chatTime}>{chat.time}</div>
                                                {chat.unread > 0 && (
                                                    <div className={style.chatUnread}>{chat.unread}</div>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={style.messagesMain}>
                            {currentChat && (
                                <>
                                    <div className={style.messagesHeader}>
                                        <div className={style.messagesHeaderInfo}>
                                            <img
                                                src={currentChat.avatar}
                                                alt={currentChat.name}
                                                className={style.messagesHeaderAvatar}
                                            />
                                            <div className={style.messagesHeaderDetails}>
                                                <h3>{currentChat.name}</h3>
                                                <p>{currentChat.isOnline ? "В сети" : "Был в сети недавно"}</p>
                                            </div>
                                        </div>

                                        <div className={style.messagesHeaderActions}>
                                            <button className={style.messagesActionButton}>
                                                <MoreHorizontal size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className={style.messagesContent}>
                                        {currentMessages.map((message, index) => {
                                            const isGrouped = index > 0 &&
                                                currentMessages[index - 1].isOwn === message.isOwn;

                                            return (
                                                <div
                                                    key={message.id}
                                                    className={cn(style.messageGroup, message.isOwn ? style.own : style.other)}
                                                >
                                                    <div className={cn(style.messageBubble, message.isOwn ? style.own : style.other)}>
                                                        <div className={style.messageText}>{message.text}</div>
                                                        <div className={style.messageTime}>
                                                            {message.time}
                                                            {message.isOwn && (message.read ? " ✓✓" : " ✓")}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {isTyping && (
                                            <div className={cn(style.messageGroup, style.other)}>
                                                <div className={style.typingIndicator}>
                                                    <div className={style.typingDots}>
                                                        <div className={style.typingDots}></div>
                                                        <div className={style.typingDots}></div>
                                                        <div className={style.typingDots}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div ref={messagesEndRef} />
                                    </div>
                                    <div className={style.messagesInputContainer}>
                                        <div className={style.messagesInputWrapper}>
                                            <textarea
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                onKeyDown={handleKeyPress}
                                                placeholder="Напишите сообщение..."
                                                className={style.messagesInput}
                                                rows={1}
                                            />

                                            <div className={style.messagesInputActions}>
                                                <button className={style.messagesInputButton}>
                                                    <Paperclip size={16} />
                                                </button>
                                                <button className={style.messagesInputButton}>
                                                    <Smile size={16} />
                                                </button>
                                                <button
                                                    className={style.messagesSendButton}
                                                    onClick={handleSendMessage}
                                                    disabled={!newMessage.trim()}
                                                >
                                                    <Send size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </ProtectedRoute>
        </>
    );
}