import './navbar.css'
import {Link, NavLink} from "react-router-dom";
import Logo from '../../Assets/Logo/LogoBuffaloLights.svg'
import {FaUserShield} from "react-icons/fa";
import {MdLightbulbOutline} from "react-icons/md";
import { ReactSVG } from 'react-svg';

const Navbar = (props) => {

    return(

        <div className="navbar1">
            <nav>
                <div className={props.lightDarkMode === 'light' ? 'container nav_container light' : 'container nav_container dark'}>
                    <Link to="/" className='logo'>
                        <ReactSVG className="color-logo" src={Logo}  alt="Nav Logo"/>
                    </Link>
                    <ul className="nav_links">
                        <li>
                            <NavLink to="/" className="menuItem"><h2 className="text">Lights</h2><MdLightbulbOutline/></NavLink>
                        </li>
                        <li>
                            <NavLink to="/" className="menuItem"><h2 className="text">Security</h2><FaUserShield/></NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
<style>{`
    .color-logo svg{
        fill: ${props.color};
}
.navbar1 .nav_container .nav_links li a{
    color: ${props.color};
    }
`}
</style>
        </div>

    )
}
export default Navbar