import '../controls.css';
import '../switch.css';
import React, {useEffect, useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';


const SecurityControls = (props) => {
    const serverUrl = "http://192.168.8.108:5000";

    const colorChange = props.setColor;

    const [isAlarmChecked, setIsAlarmChecked] = useState(false);
    const [alarmSelectedOption, setAlarmSelectedOption] = useState("MotionDetectionLightAndSound");
    const [isStormModeChecked, setIsStormModeChecked] = useState(false);
    const [stormDetectionSelectedOption, setStormDetectionSelectedOption] = useState(null);

    const handleAlarmCheckboxChange = (event) => {
        setIsAlarmChecked(event.target.checked);
        if(event.target.checked){
            colorChange("#a42929");
        }else{
            colorChange("#258625");
        }
    };
    const handleStormModeCheckboxChange = (event) => {
        setIsStormModeChecked(event.target.checked);
    };

    const handleAlarmSelectedOptionChange = (event) => {
        setAlarmSelectedOption(event.target.value);

    };

    const handleStormDetectionSelectedOptionChange = (event) => {
        setStormDetectionSelectedOption(event.target.value);

    };

    useEffect(() => {
        const getColorFromAPI = async () => {
            try {
                const response = await fetch(`${serverUrl}/get/currentSecurity`);
                const data = await response.json();
                const { stormDetectionStatusOn } = data;
                const { stormDetectionMode } = data;
                const { alarmStatusOn } = data;
                const { alarmMode } = data;

                setAlarmSelectedOption(alarmMode);
                setStormDetectionSelectedOption(stormDetectionMode);
                if(stormDetectionStatusOn==="True"){
                    setIsStormModeChecked(true);
                }
                if(alarmStatusOn==="True"){
                    setIsAlarmChecked(true);
                }



            } catch (error) {
                console.log('Error fetching color from API:', error);
            }
        };

        getColorFromAPI();

    }, []);
    return(
        <div className="lightControlPanel">
            <div className="controlOption controlOptionBig">
                <div className="row">
                    <h2 className="optionName">Alarm:</h2>
                    <label className="switch">
                        <input type="checkbox" className="lights"
                               checked={isAlarmChecked}
                               onChange={handleAlarmCheckboxChange}/>
                        <span className="slider"></span>
                    </label>
                </div>
                {isAlarmChecked && (
                <div className="row">
                    <p className="optionName2">AlarmMode:</p>
                    <div class="select wide">
                        <select value={alarmSelectedOption} onChange={handleAlarmSelectedOptionChange}>
                            <option value="MotionDetectionLightAndSound">Motion Detection: Lights and Sounds</option>
                            <option value="MotionDetectionLight">Motion Detection: Lights</option>
                            <option value="MotionSoundDetectionLightAndSound">Motion and Sound Detection: Lights and Sounds</option>
                            <option value="MotionSoundDetectionLight">Motion and Sound Detection: Lights</option>
                        </select>
                    </div>
                </div>
                )}
            </div>

            <div className="controlOption controlOptionBig">
                <div className="row">
                    <h2 className="optionName">Storm Detection:</h2>
                    <label className="switch">
                        <input type="checkbox" className="lights"
                               checked={isStormModeChecked}
                               onChange={handleStormModeCheckboxChange}/>
                        <span className="slider"></span>
                    </label>
                </div>
                {isStormModeChecked && (
                    <div className="row">
                        <p className="optionName2">StormMode:</p>
                        <div class="select wide">
                            <select value={stormDetectionSelectedOption} onChange={handleStormDetectionSelectedOptionChange}>
                                <option value="LightsAndNotification">Turn lights off + Notification</option>
                                <option value="NotificationOnly">Notification Only</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default SecurityControls