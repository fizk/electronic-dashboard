import React, {useState, ChangeEvent} from "react";
import { LabelInput } from "../elements/Form";
import './CapacitorConverter.css';

export default function CapacitorConverter () {
                                //        p  n  u  F
    const [values, setValues] = useState(['0', '0', '0', '0'])

    const handlePico = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        if (value === '0' || value === '') {
            setValues(['','','','',]);
            return;
        };
        setValues([
            value,
            String(parseFloat(value) * 0.001),
            String(parseFloat(value) * 0.000001),
            String(parseFloat(value) * (Math.pow(10, -12))),
        ]);
    };

    const handleNano = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        if (value === '0' || value === '') {
            setValues(['','','','',]);
            return;
        };
        setValues([
            String(parseFloat(value) * 1000),
            value,
            String(parseFloat(value) * 0.001),
            String(parseFloat(value) * (Math.pow(10, -9))),
        ]);
    };

    const handleMicro = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        if (value === '0' || value === '') {
            setValues(['','','','',]);
            return;
        };
        setValues([
            String(parseFloat(value) * 1000000),
            String(parseFloat(value) * 1000),
            value,
            String(parseFloat(value) * 0.000001),
        ]);
    };
    
    const handleFarad = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        if (value === '0' || value === '') {
            setValues(['','','','',]);
            return;
        };
        setValues([
            String(parseFloat(value) * 1000000000000),
            String(parseFloat(value) * 1000000000),
            String(parseFloat(value) * 1000000),
            value,
        ]);
    };

    return (
        <div className="capacitor-converter">
            <div className="capacitor-converter__row">
                <LabelInput text="pF" value={values.at(0)} onChange={handlePico} />
            </div>
            <div className="capacitor-converter__row">
                <LabelInput text="nF" value={values.at(1)} onChange={handleNano} />
            </div>
            <div className="capacitor-converter__row">
                <LabelInput text="µF" value={values.at(2)} onChange={handleMicro} />
            </div>
            <div className="capacitor-converter__row">
                <LabelInput text="&nbsp;F" value={values.at(3) } onChange={handleFarad} />
            </div>
        </div>
    )
}