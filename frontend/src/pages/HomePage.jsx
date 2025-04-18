
import toast from "react-hot-toast"
import { useAuthStore } from "../store/useAuthStore"
import { UserProfile } from "../components/UserProfile"
import { useState } from "react"
import { checkArrays } from "../lib/utils"
import { Kanban } from '../components/Kanban'

export function HomePage() {

    const { authUser, logout, getUserPlan } = useAuthStore()

    const [userInput, setUserInput] = useState('')


    async function handleSubmit(e) {
        e.preventDefault()

        if (!userInput.trim()) {
            toast.error('Please enter your plan first!')
            return
        }

        await getUserPlan(authUser._id, userInput)
        console.log('Updated user:', useAuthStore.getState().authUser)

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
                {!checkArrays(authUser) &&
                    <form onSubmit={handleSubmit}>
                        <div className="form-container-text">
                            <h2>tell the ai on what do you plan on doing and he will help you make an organized plan</h2>
                        </div>
                        <div className="text-area-container">
                            <textarea className="text-area-input" placeholder="what do you want to do today ?" id="text"
                                onChange={(e) => { setUserInput(e.target.value) }}
                            ></textarea>
                        </div>
                        <div className="btn-box">
                            {<button className="btn" type="submit">lets do this!</button>}
                            <button className="btn" >reset</button>

                        </div>
                    </form>}
                {checkArrays(authUser) && <Kanban authUser={authUser} />}

            </main>

        </div>
    )
}