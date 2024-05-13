const dbConnection = require('../dbConnection.js');

class chatQueries {
    async get() {
        const query = "SELECT * FROM `chats` WHERE del = 1";
        try {
            const result = dbConnection.query(query);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async post(formData) {
        try {
            const { username, message } = formData;

            const query = 'INSERT INTO `chats`(`id`, `username`, `message`, `del`) VALUES (null,?,?,1)';
            const data = [username, message];

            dbConnection.query(query, data, (error, result) => {
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
    };


}
module.exports = new chatQueries();