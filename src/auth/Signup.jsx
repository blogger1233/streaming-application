import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
export default function Signup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message] = useState("")
    const [checked, setCheck] = useState(false)
    const element = useRef();
    const fetchData = async () => {
        setLoading(true)
        try {
            if (!email) {
                element.current.style.opacity = 1;
                element.current.style.color = "red"
                element.current.innerHTML = 'email required'
                setLoading(false)
                setTimeout(() => {
                    element.current.style.opacity = 0;
                }, 3000)
                return;

            }
            if (!password) {
                setLoading(false)
                element.current.style.opacity = 1;
                element.current.style.color = "red"
                element.current.innerHTML = 'password required'
                setTimeout(() => {
                    element.current.style.opacity = 0;
                }, 3000)
                return;
            }
            if (password != confirmPassword) {
                setLoading(false)
                element.current.style.opacity = 1;
                element.current.style.color = "red"
                element.current.innerHTML = 'password does not match'
                setTimeout(() => {
                    element.current.style.opacity = 0;
                }, 3000)
                return;
            }
            const response = await fetch("http://192.168.1.8:8000/user/registration", {
                method: "post",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword
                })
            })
            const data = await response.json();
            if (data.response) {

                if (data.response.acknowledged) {
                    setLoading(false)
                    element.current.style.opacity = 1;
                    element.current.style.color = "green"
                    element.current.innerHTML = "user registered succesfully"
                    setTimeout(() => {
                        element.current.style.opacity = 0;
                        navigate("/verify/" + email)
                    }, 3000)
                    return;
                }
            }
            if (data.message) {
                setLoading(false)
                element.current.style.opacity = 1;
                element.current.style.color = "red"
                element.current.innerHTML = data.message
                setTimeout(() => {
                    element.current.style.opacity = 0;
                }, 3000)
                return;
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (<div className="login-page">
        <h1>
            Signup Page#
        </h1>
        <div className="form">
            <img
                src="/icon-signup.svg"
            />
            <h2>sign In</h2>
            <input
                maxLength={30}
                type="email"
                value={email}
                onChange={(event) => { setEmail(event.target.value) }}
                placeholder="email"
            />
            <input
                maxLength={30}
                type={checked ? "text" : "password"}
                value={password}
                onChange={(event) => { setPassword(event.target.value) }}
                placeholder="password"
            />
            <p className="show-password">
                <input type="checkbox"
                    checked={checked}
                    onChange={() => { setCheck(prev => !prev) }}
                />
                Show password
            </p>
            <input
                maxLength={30}
                type="text"
                value={confirmPassword}
                onChange={(event) => { setConfirmPassword(event.target.value) }}
                placeholder="confirm password"
            />
            <button
                onClick={fetchData}
                disabled={loading}
            >
                {loading ? "Loading..." : "Sign up"}
            </button>
            <p className="extra-para">
                Already registered <Link to="/login">Login</Link>
            </p>

            <p className="message" ref={element}>
                {message}
            </p>
        </div>
    </div>)
}