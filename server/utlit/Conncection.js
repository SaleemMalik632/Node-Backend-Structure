const mongoose = require('mongoose');

// Connection URL with database name specified
const url = `mongodb+srv://saleemalik444:12345@user.qvoojjv.mongodb.net/test`;

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Bind connection to open event (to get notification of connection success)
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Export the connection
module.exports = db;
