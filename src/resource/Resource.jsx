import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import "../styles/resource.css"
import { Outlet } from "react-router-dom"
export default function Resource() {
    return (<div className="resource">
        <Navbar />
        <div className="res-grid">
            <Sidebar />
            <Outlet />
        </div>
    </div>)
}