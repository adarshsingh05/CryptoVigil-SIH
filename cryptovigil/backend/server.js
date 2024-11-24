const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
const port = 4000;

dotenv.config();
// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', require('./routes/auth'));


app.get('/SignUp', (req, res) => {
    res.send('Hello World!');
   
})
app.get('/anotherPage', (req, res) => {
  const userIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`User IP on anotherPage: ${userIp}`);
  res.send(`Your IP address on another page is: ${userIp}`);
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});