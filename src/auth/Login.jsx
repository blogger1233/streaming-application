import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState();
    const [message, setMessage] = useState("")
    const [checked, setCheck] = useState(false)
    const element = useRef();
    const fetchData = async () => {
        setLoading(true)
        try {
            if (email === "") {
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
                element.current.style.opacity = 1;
                element.current.style.color = "red"
                element.current.innerHTML = 'password required'
                setLoading(false)
                setTimeout(() => {
                    element.current.style.opacity = 0;
                }, 3000)
                return;
            }
            const response = await fetch("http://192.168.1.8:8000/login", {
                method: "post",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const data = await response.json();
            if (data.token) {
                element.current.style.color = "green"
                element.current.style.opacity = 1;
                localStorage.setItem("token", JSON.stringify(data))
                element.current.innerHTML = "user Logged in successfully"
                setToken(data)
                setLoading(false)
                setTimeout(() => {
                    element.current.style.opacity = 0;
                }, 3000)
            }
            else {
                element.current.style.color = "red"
                element.current.style.opacity = 1;
                setMessage(data.message)
                element.current.innerHTML = data.message;
                setLoading(false)
                if (data.message.includes("not verfied")) {
                    navigate("/verify/" + email)
                }
                setTimeout(() => {
                    element.current.style.opacity = 0;
                }, 3000)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/resource")
        }
    }, [token])
    return (<div className="login-page">


        <h1>
            Login Page#
        </h1>
        <div className="form">
            <img
                src="/icons8-account-100.png"
            />
            <h2>Log In</h2>
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
            <button
                onClick={fetchData}
                disabled={loading}
            >
                {loading ? "Loading..." : "login"}
            </button>

            <p className="extra-para">
                New user? <Link to="/signup">Signup</Link>
            </p>
            <p className="message" ref={element}>
                {message}
            </p>
        </div>
    </div>)
}