// Import mongoose to interact with MongoDB
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    googleId: { type: String },
});

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

// Create the User model using the schema
const User = mongoose.model('users', userSchema);

// Export the User model
module.exports = User;
 