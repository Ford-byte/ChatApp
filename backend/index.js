const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chatQueries = require('./queries/chatQueries.js');
const userQueries = require('./queries/userQueries.js');

class Server {
    constructor() {
        this.app = express();
        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
        }));
        this.app.use(express.json())
        this.app.use(bodyParser.json());
        // For the Chats
        this.app.get('/chat', this.handleGetChatQuery.bind(this));
        this.app.post('/chat', this.handlePostChatQuery.bind(this));
        // For the Users
        this.app.get('/user',this.handleGetUser.bind(this));
        this.app.post('/user',this.handelePostUser.bind(this));
    }
    // functions for chats
    async handleGetChatQuery(req, res) {
        try {
            const data = await chatQueries.get();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: "Error fetching data" });
        }
    }
    async handlePostChatQuery(req, res) {
        const {
            username,
            message
        } = req.body;
        const data = { username , message};
        try {
            const result = chatQueries.post(data)
            res.status(200).json({ message: 'Data Succesfully Added:' + result });
        } catch (error) {
            res.status(500).json({ error: "Error Pushing data" });
        }
    }
    // functions for users
    async handleGetUser(req,res){
        try {
            const data = await userQueries.get();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({error: "Error Fetching data"})
        }
    }
    async handelePostUser(req,res){
        const {
            email,
            password
        } = req.body;
        const data = { email , password };
        try {
            await userQueries.post(data);
            res.status(200).json({message:"Data Added Succesfully"});
        } catch (error) {
            res.status(500).json({message:"Internal Server Error"})
        }
    }


    start(PORT) {
        this.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
}

const server = new Server();
const PORT = process.env.BACKENDPORT || 3001;
server.start(PORT);