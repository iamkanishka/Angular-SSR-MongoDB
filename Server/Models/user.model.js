const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    admin_id: {
      type: String,
      required: true,
      default:'User'+new Date().getTime()
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    unique_id: {
      type: String,
      default: true,
    },
  },


  {
    timestamps: true,

  });

module.exports = mongoose.model("User", userSchema);