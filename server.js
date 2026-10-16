require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Bonus: custom middleware to log every request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// JSON body parsing
app.use(express.json());

// Static HTML page served at "/"
// (declared before the GET / route so the HTML page is what visitors see)
app.use(express.static(path.join(__dirname, 'public')));

// GET /  -> "My Week 2 API!"
// Static index.html takes "/" in the browser; this route answers API clients
// (curl/Postman) that ask for plain text or JSON, and is also available at /api.
app.get(['/api', '/'], (req, res) => {
  res.send('My Week 2 API!');
});

// POST /user -> accepts {name, email}; responds "Hello, [name]!"
app.post('/user', (req, res) => {
  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Both name and email are required.' });
  }

  res.send(`Hello, ${name}!`);
});

// GET /user/:id -> "User [id] profile"
app.get('/user/:id', (req, res) => {
  res.send(`User ${req.params.id} profile`);
});

// Handle malformed JSON bodies (400) and any other errors
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON in request body.' });
  }
  console.error(err);
  res.status(500).json({ error: 'Something went wrong.' });
});

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
