const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(bodyParser.json());

const connection = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

connection.getConnection((err) => {
    if (err) {
        console.error('Error connectning database', err.stack);
        return;
    } else {
        console.log('Database Connected');
    }
});

app.get('/chat', (req, res) => {
    try {
        const query = 'SELECT * FROM `chats` WHERE del = 1';
        connection.query(query, (error, result) => {
            res.send(result);
        })
    } catch (error) {
        res.send(error);
    }
});
app.post('/chat', (req, res) => {
    try {
        const {username,message} = req.body;

        const query = 'INSERT INTO `chats`(`id`, `username`, `message`, `del`) VALUES (null,?,?,1)';
        const data = [username, message];

        connection.query(query, data, (error, result) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Error inserting data' });
            } else {
                res.status(200).json({ message: 'Data successfully inserted', result: result });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


const PORT = process.env.BACKENDPORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});