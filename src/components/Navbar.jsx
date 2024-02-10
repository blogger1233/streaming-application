import { Link } from "react-router-dom"
import "../styles/navbar.css"

export default function Navbar() {


    return (<div className="navbar">
        <button className="menu-bar">
            <img src="/icons8-menu-bar-100.png" alt="" />
        </button>
        <Link className="logo">
            #App_name
        </Link>
        <input
            className="text-input"
            type="text"
            placeholder="Search here..."
        />
        <button className="search-button">
            <img
                src="/public/icons8-search-100.png"
            />
        </button>
        <Link id="pfp">
            <img

                src="/public/logo_frontend.png"
            />
        </Link>
    </div>)
}