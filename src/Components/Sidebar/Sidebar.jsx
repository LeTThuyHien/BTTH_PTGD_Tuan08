import img from "../../assets/img/logo.png";
import "./Sidebar.css";
function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="img-logo">
                <img src={img} alt="logo" />
            </div>
        </aside>

    );
}

export default Sidebar;