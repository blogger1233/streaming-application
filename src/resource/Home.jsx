import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Images from "./Images";
export default function Home() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState("")
    async function fetchData(token, email) {
        setLoading(true)
        try {
            const response = await fetch(`http://localhost:8000/resource/${email}/video/${page}`, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            const data = await response.json();

            if (data.message && data.message.includes("unauthorized")) {
                localStorage.removeItem("token")
                setLoading(false)
            }
            else if (Array.isArray(data)) {
                console.log(data)
                if (page == 0) {

                    setData(prev => [...prev, ...data])
                }
                setLoading(false)
            }
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (localStorage.getItem("token")) {
            const token = JSON.parse(localStorage.getItem("token")).token
            const email = JSON.parse(localStorage.getItem("token")).email;
            if (token) {
                fetchData(token, email);
            }
            else {
                localStorage.removeItem("token")
                navigate("/login")
            }
        }
        else {
            navigate("/login")
        }

    }, [])
    return (<div className="home">
        {loading ? <p>loading...</p> : ""}
        {data.length > 0 ?
            data.map((value, index) => {
                return <Images props={value} key={index} />
            })
            : <span></span>}
    </div>)
}