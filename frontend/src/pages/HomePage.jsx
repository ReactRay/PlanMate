import toast from "react-hot-toast"
import { useAuthStore } from "../store/useAuthStore"
import { UserProfile } from "../components/UserProfile"
import { useState, useMemo } from "react"
import { checkArrays } from "../lib/utils"
import { Kanban } from '../components/Kanban'

export function HomePage({ authUser }) {
    const isCheckingAuth = useAuthStore((s) => s.isCheckingAuth)
    const getUserPlan = useAuthStore((s) => s.getUserPlan)
    const [userInput, setUserInput] = useState("")

    const hasList = useMemo(() => checkArrays(authUser), [authUser])

    if (isCheckingAuth || !authUser) return <div>Loading...</div>

    async function handleSubmit(e) {
        e.preventDefault()

        if (!userInput.trim()) {
            toast.error("Please enter your plan first!")
            return
        }

        await getUserPlan(authUser._id, userInput)
        setUserInput('')
    }

    return (
        <div className="home-container">
            <header className="home-header">
                <div className="user-info">
                    <UserProfile />
                </div>
            </header>

            <main>
                {!hasList ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-container-text">
                            <h2>
                                Tell the AI what you plan on doing and it will help you create an organized plan.
                            </h2>
                        </div>
                        <div className="text-area-container">
                            <textarea
                                className="text-area-input"
                                placeholder="What do you want to do today?"
                                onChange={(e) => setUserInput(e.target.value)}
                            />
                        </div>
                        <div className="btn-box">
                            <button className="btn" type="submit">Let's do this!</button>
                            <button className="btn" type="button" onClick={() => setUserInput('')}>Reset</button>
                        </div>
                    </form>
                ) : (
                    <Kanban authUser={authUser} />
                )}
            </main>
        </div>
    )
}
