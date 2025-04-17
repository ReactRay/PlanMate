const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    priority: { type: String, default: 'medium' },
  },
  { timestamps: true }
)

const Task = mongoose.model('Task', TaskSchema)
