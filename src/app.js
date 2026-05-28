const express = require('express');
const cors = require('cors');

const app = express();

const authRoutes = require('./routes/authRoutes');
const occurrencesRoutes = require('./routes/occurrencesRoutes');

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/occurrence', occurrencesRoutes);



module.exports = app;