import { useState } from "react";
import { Link } from 'react-router-dom'
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
export function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const { signup } = useAuthStore()

    const handleSignup = (e) => {
        e.preventDefault();
        console.log("Signing up with:", fullName, email, password);

        const userToSave = { fullName, email, password }

        signup(userToSave)
        toast.sucess('you sign up successfully')

    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a password"
                        required
                    />
                </div>
                <div className="btn-box">
                    <button type="submit" className="btn">Submit</button>
                    <Link className="btn" to={'/login'}>Login instead</Link>
                </div>

            </form>
        </div>
    );
}
