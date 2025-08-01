import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let socket;

export default function useOnlineUsers(userId) {
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        socket = io('http://localhost:4000', { withCredentials: true });

        if (userId) {
            socket.emit('user-connected', userId);
        }

        socket.on('online-users', (users) => {
            setOnlineUsers(users);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId]);

    return { onlineUsers, socket };
}
