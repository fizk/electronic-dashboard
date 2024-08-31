import React, { ChangeEvent, useState } from "react";
import { FormRow, FormStack, LabelInput, LabelOutput } from '../elements/Form';
import useLocalStorage from '../hooks/useLocalStorage';
import VoltageUnitSelect from "../elements/VoltageUnitSelect";
import ResistorUnitSelect from "../elements/ResistorUnitSelect";
import CapacitorUnitSelect from "../elements/CapacitorUnitSelect";
import './CapacitorDischarge.css'

interface State {
    v: string  // Target voltage
    v0: string // Initial voltage
    r: string  // Resistance
    c: string  // Capacitance
    o: string  // Outcome

    vu: number  // Target Voltage unit 
    v0u: number // Initial Voltage unit 
    ru: number  // Resitance unit 
    cu: number  // Capacitance Voltage unit 
}

export default function CapacitorDischarge () {
    const [storedState, setStoredState] = useLocalStorage('CapacitorDischarge', {
        v: '',
        v0: '',
        r: '',
        c: '',
        o: '',

        vu: 1,
        v0u: 1,
        ru: 1,
        cu: 1,
    });
    const [state, setState] = useState<State>(storedState);

    const handleChangeInitialVoltage = (event: ChangeEvent<HTMLInputElement>) => updateState({
        v: state.v,
        v0: event.currentTarget.value,
        r: state.r,
        c: state.c,
        o: state.o,
        vu: state.vu,
        v0u: state.v0u,
        ru: state.ru,
        cu: state.cu,
    });
    const handleChangeTargetVoltage = (event: ChangeEvent<HTMLInputElement>) => updateState({
        v:  event.currentTarget.value,
        v0: state.v0,
        r: state.r,
        c: state.c,
        o: state.o,
        vu: state.vu,
        v0u: state.v0u,
        ru: state.ru,
        cu: state.cu,
    });
    const handleChangeResistor = (event: ChangeEvent<HTMLInputElement>) => updateState({
        v: state.v,
        v0: state.v0,
        r: event.currentTarget.value,
        c: state.c,
        o: state.o,
        vu: state.vu,
        v0u: state.v0u,
        ru: state.ru,
        cu: state.cu,
    });
    const handleChangeCapacitor = (event: ChangeEvent<HTMLInputElement>) => updateState({
        v: state.v,
        v0: state.v0,
        r: state.r,
        c: event.currentTarget.value,
        o: state.o,
        vu: state.vu,
        v0u: state.v0u,
        ru: state.ru,
        cu: state.cu,
    });
    const handleChangeInitialVoltageUnit = (event: ChangeEvent<HTMLSelectElement>) => updateState({
        v: state.v,
        v0: state.v0,
        r: state.r,
        c: state.c,
        o: state.o,
        vu: state.vu,
        v0u: parseFloat(event.currentTarget.value),
        ru: state.ru,
        cu: state.cu,
    });
    const handleChangeTargetVoltageUnit = (event: ChangeEvent<HTMLSelectElement>) => updateState({
        v: state.v,
        v0: state.v0,
        r: state.r,
        c: state.c,
        o: state.o,
        vu: parseFloat(event.currentTarget.value),
        v0u: state.v0u,
        ru: state.ru,
        cu: state.cu,
    });
    const handleChangeResistorUnit = (event: ChangeEvent<HTMLSelectElement>) => updateState({
        v: state.v,
        v0: state.v0,
        r: state.r,
        c: state.c,
        o: state.o,
        vu: state.vu,
        v0u: state.v0u,
        ru: parseFloat(event.currentTarget.value),
        cu: state.cu,
    });
    const handleChangeCapacitorUnit = (event: ChangeEvent<HTMLSelectElement>) => updateState({
        v: state.v,
        v0: state.v0,
        r: state.r,
        c: state.c,
        o: state.o,
        vu: state.vu,
        v0u: state.v0u,
        ru: state.ru,
        cu: parseFloat(event.currentTarget.value),
    });

    const updateState = (values: State) => {

        setState(values);

        if (values.v === '' || values.v0 === '' || values.r === '' || values.c === '') {return;}

        const outcome = formula(values);

        setState({
            ...values,
            o: String(outcome)
        });
        setStoredState({
            ...values,
            o: String(outcome)
        });
    }

    const formula = (values: State): number => (
        (parseFloat(values.r) * values.ru) * (parseFloat(values.c) * values.cu) * Math.log(
            (parseFloat(values.v0) * values.v0u) / (parseFloat(values.v) * values.vu)
        )
    );

    return (
        <article className="capacitor-discharge">
            <header>
                <h2 className="capacitor-discharge__title">Capacitor discharge</h2>
            </header>
            <section>
                <FormStack>
                    <FormRow variants={['stretch']}>
                        <LabelInput text={<>V<sub>s</sub></>} onChange={handleChangeInitialVoltage} value={state.v0} />
                        <VoltageUnitSelect value={state.v0u} onChange={handleChangeInitialVoltageUnit} />
                    </FormRow>
                    <FormRow variants={['stretch']}>
                        <LabelInput text={<>V</>} onChange={handleChangeTargetVoltage} value={state.v} />
                        <VoltageUnitSelect value={state.vu} onChange={handleChangeTargetVoltageUnit} />
                    </FormRow>
                    <FormRow variants={['stretch']}>
                        <LabelInput text="R" onChange={handleChangeResistor} value={state.r} />
                        <ResistorUnitSelect value={state.ru} onChange={handleChangeResistorUnit} />
                    </FormRow>
                    <FormRow variants={['stretch']}>
                        <LabelInput text="C" onChange={handleChangeCapacitor} value={state.c} />
                        <CapacitorUnitSelect value={state.cu} onChange={handleChangeCapacitorUnit} />
                    </FormRow>
                    <LabelOutput value={state.o} text="s"/>
                </FormStack>
            </section>
            <section className="capacitor-discharge__equation">
                <math xmlns="http://www.w3.org/1998/Math/MathML">
                    <mstyle displaystyle="true">
                        <mrow>
                        <mi>t</mi>
                        <mo>=</mo>
                        <mi>R</mi>
                        <mi>C</mi>
                        <mi>l</mi>
                        <mi>n</mi>
                        <mrow>
                            <mo>(</mo>
                            <mfrac>
                            <msub>
                                <mi>V</mi>
                                <mi>s</mi>
                            </msub>
                            <mi>V</mi>
                            </mfrac>
                            <mo>)</mo>
                        </mrow>
                        </mrow>
                    </mstyle>
                </math>
            </section>
            <section>
                <details>
                    <summary className="capacitor-discharge__summary">Description</summary>
                    <ul>
                        <li><strong>V</strong> is the voltage across the capacitor at some time</li>
                        <li><strong>V<sub>s</sub></strong> is the initial voltage across the capacitor</li>
                        <li><strong>R</strong> is resistance in Ohms</li>
                        <li><strong>C</strong> is capacitance in Farads</li>
                        <li><strong>t</strong> is time in seconds</li>
                    </ul>
                </details>
            </section>
        </article>
    )
}
