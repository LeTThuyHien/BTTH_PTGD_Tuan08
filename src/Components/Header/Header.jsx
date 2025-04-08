import { FaBell, FaQuestion, FaSearch } from "react-icons/fa";
import "./Header.css";
import imgs from "../../assets/images/avt.png"
function Header() {
    const Titles = {
        '/': 'Dashboard',
        '/projects': 'Project',
        '/teams': 'Teams',
        '/analytics': 'Analytics',
        '/messages': 'Messages',
        '/integration': 'Integrations',
    };

    // Lấy tên trang dựa trên đường dẫn hiện tại
    const pageTiles = Titles[location.pathname] || 'Trang không biết';

    return (
        <header className='header'>
            <div className="title-page">
                <h1>{pageTiles}</h1>
            </div>
            <div className="item-page">
                <div className="item-search">
                    <FaSearch />
                    <input type="text" id="searchInput" placeholder="Search..." />
                </div>
                <FaBell />
                <FaQuestion />
                <div className="img-admin">
                    <img src={imgs} alt="avt" />
                </div>
            </div>
        </header>

    );
}

export default Header;