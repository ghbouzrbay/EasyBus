import express from 'express';
import indexRouter from './routes/index';


const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Route for /status endpoint
app.get('/status', (req, res) => {
  res.status(200).json({ message: 'Server is up and running' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

