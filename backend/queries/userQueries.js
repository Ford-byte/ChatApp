const dbConnection = require('../dbConnection');

class userQueries {
    async get() {
        const query = "SELECT * FROM `users` WHERE del = 1";
        try {
            const result = await dbConnection.query(query);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async post(formData) {
        try {
            const {
                email,
                password
            } = formData;
            const query = "INSERT INTO `users`(`id`, `email`, `password`, `del`) VALUES (NULL,?,?,1)";
            const data = [email,password];
            dbConnection.query(query,data,(error,result)=>{
                if (error) {
                    console.error(error);
                    res.status(500).json({message : "Error Pushing Data"});
                    throw error;
                } else {
                    res.status(200).json({message:"Data Added Successfully"});
                }
            });
        } catch (error) {
            res.status(500).json({message: "Server error"});
            throw error;
        }
    }
}

module.exports = new userQueries();