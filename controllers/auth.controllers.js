const db = require('./db.controllers');

const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const users = db.collection("users");
        const snapsnot = await users.where('username', '==', username).get();

        if (snapsnot.empty) {
            const docRef = users.doc();
            await docRef.set({ username, password });

            res.status(201).json({ "message": "User created successfully" });
        } else {
            res.status(403).json({ "message": "User already exists" });
        }
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const users = db.collection("users");
        const snapsnot = await users.where('username', '==', username).get();

        if (snapsnot.empty) {
            res.status(404).json({ "message": "User does not exist" });
        } else {
            const user = snapsnot.docs[0];

            if (password === user.data().password) {
                res.status(200).json({ "message": "Log in successfull" });
            } else {
                res.status(401).json({ "message": "Incorrect Password" });
            }
        }
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

module.exports = { signup, login };