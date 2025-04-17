
import { Link } from 'react-router-dom'



export function LandingPage() {

    return (

        <header className="header">
            <div className="header__logo-box">
                <img src="logo.png" alt="tasks" />
            </div>

            <div className="header__hero-box">
                <h1><span className="header__hero-box-primary">planmate</span> <span className="header__hero-box-secondary">let me do it for you </span></h1>

                <div className="header__btn-box">
                    <Link className='btn' to={'/login'}>Login</Link>
                    <Link className='btn' to={'/sign-up'}>Sign Up</Link>
                </div>
            </div>



        </header>

    )
}

