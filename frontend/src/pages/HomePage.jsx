
import toast from "react-hot-toast"
import { useAuthStore } from "../store/useAuthStore"

export function HomePage() {

    const { authUser, logout } = useAuthStore()

    console.log(authUser)
    return (
        <div className="home-container">
            <header className="home-header">
                <div className="user-info">

                </div>

                <div className="edit-profile">

                </div>
            </header>

            <main>

                <form className="home-form">
                    <div>
                        <h2>tell the ai on what do you plan on doing and he will help you make an organized plan</h2>
                    </div>
                    <div className="text-area-container">
                        <textarea id="text"></textarea>
                    </div>
                </form>

            </main>

            <button className="btn" onClick={logout}> logout</button>
        </div>
    )
}