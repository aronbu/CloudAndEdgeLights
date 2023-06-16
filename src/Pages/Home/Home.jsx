import './home.css';
import '../../reset.css';
import  LightControls from '../../Components/LightControls/LightControls';
import Navbar from "../../Components/Navbar/Navbar";
import {useState} from "react";

const Home = () => {
    const [color, setColor] = useState('#258625'); // Set initial color to white (#FFFFFF)
    const [lightDarkMode, setLightDarkMode] = useState('light'); // Set initial color to white (#FFFFFF)
    return(
        <>
            <Navbar color={color} lightDarkMode={lightDarkMode}/>
            <div className="content">
                <LightControls setColor={setColor} setLightDarkMode={setLightDarkMode}/>
            </div>
        </>
    )
}
export default Home