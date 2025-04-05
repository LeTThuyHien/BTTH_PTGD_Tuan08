import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import "./Menu.css";
function MenuItem({ title, to, icon }) {
    return (
        <NavLink to={to} className={(nav) => nav.isActive ? "menu-item active" : "menu-item "}>
            {icon}
            <span className="menu-title">{title}</span>
        </NavLink>

    );

}
MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
};

export default MenuItem;