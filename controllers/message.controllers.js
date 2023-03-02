const db = require('./db.controllers');

const postMessage = async (req, res) => {
    try {
        const { from, to, message, time } = req.body;
        const messages = db.collection("messages").doc(from).collection(to);

        const docRef = messages.doc();

        await docRef.set({ message, time });

        res.status(201).json({ "message": "Message posted successfully" });
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const getMessage = async (req, res) => {
    try {
        const { from, to } = req.body;
        const messages = db.collection("messages").doc(from).collection(to);
        const data = [];

        const snapsnot = await messages.orderBy('time').get();

        if (snapsnot.empty) {
            res.status(404).json({ "message": "No messages" });
        } else {
            for (let doc of snapsnot.docs) {
                data.push(doc.data());
            }

            res.status(200).json({ "messages": data });
        }
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

module.exports = { postMessage, getMessage };