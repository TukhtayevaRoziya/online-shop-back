const mongoose = require("mongoose");

const StudentsSchema = mongoose.Schema({
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
  parentsName: {
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
  },
  className: {
    type: String,
    required: true,
  },
  payment: {
    type: Boolean,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },

});

module.exports = mongoose.model('students', StudentsSchema);
