import { useState } from "react";

import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useAuthStore()

    const handleLogin = (e) => {
        e.preventDefault();

        login({ email, password })

    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="btn-box">
                    <button type="submit" className="btn">Submit</button>
                    <Link className="btn" to={'/signup'}>Signup instead</Link>
                </div>
            </form>
        </div>
    );
}
