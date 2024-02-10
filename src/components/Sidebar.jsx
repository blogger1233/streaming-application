import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();

    const isActive = (link) => {
        return link === location.pathname ? { backgroundColor: "blue", color: "white" } : {};
    };

    return (
        <div className="sidebar">
            <Link to="/resource/home" style={isActive("/resource/home")}>
                Home
            </Link>
            <Link to="/resource/yourvideo" style={isActive("/resource/yourvideo")}>
                Your video
            </Link>
            <Link to="/resource/upload" style={isActive("/resource/upload")}>
                Upload video
            </Link>
            <Link to="/resource/likedvideo" style={isActive("/resource/likedvideo")}>
                Liked video
            </Link>
        </div>
    );
}
