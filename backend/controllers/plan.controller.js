import User from '../models/user.model.js'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
})

export async function getPlan(req, res) {
  const { userId, userInput } = req.body

  if (!userId || !userInput) {
    return res
      .status(400)
      .json({ message: 'userId and userInput are required' })
  }

  try {
    const tasks = await generateTasksFromPlan(userInput)

    if (!tasks || !Array.isArray(tasks)) {
      return res.status(500).json({ message: 'Invalid response from OpenAI' })
    }

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    user.todo.push(...tasks)

    await user.save()

    res.status(200).json({ user })
  } catch (error) {
    console.log(error, ' ← error in getPlan')
    res.status(500).json({ message: 'Internal server error' })
  }
}

export async function resetPlan(req, res) {
  const userId = req.body.userId
  console.log(userId)
  try {
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.todo = []
    user.progress = []
    user.done = []

    await user.save()

    res.status(200).json(user)
  } catch (error) {
    console.log('Error in resetPlan:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const generateTasksFromPlan = async (plan = '') => {
  if (!plan.trim()) return []

  try {
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that breaks down project plans into structured tasks.',
        },
        {
          role: 'user',
          content: `Break this plan into tasks with title, description, duration (in hours), and priority (low, medium, high). Return a JSON array ONLY.

Plan: ${plan}`,
        },
      ],
      temperature: 0.5,
    })

    const jsonText = aiResponse.choices[0]?.message?.content?.trim()

    const tasks = JSON.parse(jsonText)

    return tasks
  } catch (err) {
    console.error('OpenAI error:', err.message)
    throw err
  }
}
