const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// create app
const port = process.env.PORT || 5000;
const app = express();

// configure app
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({}));

app.get('/', (req, res) => {
    res.send('crispy backend');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});