"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Search, Phone, Video, MoreHorizontal, Paperclip, Smile, Send } from "lucide-react";
import Header from "../news/ui/header/page";
import style from "./messages.module.css";
import { cn } from "@/lib/utils";

interface Chat {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    isOnline: boolean;
}

interface Message {
    id: string;
    text: string;
    time: string;
    isOwn: boolean;
}

export default function MessagesPage() {
    const [selectedChat, setSelectedChat] = useState<string>("1");
    const [newMessage, setNewMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const chats: Chat[] = [
        {
            id: "1",
            name: "Анна Смирнова",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            lastMessage: "Привет! Как дела с новым проектом?",
            time: "14:23",
            unread: 2,
            isOnline: true
        },
        {
            id: "2",
            name: "Максим Волков",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            lastMessage: "Отправил тебе файлы для ревью",
            time: "13:45",
            unread: 0,
            isOnline: true
        },
        {
            id: "3",
            name: "Екатерина Петрова",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            lastMessage: "Увидимся завтра на встрече!",
            time: "12:30",
            unread: 0,
            isOnline: false
        },
        {
            id: "4",
            name: "Дмитрий Сидоров",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            lastMessage: "Спасибо за помощь! 👍",
            time: "11:15",
            unread: 1,
            isOnline: false
        },
        {
            id: "5",
            name: "Ольга Иванова",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
            lastMessage: "Можем обсудить детали проекта?",
            time: "10:45",
            unread: 0,
            isOnline: true
        },
        {
            id: "6",
            name: "Игорь Козлов",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
            lastMessage: "Отличная работа! Продолжаем в том же духе",
            time: "09:20",
            unread: 0,
            isOnline: false
        }
    ];

    const messages = useMemo<{ [chatId: string]: Message[] }>(() => ({
        "1": [
            {
                id: "1",
                text: "Привет! Как дела с новым проектом?",
                time: "14:20",
                isOwn: false
            },
            {
                id: "2",
                text: "Привет! Все отлично, почти закончил дизайн-систему",
                time: "14:21",
                isOwn: true
            },
            {
                id: "3",
                text: "Хочешь посмотреть предварительную версию?",
                time: "14:21",
                isOwn: true
            },
            {
                id: "4",
                text: "Конечно! Очень интересно посмотреть на результат",
                time: "14:23",
                isOwn: false
            }
        ],
        "2": [
            {
                id: "1",
                text: "Отправил тебе файлы для ревью",
                time: "13:40",
                isOwn: false
            },
            {
                id: "2",
                text: "Проверь пожалуйста макеты и дай фидбек",
                time: "13:41",
                isOwn: false
            },
            {
                id: "3",
                text: "Отлично, спасибо! Посмотрю в течение часа",
                time: "13:45",
                isOwn: true
            }
        ],
        "3": [
            {
                id: "1",
                text: "Увидимся завтра на встрече!",
                time: "12:30",
                isOwn: false
            },
            {
                id: "2",
                text: "Да, до встречи! В 10:00 как договаривались",
                time: "12:32",
                isOwn: true
            }
        ]
    }), []);

    const currentChat = chats.find(chat => chat.id === selectedChat);
    const currentMessages = useMemo(() => messages[selectedChat] || [], [messages, selectedChat]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentMessages]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            // Отправка сообщения
            console.log("Sending message:", newMessage);
            setNewMessage("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
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
                            {chats.map((chat) => (
                                <div
                                    key={chat.id}
                                    className={cn(style.chatItem, selectedChat === chat.id && style.active)}
                                    onClick={() => setSelectedChat(chat.id)}
                                >
                                    <div className={style.chatAvatarContainer}>
                                        <img
                                            src={chat.avatar}
                                            alt={chat.name}
                                            className={style.chatAvatar}
                                        />
                                        <div className={cn(style.chatStatusIndicator, chat.isOnline ? style.online : style.offline)}></div>
                                    </div>

                                    <div className={style.chatInfo}>
                                        <div className={style.chatName}>{chat.name}</div>
                                        <div className={style.chatLastMessage}>{chat.lastMessage}</div>
                                    </div>

                                    <div className={style.chatMeta}>
                                        <div className={style.chatTime}>{chat.time}</div>
                                        {chat.unread > 0 && (
                                            <div className={style.chatUnread}>{chat.unread}</div>
                                        )}
                                    </div>
                                </div>
                            ))}
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
                                                    <div className={style.messageTime}>{message.time}</div>
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
                                            onKeyPress={handleKeyPress}
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
        </>
    );
}