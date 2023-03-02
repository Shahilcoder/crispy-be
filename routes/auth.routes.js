const express = require('express');
const { signup, login } = require('../controllers/auth.controllers');
const authRouter = express.Router();
const messagesRouter = express.Router();
authRouter.post('/signup', signup);
authRouter.post('/login', login);

//code by yasin
// Route for sending message

messagesRouter.post('/', authMiddleware, async (req, res) => {
  try {
    const { message, receiverId } = req.body;
    const senderId = req.user.uid;

    const messagesRef = db.collection('messages');
    const newMessage = {
      senderId,
      receiverId,
      message,
      createdAt: new Date().toISOString()
    };

    await messagesRef.add(newMessage);

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

//code by yasin
// Route for sending message
//end


//code by yasin
//route for retriving all message of auth user
messagesRouter.get('/', authMiddleware, async (req, res) => {
    try {
      const messages = [];
      const messagesRef = db.collection('messages');
      const querySnapshot = await messagesRef.orderBy('timestamp').get();
  
      querySnapshot.forEach((doc) => {
        const messageData = doc.data();
        messages.push({
          id: doc.id,
          sender: messageData.sender,
          text: messageData.text,
          timestamp: messageData.timestamp.toMillis(),
        });
      });
  
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error getting messages:', error);
      res.status(500).json({ error: 'Error getting messages' });
    }
});
//code by yasin
//route for retriving all message of auth user
//end

module.exports = {
   messagesRouter,
   authRouter
}
