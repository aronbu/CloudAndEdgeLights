import './home.css';
import  LightControls from '../../Components/LightControls/LightControls';
import Navbar from "../../Components/Navbar/Navbar";
import {useState} from "react";

const Home = () => {
    const [color, setColor] = useState('#00FF00'); // Set initial color to white (#FFFFFF)
    return(
        <>
            <Navbar color={color}/>
            <div className="content">
                <LightControls setColor={setColor}/>
            </div>
        </>
    )
}
export default Home