import images from "../../assets/images/logo.png";
import imgGroup from "../../assets/images/group.png";

import "./Sidebar.css";
import Menu from "./Menu/Menu";
import MenuItem from "./Menu/MenuItem";
import { FaChartPie, FaCode, FaFolder, FaLayerGroup } from "react-icons/fa";
import { FaMessage, FaPeopleGroup } from "react-icons/fa6";
function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="img-logo">
                <img src={images} alt="logo" />
               
            </div>
            <Menu>
                        <MenuItem title="Dashboard" to="/" icon={<FaLayerGroup />} />
                        <MenuItem title="Projects" to="/projects" icon={<FaFolder />} />
                        <MenuItem title="Teams" to="/teams" icon={<FaPeopleGroup />} />
                        <MenuItem title="Analytics" to="/analytics" icon={<FaChartPie />} />
                        <MenuItem title="Messages" to="/messages" icon={<FaMessage />} />
                        <MenuItem title="Integration" to="/integration" icon={<FaCode />} />
                    </Menu>

            <div className="img-group">
                <img src={imgGroup} alt="group" />
                <div className="btn-trynow">
                    <button>Try now</button>
                </div>
            </div>



        </aside>

    );
}

export default Sidebar;