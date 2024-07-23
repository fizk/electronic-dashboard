import React, {useState, ChangeEvent} from "react";

export default function CapacitorConverter () {
                                //        p  n  u  F
    const [values, setValues] = useState([0, 0, 0, 0])

    const handlePico = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.currentTarget.value);
        setValues([
            value,
            value * 0.001,
            value * 0.000001,
            value * (Math.pow(10, -12)),
        ]);
    };
    const handleNano = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.currentTarget.value);
        setValues([
            value * 1000,
            value,
            value * 0.001,
            value * (Math.pow(10, -9)),
        ]);
    };
    const handleMicro = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.currentTarget.value);
        setValues([
            value * 1000000,
            value * 1000,
            value,
            value * 0.000001,
        ]);
    };
    const handleFarad = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.currentTarget.value);
        setValues([
            value * 1000000000000,
            value * 1000000000,
            value * 1000000,
            value,
        ]);
    };

    return (
        <div>
            <div>
                <input value={values.at(0)} onChange={handlePico} />pF
            </div>
            <div>
                <input value={values.at(1)} onChange={handleNano} />nF
            </div>
            <div>
                <input value={values.at(2)} onChange={handleMicro} />µF
            </div>
            <div>
                <input value={values.at(3)} onChange={handleFarad} />F
            </div>
        </div>
    )
}