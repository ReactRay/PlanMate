
import toast from "react-hot-toast"
import { useAuthStore } from "../store/useAuthStore"
import { UserProfile } from "../components/UserProfile"
import { useState } from "react"
export function HomePage() {

    const { authUser, logout } = useAuthStore()

    const [userInput, setUserInput] = useState('')


    function handleSubmit(e) {
        e.preventDefault()

        if (userInput === '') {
            return
        }


        console.log(userInput)

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

                <form onSubmit={handleSubmit}>
                    <div className="form-container-text">
                        <h2>tell the ai on what do you plan on doing and he will help you make an organized plan</h2>
                    </div>
                    <div className="text-area-container">
                        <textarea className="text-area-input" placeholder="what do you want to do today ?" id="text"
                            onChange={(e) => { setUserInput(e.target.value) }}
                        ></textarea>
                    </div>
                    <button className="btn" >lets do this!</button>
                </form>

            </main>

        </div>
    )
}