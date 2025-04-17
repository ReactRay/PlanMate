
import { Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useEffect } from "react"
import { useAuthStore } from "./store/useAuthStore"
import { LandingPage } from "./pages/LandingPage"
import { Signup } from "./pages/Signup"
import { Login } from "./pages/Login"
import { HomePage } from "./pages/HomePage"
import { Navbar } from "./components/Navbar"

function App() {



  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()


  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser)
    return (<div>Loading...</div>)

  return (
    < div className="main-container">
      <Navbar />
      <Routes>
        <Route path="/" element={!authUser ? <LandingPage /> : <Navigate to="/home" />} />
        <Route path="/home" element={authUser ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />

      </Routes>

      <Toaster />

    </div >
  )
}

export default App
