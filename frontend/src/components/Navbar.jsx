
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"


export function Navbar() {

    const { authUser, logout } = useAuthStore()

    return (
        <nav>
            <div className="logo">
                <Link to={'/'}>
                    <img src="logo.png" alt="" />
                </Link>
            </div>
            <div className="nav-list">
                <ul>
                    <li >
                        {!authUser && <Link to={'/'} className="btn ">
                            Home
                        </Link>}
                    </li>
                    {
                        authUser && (<>

                            <li onClick={logout}>
                                <Link className="btn">Log out </Link>
                            </li>
                        </>
                        )
                    }
                </ul>
            </div>
        </nav>
    )
}