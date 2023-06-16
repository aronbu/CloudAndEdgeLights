import './navbar.css'
import { Link, NavLink } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { MdLightbulbOutline } from "react-icons/md";
import { ReactSVG } from 'react-svg';
import Logo from '../../Assets/Logo/LogoBuffaloLights.svg';

const Navbar = (props) => {
    return (
        <div className="navbar1">
            <nav>
                <div className={`container nav_container ${props.lightDarkMode === 'light' ? 'light' : 'dark'}`}>
                    <Link to="/" className="logo">
                        <ReactSVG className="color-logo" src={Logo} alt="Nav Logo" />
                    </Link>
                    <ul className="nav_links">
                        <li>
                            <NavLink to="/" className="menuItem">
                                <span className="text">Lights</span>
                                <MdLightbulbOutline />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/security" className="menuItem">
                                <span className="text">Security</span>
                                <FaUserShield />
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
            <style>{`
        .color-logo svg {
          fill: ${props.color};
        }
        .navbar1 .nav_container .nav_links li a {
          color: ${props.color};
        }
      `}</style>
        </div>
    );
};

export default Navbar;
