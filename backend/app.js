const express = require('express');
const cors = require('cors');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', urlRoutes);

app.get('/health', (req, res) => {
  res.send('URL Shortener APP Running');
});

module.exports = app;


