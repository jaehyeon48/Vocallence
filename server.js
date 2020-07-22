const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const connectDB = require('./db/db');

connectDB(); // Connect to the Database

const app = express();

app.use(express.json({ extended: false }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));