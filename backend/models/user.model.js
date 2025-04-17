import mongoose from 'mongoose'

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
    todo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    progress: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    done: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

export default User
