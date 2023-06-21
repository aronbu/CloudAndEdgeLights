import '../controls.css';
import '../switch.css';
import React, {useEffect, useState} from 'react';
import iro from '@jaames/iro';
import chroma from 'chroma-js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const LightControls = (props) => {
    const serverUrl="http://127.0.0.1:5000";
    const colorChange = props.setColor;
    const colorNavLightDark = props.setLightDarkMode;
    let [isTimerOnChecked, setIsTimerOnChecked] = useState(false);
    let [isTimerOffChecked, setIsTimerOffChecked] = useState(false);
    let [isLightsChecked, setIsLightsChecked] = useState(false);

    let [selectedDateOff, setSelectedDateOff] = useState(null);
    let [selectedDateOn, setSelectedDateOn] = useState(null);
    let [selectedTimerOnValid, setSelectedTimerOnValid] = useState(false); // Track selected option
    let [selectedTimerOffValid, setSelectedTimerOffValid] = useState(false); // Track selected option

    const [selectedOption, setSelectedOption] = useState("static"); // Track selected option
    let [selectedOptionTimerOn, setSelectedOptionTimerOn] = useState('static'); // Track selected option

    let [colorPickerColor, setColorPickerColor] = useState('{ r: 38, g: 172, b: 38 }'); // Initial color
    let [colorPickerColorTimerOn, setColorPickerColorTimerOn] = useState('{ r: 0, g: 255, b: 0 }'); // Initial color

    const handleSelectedOptionTimerOnChange = (event) => {
        setSelectedOptionTimerOn(event.target.value);
        postDataTimerOnActive(colorPickerColorTimerOn,selectedOptionTimerOn,selectedDateOn);
    };

    const handleSelectedOptionChange = (event) => {
        setSelectedOption(event.target.value);
        const { r, g, b } = colorPickerColor;

        let lightsStatusOn ="False";
        console.log(isLightsChecked);
        if(isLightsChecked){
            lightsStatusOn ="True";
        }

        const effect = event.target.value;
        const url = `${serverUrl}/publish/changeLights?effect=${effect}&r=${r}&g=${g}&b=${b}&lightsStatusOn=${lightsStatusOn}`;
        postData(url);
    };

    const handleDateOffChange = (date) => {
        const selectedDateTime = date instanceof Date ? date : new Date(date);
        setSelectedDateOff(date);

        const currentDate =new Date();
        if(!isTimerOnChecked||!selectedTimerOnValid){
            if (selectedDateTime > currentDate) {
                setSelectedTimerOffValid(true);
                postDataTimerOffActive(date);
            } else {
                setSelectedTimerOffValid(false);
                postDataTimerOffInactive();
            }
        }else{
            if(isLightsChecked && selectedTimerOnValid && selectedDateTime>currentDate && selectedDateOn>selectedDateTime){
                setSelectedTimerOffValid(true);
                postDataTimerOffActive(date);
            }else if(!isLightsChecked && selectedTimerOnValid && selectedDateTime>currentDate && selectedDateOn<selectedDateTime) {
                setSelectedTimerOffValid(true);
                postDataTimerOffActive(date);
            }else {
                setSelectedTimerOffValid(false);
                postDataTimerOffInactive();
            }
        }


    };
    const handleDateOnChange = (date) => {
        const selectedDateTime = date instanceof Date ? date : new Date(date)

        setSelectedDateOn(date);

        const currentDate =new Date();
        if(!isTimerOffChecked||!selectedTimerOffValid){
            if (selectedDateTime > currentDate) {
                setSelectedTimerOnValid(true);
                postDataTimerOnActive(colorPickerColorTimerOn,selectedOptionTimerOn,date);
            } else {
                setSelectedTimerOnValid(false);
                postDataTimerOnInactive();
            }
        }else {
            if (isLightsChecked && selectedTimerOffValid && selectedDateTime>currentDate && selectedDateOff<selectedDateTime) {
                setSelectedTimerOnValid(true);
                postDataTimerOnActive(colorPickerColorTimerOn,selectedOptionTimerOn,date);
            } else if(!isLightsChecked && selectedTimerOffValid && selectedDateTime>currentDate && selectedDateOff>selectedDateTime) {
                setSelectedTimerOnValid(true);
                postDataTimerOnActive(colorPickerColorTimerOn,selectedOptionTimerOn,date);
            }
            else {
                setSelectedTimerOnValid(false);
                postDataTimerOnInactive();
            }
        }


    };
    const handleTimerOnCheckboxChange = (event) => {
        if(event.target.checked&&isLightsChecked&&!selectedTimerOffValid){

        }else{
            setIsTimerOnChecked(event.target.checked);
            if(!event.target.checked&&!isLightsChecked){
                setIsTimerOffChecked(false);
                setSelectedDateOff(null);
                postDataTimerOffInactive();
            }
            if(!event.target.checked){
                setSelectedTimerOnValid(false);
                setSelectedDateOn(null);
                postDataTimerOnInactive();
            }
        }


    };

    const handleTimerOffCheckboxChange = (event) => {
        if(isLightsChecked||(isTimerOnChecked&selectedTimerOnValid)){
            setIsTimerOffChecked(event.target.checked);
        }
        if(!event.target.checked) {
            setSelectedTimerOffValid(false);
            setSelectedDateOff(null);
            postDataTimerOffInactive();
        }
        if(!event.target.checked&&(selectedDateOn>selectedDateOff)) {
            setSelectedTimerOnValid(false);
            setSelectedDateOn(null);
            setIsTimerOnChecked(false);
            postDataTimerOnInactive();
        }
    };

    const handleLightsCheckboxChange = (event) => {
        console.log(event.target.checked)
        let lightsStatusOn ="False";
        if(event.target.checked===true){
            setIsLightsChecked(true);
            lightsStatusOn ="True";
        }else{
            setIsLightsChecked(false);
        }

        if(!event.target.checked&&(isTimerOnChecked||selectedTimerOnValid)){
            setIsTimerOffChecked(false);
            setSelectedTimerOffValid(false);
            setSelectedDateOff(null);
            postDataTimerOffInactive();
        }

        if(event.target.checked&&isTimerOnChecked){
            setIsTimerOnChecked(false);
            setSelectedTimerOnValid(false);
            setSelectedDateOn(null);
            postDataTimerOnInactive();
        }

        const { r, g, b } = colorPickerColor;

        const effect = selectedOption;
        const url = `${serverUrl}/publish/changeLights?effect=${effect}&r=${r}&g=${g}&b=${b}&lightsStatusOn=${lightsStatusOn}`;
        postData(url);

    };
    const postDataFromColor = async (color, selectedOption) => {
        const { r, g, b } = color;
        var lightsStatusOn = "True";
        setIsLightsChecked(true);
        setColorPickerColor(color);
        const effect = selectedOption;
        const url = `${serverUrl}/publish/changeLights?effect=${effect}&r=${r}&g=${g}&b=${b}&lightsStatusOn=${lightsStatusOn}`;
        postData(url);
    };

    const postDataFromColorTimerOn = async (color, selectedOption,selectedTimerOnValid) => {
        const { r, g, b } = color;
        var timerOnActive = "True";
        console.log(color);
        if(selectedTimerOnValid){
            setColorPickerColorTimerOn(color);
            const effect = selectedOption;
            const dateOn = selectedDateOn;
            const dateOnFormatted = selectedDateOn.toISOString().slice(0, 16).replace("T", " ");
            const url = `${serverUrl}/publish/changeLights/timer/on?timerOnActive=${timerOnActive}&datetimeTimerOn=${dateOnFormatted}&effect=${effect}&r=${r}&g=${g}&b=${b}`;
            postData(url);
        }
    };

    const postDataTimerOnActive = async (color, selectedOption, dateOn) => {
        const { r, g, b } = color;
        var timerOnActive = "True";
        const effect = selectedOption;
        const dateOnFormatted = dateOn.toISOString().slice(0, 16).replace("T", " ");
        const url = `${serverUrl}/publish/changeLights/timer/on?timerOnActive=${timerOnActive}&datetimeTimerOn=${dateOnFormatted}&effect=${effect}&r=${r}&g=${g}&b=${b}`;
        postData(url);
    };

    const postDataTimerOnInactive = async () => {
        var timerOnInactive = "False";
        const url = `${serverUrl}/publish/changeLights/timer/on?timerOnActive=${timerOnInactive}`;
        postData(url);
    };

    const postDataTimerOffActive = async (dateOff) => {
        var timerOffActive = "True";
        const url = `${serverUrl}/publish/changeLights/timer/on?timerOnActive=${timerOffActive}&datetimeTimerOff=${dateOff}`;
        postData(url);
    };

    const postDataTimerOffInactive = async () => {
        var timerOffInactive = "False";
        const url = `${serverUrl}/publish/changeLights/timer/on?timerOnActive=${timerOffInactive}`;
        postData(url);
    };

    const postData = async (url) => {
        console.log(url)
        try {
            const response = await fetch(url, { method: 'POST' });
            if (response.ok) {
                console.log('POST request successful');
            } else {
                console.log('POST request failed');
            }
        } catch (error) {
            console.log('Error during POST request:', error);
        }
    };

    useEffect(() => {
        const getColorFromAPI = async () => {
            try {
                const response = await fetch(`${serverUrl}/get/currentLightMode`);
                const data = await response.json();
                const { lightStatusOn } = data;
                const { colors } = data;
                const { effect } = data;
                console.log(lightStatusOn);
                if(lightStatusOn==="True"){
                    setIsLightsChecked(true);
                }else {
                    setIsLightsChecked(false);
                }
                setSelectedOption(effect);
                console.log(selectedOption);
                const { r, g, b } = colors[0];
                const color = `rgb(${r},${g},${b})`;
                setColorPickerColor(color);
                console.log(color);

                const colorPickerContainer = document.querySelector('.colorPicker');
                if (colorPickerContainer) {
                    colorPickerContainer.innerHTML = ''; // Clear the color picker container
                }

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

                const timerColorPickerContainer = document.querySelector('.colorPickerTimer');
                if (timerColorPickerContainer) {
                    timerColorPickerContainer.innerHTML = ''; // Clear the color picker container
                }
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

                });
                colorPicker.on(['color:change'], function (color) {

                    postDataFromColor(color.rgb, selectedOption);
                    setSelectedOption(selectedOption);
                    const isDark = chroma(color.hexString).luminance() < 0.045;
                    if (isDark) {
                        colorNavLightDark("dark");
                    }else {
                        colorNavLightDark("light");
                    }
                });

                timerColorPicker.on(['color:init', 'color:change'], function (color) {
                    // Show the current color in different formats
                    // Using the selected color: https://iro.js.org/guide.html#selected-color-api

                    postDataFromColorTimerOn(color.rgb, selectedOption,selectedTimerOnValid);
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
    }, [selectedOption,selectedTimerOnValid]);

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
                                <option value="static">Static Color</option>
                                <option value="wave">Wave</option>
                                <option value="pulse">Pulse</option>
                                <option value="rainbow">Rainbow</option>
                                <option value="auto">Auto</option>
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
                            className={selectedTimerOnValid ? 'custom-datepicker' : 'custom-datepicker invalid'}
                            popperClassName="custom-datepicker-popper"
                        />
                    </div>
                </div>
                <div className={ !isTimerOnChecked  ? 'hidden' : 'row'}>
                    <p className="optionName2">LightsMode:</p>
                    <div className="timerOnOptions">
                        <div class="select">
                            <select value={selectedOptionTimerOn} onChange={handleSelectedOptionTimerOnChange}>
                                <option value="static">Static Color</option>
                                <option value="wave">Wave</option>
                                <option value="pulse">Pulse</option>
                                <option value="rainbow">Rainbow</option>
                                <option value="auto">Auto</option>
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
                                    className={selectedTimerOffValid ? 'custom-datepicker' : 'custom-datepicker invalid'}
                                    popperClassName="custom-datepicker-popper"
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