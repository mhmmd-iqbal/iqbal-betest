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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('server run on port 3000');
});
