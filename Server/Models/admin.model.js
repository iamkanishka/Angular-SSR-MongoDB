const mongoose = require("mongoose");

const sub_adminSchema = new mongoose.Schema({
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
  type: {
    type: String,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("subadmin", sub_adminSchema);