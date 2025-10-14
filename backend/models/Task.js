import mongoose from 'mongoose';

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

export default mongoose.model('Task', taskSchema);
