const socketIo = require('socket.io');
const http = require('http');
const dotenv = require('dotenv');
dotenv.config();

const server = http.createServer();

const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: "*"
    }
});

io.on('connection', (socket) => {
    socket.on('message', (message) => {
        io.emit('message', message);
    });
});
const PORT = process.env.SOCKETPORT;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
