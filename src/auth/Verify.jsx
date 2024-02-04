import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Verify() {
    const [code, setCode] = useState("");
    const state = useParams();
    const [timer, setTimer] = useState(0);
    const element = useRef();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (state.email) {
            // Assuming state.email contains the email address
            if (!validateEmail(state.email)) {
                navigate("/login");
            }
        } else {
            navigate("/login");
        }
    }, [state.email, navigate]);

    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return emailPattern.test(email);
    }

    async function resend() {
        try {
            const response = await fetch(`http://localhost:8000/user/vresend/${state.email}`);
            const data = await response.json();

            console.log(data)
            element.current.innerHTML = data.message;
            if (data.message) {
                if (typeof data.message == "string") {
                    element.current.style.opacity = 1;
                    element.current.style.color = "red";
                    element.current.innerHTML = "Please wait.";
                    setTimer(parseInt(data.message.split(" ")[1], 10));
                    setTimeout(() => {
                        element.current.style.opacity = 0;
                    }, 3000);
                    setLoading(false);
                }
                else if (data.message.accepted) {
                    element.current.style.opacity = 1;
                    element.current.style.color = "green";
                    element.current.innerHTML = "Mail sent successfully" + JSON.stringify(data.message);
                    setTimeout(() => {
                        element.current.style.opacity = 0;
                    }, 3000);
                    setLoading(false);
                }

            }




        } catch (err) {
            console.log(err);
        }
    }

    async function fetchData() {
        setLoading(true);
        console.log(code.length)
        if (code.length > 3) {
            try {
                const response = await fetch(`http://192.168.1.8:8000/user/ver/${state.email}/${code}`);
                const data = await response.json();

                element.current.style.opacity = 1;
                element.current.style.color = data.message === "user is verified" ? "green" : "red";
                element.current.innerHTML = data.message;


                if (data.message.includes("verified")) { navigate("/login") }
                setTimeout(() => {
                    element.current.style.opacity = 0;


                }, 2000);
                setLoading(false)
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            element.current.style.opacity = 1;
            element.current.style.color = "red";
            element.current.innerHTML = "code required";
            setLoading(false);
            setTimeout(() => {
                element.current.style.opacity = 0;
            }, 3000);
        }
    }

    useEffect(() => {
        resend()
    }, [])
    useEffect(() => {

        let interval;
        if (timer > 1) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1000);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    return (
        <div className="ver">
            <h1>Verify email</h1>
            <p ref={element}></p>
            <p>Wait {(timer / 1000).toFixed(0)} seconds to resend</p>
            <p>Message is sent to {state.email}</p>
            <input
                placeholder="code here"
                value={code}
                maxLength={6}
                onChange={(event) => setCode(event.target.value)}
            />
            <button onClick={fetchData} disabled={loading}>
                {loading ? "Loading..." : "Submit"}
            </button>
            <button onClick={resend}>Resend</button>
        </div>
    );
}
