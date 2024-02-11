import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Upload() {
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(null);
    const [token, setToken] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        const form = new FormData();
        form.append("video", selectedFile);
        fetchData(form);
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        setFile(droppedFile);
        const form = new FormData();
        form.append("video", droppedFile);
        fetchData(form);
    };

    async function fetchData(form) {
        try {
            setLoading(true)
            const response = await fetch(`http://localhost:8000/resource/${email}/video`, {
                method: "post",
                headers: {
                    "Authorization": "Bearer " + token
                },
                body: form
            });
            const data = await response.json();
            console.log(data)
            setLoading(false)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const parsedToken = JSON.parse(storedToken);
            setEmail(parsedToken.email);
            setToken(parsedToken.token);
        } else {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        if (file) {
            fetchData(new FormData());
        }
    }, [file]);

    return (
        <div className="upload">
            <div className="drop-box" onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
                {loading ? (
                    <div>
                        <h1>Loading...</h1>
                    </div>
                ) : (
                    <>
                        <img
                            src="/icons8-upload-100.png"
                            alt="Upload Icon"
                        />
                        <h1>
                            Drag & Drop to Upload File <br /> OR
                        </h1>
                    </>
                )}

                <input
                    disabled={loading}
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
                <button onClick={handleClick}>
                    Select File
                </button>
            </div>
        </div>
    );
}
