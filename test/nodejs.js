// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Mock database (replace with actual database integration)
let users = [];

// Routes
app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const { username, email } = req.body;
    const newUser = { username, email };
    users.push(newUser);
    res.status(201).json({ message: 'User created successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

