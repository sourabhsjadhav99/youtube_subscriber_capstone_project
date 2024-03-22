// Import required modules
const express = require('express');
const subscribersRoutes = require('./routes/subscriberRoutes'); // Import routes from subscriberRoutes file
const app = express(); 
const path = require('path');

app.use(express.json()); // Use JSON body parser middleware

// Serve static files from the "Public" directory
app.use("/", express.static("Public"));


// Define route for the root URL
app.get('/', (req, res) => {
  // Send the index.html file from the "Public" directory
  res.sendFile(path.join(__dirname, '../Public/index.html'));
});



// Use subscribersRoutes for the '/subscribers' path
app.use('/subscribers', subscribersRoutes);


// 404 Error Handling Middleware
app.use((req, res) => {
    res.send('<h1>404: Page Not Found</h1> <a href="/">Back to home</a>');
});

module.exports = app;
