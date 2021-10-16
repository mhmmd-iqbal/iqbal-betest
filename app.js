const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/routes');

require('dotenv').config();

app.use(express.json());
app.use('/', router);

mongoose.connect(process.env.DATABASE_CONN, () => {
  console.log('connected to DB');
});

app.listen(3000, () => {
  console.log('server run on port 3000');
});
