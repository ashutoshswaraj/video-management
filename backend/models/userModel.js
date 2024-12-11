const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    googleId: String,
    displayName: String,
    email: String,
    image: String,
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if the password hasn't changed
  this.password = await bcrypt.hash(this.password, 10); // Hash the password
  next();
});

// Compare the input password with the hashed password in the database
userSchema.methods.comparePassword = function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
