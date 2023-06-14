import './lightControls.css';
import './switch.css';
import React, { useEffect } from 'react';
import iro from '@jaames/iro';

const LightControls = (props) => {

const colorChange = props.setColor;
    useEffect(() => {
        const colorPicker = new iro.ColorPicker(".colorPicker", {
            // color picker options
            // Option guide: https://iro.js.org/guide.html#color-picker-options
            width: 280,
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

        const values = document.getElementById('values');

        colorPicker.on(['color:init', 'color:change'], function (color) {
            // Show the current color in different formats
            // Using the selected color: https://iro.js.org/guide.html#selected-color-api
            values.innerHTML = [
                'hex: ' + color.hexString,
            ].join('<br>');
            colorChange(color.hexString);

        });



        // Cleanup function
        return () => {
            colorPicker.off(); // Remove event listeners
            colorPicker.removeAllListeners();
            colorPicker.destroy(); // Clean up the color picker instance
        };
    }, [colorChange]);

    return(
        <div className="lightControlPanel">
            <div className="controlOption">
                <p className="optionName">Lights:</p>
                <label className="switch">
                    <input type="checkbox"/>
                        <span className="slider"></span>
                </label>
            </div>

            <div className="controlOption">
                <p className="optionName">Lights:</p>
                <label className="switch">
                    <input type="checkbox"/>
                    <span className="slider"></span>
                </label>
            </div>

            <div className="controlOption controlOptionBig">
                <p className="optionName">Color:</p>
                    <div className="wrap">
                        <div className="half">
                            <div className="colorPicker"></div>
                        </div>
                        <div className="half readout">
                            <span className="title">Selected Color:</span>
                            <div id="values"></div>
                        </div>
                    </div>
            </div>
        </div>
    );
}
export default LightControls