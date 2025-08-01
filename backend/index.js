// index.js
import dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { serve, setup } from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postsRoutes.js';
import friendsRoutes from './routes/friendsRoutes.js';
import messagesRoutes from './routes/messagesRoutes.js';

const app = express();
const server = http.createServer(app); // создание HTTP-сервера
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
    },
});

const db = connectDB();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(json());
app.use(cookieParser());

// Прокидываем db в запрос
app.use((req, res, next) => {
    req.db = db;
    next();
});

// API
app.use('/api-docs', serve, setup(swaggerSpec));
app.use('/api', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/messages', messagesRoutes);

// Запуск сервера
server.listen(4000, () =>
    console.log('Backend запущен на http://localhost:4000, Swagger: /api-docs')
);

// ===== Реализация Socket.IO =====
const onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("user_connected", (userId) => {
        onlineUsers.set(userId, socket.id);
        io.emit("update_online_users", Array.from(onlineUsers.keys()));
    });

    socket.on("send_message", (data) => {
        const { to, message, from } = data;
        const receiverSocketId = onlineUsers.get(to);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receive_message", {
                ...message,
                from,
            });
        }
    });

    socket.on("mark_as_read", ({ from, to }) => {
        socket.broadcast.emit("message_read", { from, to });
    });


    socket.on("disconnect", () => {
        for (let [id, sid] of onlineUsers.entries()) {
            if (sid === socket.id) {
                onlineUsers.delete(id);
                break;
            }
        }
        io.emit("update_online_users", Array.from(onlineUsers.keys()));
    });
});


