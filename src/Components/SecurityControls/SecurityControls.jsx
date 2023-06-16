import '../controls.css';
import '../switch.css';
import React, {useState} from 'react';
import 'react-datepicker/dist/react-datepicker.css';

const SecurityControls = (props) => {
    const [isAlarmChecked, setIsAlarmChecked] = useState(false);
    const [isStormModeChecked, setIsStormModeChecked] = useState(false);

    const handleAlarmCheckboxChange = (event) => {
        setIsAlarmChecked(event.target.checked);
    };
    const handleStormModeCheckboxChange = (event) => {
        setIsStormModeChecked(event.target.checked);
    };
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
                        <select>
                            <option value="mdls">Motion Detection: Lights and Sounds</option>
                            <option value="mdl">Motion Detection: Lights</option>
                            <option value="msdls">Motion and Sound Detection: Lights and Sounds</option>
                            <option value="msdl">Motion and Sound Detection: Lights</option>
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
                            <select>
                                <option value="lfn">Turn lights off + Notification</option>
                                <option value="n">Notification Only</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default SecurityControls