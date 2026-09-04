const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json());

// Log requests
app.use(morgan('dev'));

// Serve static files, including public/index.html
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint
app.post('/api/log', (req, res) => {
  console.log(req.body);

  if (req.body?.payload?.Input === 'Error') {
    return res.sendStatus(403);
  }

  res.send('Post received');
});

// Fallback: serve the main page for non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
