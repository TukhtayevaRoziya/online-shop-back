const mongoose = require("mongoose");

const TeachersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  }, 
  degree: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  startWork: {
    type: String,
    required: true,
  },
  finishWork: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  }

});

module.exports = mongoose.model('teachers', TeachersSchema);
