require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//Route
const userRoute = require('./routes/userRoute');
const conversactionRoute = require('./routes/conversactionRoute');
const messageRoute= require('./routes/messageRoute');

try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to MongoDB');
} catch (error) {
    console.log(error);
}

const PORT = process.env.PORT || 5001;

//Route
app.use('/api/user', userRoute);
app.use('/api/conversaction', conversactionRoute);
app.use('/api/message', messageRoute);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
