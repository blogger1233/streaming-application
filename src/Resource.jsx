import "./styles/resource.css"
import SideBar from "./Sidebar"
import { Outlet } from "react-router-dom"
export default function Resource() {
    return (<div className="resource">
        <SideBar />
        <Outlet />
    </div>)
}