const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
    animalname: {
      type: String,
      required: true,
      default:'Animal'+new Date().getTime()
    },
    bio: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
 },


  {
    timestamps: true,

  });

module.exports = mongoose.model("Animal", animalSchema);