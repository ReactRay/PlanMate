import mongoose from 'mongoose'

const taskSubSchema = new mongoose.Schema({
  title: String,
  description: String,
  duration: Number,
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
})

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: '',
    },
    todo: [taskSubSchema],
    progress: [taskSubSchema],
    done: [taskSubSchema],
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
