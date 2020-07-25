const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const connectDB = require('./db/db');

connectDB(); // Connect to the Database

const app = express();

app.use(express.json({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/word', require('./routes/wordRoute'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));