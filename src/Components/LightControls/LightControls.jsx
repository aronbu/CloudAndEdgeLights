import '../controls.css';
import '../switch.css';
import React, {useEffect, useState} from 'react';
import iro from '@jaames/iro';
import chroma from 'chroma-js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const LightControls = (props) => {
    const colorChange = props.setColor;
    const colorNavLightDark = props.setLightDarkMode;
    const [isTimerOnChecked, setIsTimerOnChecked] = useState(false);
    const [isTimerOffChecked, setIsTimerOffChecked] = useState(false);
    const [isLightsChecked, setIsLightsChecked] = useState(false);

    const [selectedDateOff, setSelectedDateOff] = useState(null);
    const [selectedDateOn, setSelectedDateOn] = useState(null);

    const [selectedOption, setSelectedOption] = useState('staticColor'); // Track selected option
    const [selectedOptionTimerOn, setSelectedOptionTimerOn] = useState('staticColor'); // Track selected option
    const [colorPickerColor, setColorPickerColor] = useState('#00ff00'); // Initial color

    const colorChangeTimer = (event) => {

    }
    const handleSelectedOptionTimerOnChange = (event) => {
        setSelectedOptionTimerOn(event.target.value);
    };

    const handleSelectedOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleDateOffChange = (date) => {
        setSelectedDateOff(date);
    };
    const handleDateOnChange = (date) => {
        setSelectedDateOn(date);
    };
    const handleTimerOnCheckboxChange = (event) => {
        setIsTimerOnChecked(event.target.checked);
    };

    const handleTimerOffCheckboxChange = (event) => {
        setIsTimerOffChecked(event.target.checked);
    };

    const handleLightsCheckboxChange = (event) => {
        setIsLightsChecked(event.target.checked);
    };
    useEffect(() => {
        const getColorFromAPI = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/get/currentLightMode');
                const data = await response.json();
                const { colors } = data;
                const { r, g, b } = colors[0];
                const color = `rgb(${r},${g},${b})`;
                console.log(color);


                const colorPicker = new iro.ColorPicker(".colorPicker", {
                    // color picker options
                    // Option guide: https://iro.js.org/guide.html#color-picker-options
                    width: 280,
                    color: color,
                    borderWidth: 1,
                    borderColor: '#fff',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    layout: [
                        {
                            component: iro.ui.Box,
                            options: {}
                        },
                        {
                            component: iro.ui.Slider,
                            options: {
                                sliderType: 'hue'
                            }
                        }
                    ],
                });
                const timerColorPicker =  new iro.ColorPicker(".colorPickerTimer", {
                    // color picker options
                    // Option guide: https://iro.js.org/guide.html#color-picker-options
                    width: 140,
                    color: 'rgb(255, 0, 0)',
                    borderWidth: 1,
                    borderColor: '#fff',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    layout: [
                        {
                            component: iro.ui.Box,
                            options: {}
                        },
                        {
                            component: iro.ui.Slider,
                            options: {
                                sliderType: 'hue'
                            }
                        }
                    ],
                    colors: [
                        'rgb(0, 100%, 0)'// pure green
                    ]
                });


                colorPicker.on(['color:init', 'color:change'], function (color) {
                    // Show the current color in different formats
                    // Using the selected color: https://iro.js.org/guide.html#selected-color-api
                    colorChange(color.hexString);

                    const isDark = chroma(color.hexString).luminance() < 0.045;
                    if (isDark) {
                        colorNavLightDark("dark");
                    }else{
                        colorNavLightDark("light");
                    }
                });

                timerColorPicker.on(['color:init', 'color:change'], function (color) {
                    // Show the current color in different formats
                    // Using the selected color: https://iro.js.org/guide.html#selected-color-api
                    colorChangeTimer(color.hexString);
                });


                // Cleanup function
                return (eventList, callback) => {
                    colorPicker.off(eventList, callback); // Remove event listeners


                    timerColorPicker.off(eventList, callback); // Remove event listeners

                };

            } catch (error) {
                console.log('Error fetching color from API:', error);
            }
        };

        getColorFromAPI();
    }, [colorChange, colorNavLightDark,colorPickerColor]);


    return(
        <div className="lightControlPanel">
            <div className="controlOption controlOptionBig">
                <div className="row">
                    <h2 className="optionName">Lights:</h2>
                    <label className="switch">
                        <input type="checkbox" className="lights"
                               checked={isLightsChecked}
                               onChange={handleLightsCheckboxChange}/>
                            <span className="slider"></span>
                    </label>
                </div>
                {isLightsChecked && (
                    <div className="row">
                        <p className="optionName2">LightMode:</p>

                        <div class="select">
                            <select value={selectedOption} onChange={handleSelectedOptionChange}>
                                <option value="staticColor">Static Color</option>
                                <option value="wave">Wave</option>
                                <option value="pulse">Pulse</option>
                                <option value="rainbow">Rainbow</option>
                            </select>
                    </div>
                    </div>

                )}
            </div>

            <div className={ selectedOption === 'rainbow' ? 'hidden controlOption controlOptionBig' : 'controlOption controlOptionBig'}>
                <h2 className="optionName">Color:</h2>
                    <div className="wrap">
                        <div className="half">
                            <div className="colorPicker"></div>
                        </div>

                    </div>
            </div>



            <div className="controlOption controlOptionBig">
                <div className="row">
                    <p className="optionName">Timer On:</p>
                    <label className="switch">
                        <input type="checkbox"
                               className="timer"
                               checked={isTimerOnChecked}
                               onChange={handleTimerOnCheckboxChange}/>
                        <span className="slider"></span>
                    </label>
                </div>
                <div className={ !isTimerOnChecked  ? 'hidden' : 'row'}>
                    <h2 className="optionName2">Time:</h2>
                    <div className="datetime-picker">
                        <DatePicker
                            selected={selectedDateOn}
                            onChange={handleDateOnChange}
                            showTimeInput
                            timeInputLabel="Time:"
                            dateFormat="MM/dd/yyyy HH:mm"
                            placeholderText="Select date and time"
                            className="custom-datepicker"
                            popperClassName="custom-datepicker-popper"
                            locale="en-gb"
                        />
                    </div>
                </div>
                <div className={ !isTimerOnChecked  ? 'hidden' : 'row'}>
                    <p className="optionName2">LightsMode:</p>
                    <div className="timerOnOptions">
                        <div class="select">
                            <select value={selectedOptionTimerOn} onChange={handleSelectedOptionTimerOnChange}>
                                <option value="staticColor">Static Color</option>
                                <option value="wave">Wave</option>
                                <option value="pulse">Pulse</option>
                                <option value="rainbow">Rainbow</option>
                            </select>
                        </div>
                        <div className="wrap">
                            <div className="half">
                                <div className="colorPickerTimer"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="controlOption controlOptionBig">
                <div className="row">
                    <h2 className="optionName">Timer Off:</h2>
                    <label className="switch">
                        <input type="checkbox"
                               className="timerOff"
                               checked={isTimerOffChecked}
                               onChange={handleTimerOffCheckboxChange}/>
                        <span className="slider"></span>
                    </label>
                </div>
                {isTimerOffChecked && (
                    <>
                        <div className="row">
                            <p className="optionName2">Time:</p>
                            <div className="datetime-picker">
                                <DatePicker
                                    selected={selectedDateOff}
                                    onChange={handleDateOffChange}
                                    showTimeInput
                                    timeInputLabel="Time:"
                                    dateFormat="MM/dd/yyyy HH:mm"
                                    placeholderText="Select date and time"
                                    className="custom-datepicker"
                                    popperClassName="custom-datepicker-popper"
                                    locale="en-gb"
                                />
                            </div>


                        </div>
                    </>
                )}

            </div>
        </div>
    );
}
export default LightControls