import './security.css';
import '../../reset.css';
import  SecurityControls from '../../Components/SecurityControls/SecurityControls';
import Navbar from "../../Components/Navbar/Navbar";
import {useState} from "react";

const Security = () => {
    const [color, setColor] = useState('#00FF00'); // Set initial color to white (#FFFFFF)
    const [lightDarkMode] = useState('light'); // Set initial color to white (#FFFFFF)
    return(
        <>
            <Navbar color={color} lightDarkMode={lightDarkMode}/>
            <div className="content">
                <SecurityControls/>
            </div>
        </>
    )
}
export default Security