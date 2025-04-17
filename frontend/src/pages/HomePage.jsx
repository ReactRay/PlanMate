
import toast from "react-hot-toast"
import { useAuthStore } from "../store/useAuthStore"

export function HomePage() {

    const { authUser, logout } = useAuthStore()

    return (
        <div className="home-container">
            <header className="home-header">
                <div className="user-info">

                </div>

                <div className="edit-profile">

                </div>
            </header>

            <main>

                <form >
                    <div className="form-container-text">
                        <h2>tell the ai on what do you plan on doing and he will help you make an organized plan</h2>
                    </div>
                    <div className="text-area-container">
                        <textarea className="text-area-input" placeholder="what do you want to do today ?" id="text"></textarea>
                    </div>
                    <button className="btn">lets do this!</button>
                </form>

            </main>

        </div>
    )
}