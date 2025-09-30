const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Task name cannot be empty']
  },
  description: String,
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Task', taskSchema);
