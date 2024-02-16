// Importing the express module
// const express = require('express');

// Importing the app instance from the app.js file
const app = require('./app.js');

// Start the server and listen for incoming requests
app.listen(port, () => console.log(`App listening on port ${port}!`))


