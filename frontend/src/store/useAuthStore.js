import { create } from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'
import { checkArrays } from '../lib/utils.js'

const BASE_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5000' : '/'

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check')

      set({ authUser: res.data })
    } catch (error) {
      console.log('Error in checkAuth:', error)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true })
    try {
      const res = await axiosInstance.post('/auth/signup', data)
      set({ authUser: res.data })
      toast.success('Account created successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isSigningUp: false })
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true })
    try {
      const res = await axiosInstance.post('/auth/login', data)
      set({ authUser: res.data })
      toast.success('Logged in successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isLoggingIn: false })
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout')
      set({ authUser: null })
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true })
    try {
      const res = await axiosInstance.put('/auth/update-profile', data)
      set({ authUser: res.data })
      toast.success('Profile updated successfully')
    } catch (error) {
      console.log('error in update profile:', error)
      toast.error(error.response.data.message)
    } finally {
      set({ isUpdatingProfile: false })
    }
  },

  getUserPlan: async (userId, userInput) => {
    set({ isUpdatingProfile: true })

    try {
      const res = await axiosInstance.post('/plan/getplan', {
        userId,
        userInput,
      })

      set({ authUser: res.data.user })
      toast.success('Plan generated and tasks added to your todo list')
    } catch (error) {
      console.error('Error in getUserPlan:', error)
      toast.error(error.response?.data?.message || 'Failed to generate plan')
    } finally {
      set({ isUpdatingProfile: false })
    }
  },
  updateTaskGroup: (task, fromGroup, toGroup) => {
    const { authUser } = get()

    const updatedFrom = authUser[fromGroup].filter((t) => t._id !== task._id)

    const updatedTo = [...authUser[toGroup], task]

    const updatedUser = {
      ...authUser,
      [fromGroup]: updatedFrom,
      [toGroup]: updatedTo,
    }

    set({ authUser: updatedUser })
  },
}))
