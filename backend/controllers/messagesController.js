let messages = [];

export const sendMessage = (req, res) => {
    const { from, to, text } = req.body;
    const message = {
        id: messages.length + 1,
        from,
        to,
        text,
        timestamp: new Date(),
        read: false,
    };
    messages.push(message);
    res.status(200).json(message);
};

export const markAsRead = (req, res) => {
    const { from, to } = req.body;
    messages = messages.map(msg =>
        msg.from === from && msg.to === to ? { ...msg, read: true } : msg
    );
    res.sendStatus(200);
};

export const getMessages = (req, res) => {
    const { from, to } = req.query;
    const chat = messages.filter(
        msg =>
            (msg.from === from && msg.to === to) ||
            (msg.from === to && msg.to === from)
    );
    res.json(chat);
};
