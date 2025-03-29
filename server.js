const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080; // Use environment variable or default to 8080

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle SPA routing: send index.html for any requests that don't match static files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
}); 