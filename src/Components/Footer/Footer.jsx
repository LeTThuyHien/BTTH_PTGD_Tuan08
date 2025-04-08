import './Footer.css';
import imglogo from "../../assets/images/Visily-logo.svg"
function Footer() {
    return (

        <footer className="footer">
            <p>Made with</p>
            <img className='f-logo' src={imglogo} alt="logo" />

        </footer>

    );
}

export default Footer;