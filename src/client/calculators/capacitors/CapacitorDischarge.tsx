import React, { useState, type ReactNode } from "react";
import { FormRow, FormStack } from '../../elements/Form';
import { Section, type Variants } from "../../elements/Section";
import { FaradInput, ResistorInput, VoltageInput } from "../../elements/ValueInput";
import { SecondOutput } from "../../elements/ValueOutput";
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
    ou: number  // Outcome unit 
}

interface Props {
    header?: ReactNode
    variants?: Variants
    state?: State
    onCalculate?: (state: State) => void
}

const defaultState: State = {
    v: '',
    v0: '',
    r: '',
    c: '',
    o: '',

    vu: 1,
    v0u: 1,
    ru: 1,
    cu: 1,
    ou: 1,
};

export default function CapacitorDischarge ({
    header = null,
    state = defaultState,
    variants = [],
    onCalculate = (state: State) => {}
}: Props) {

    const [internalState, setInternalState] = useState<State>(state);

    const handleChangeInitialVoltage = (value: string) => updateState({
        ...internalState,
        v0: value,
    });
    const handleChangeTargetVoltage = (value: string) => updateState({
        ...internalState,
        v:  value,
    });
    const handleChangeResistor = (value: string) => updateState({
        ...internalState,
        r: value,
    });
    const handleChangeCapacitor = (value: string) => updateState({
        ...internalState,
        c: value,
    });
    const handleChangeInitialVoltageUnit = (value: string) => updateState({
        ...internalState,
        v0u: parseFloat(value),
    });
    const handleChangeTargetVoltageUnit = (value: string) => updateState({
        ...internalState,
        vu: parseFloat(value),
    });
    const handleChangeResistorUnit = (value: string) => updateState({
        ...internalState,
        ru: parseFloat(value),
    });
    const handleChangeCapacitorUnit = (value: string) => updateState({
        ...internalState,
        cu: parseFloat(value),
    });
    const handleChangeTimeUnit = (value: string) => updateState({
        ...internalState,
        ou: parseFloat(value),
    });

    const updateState = (values: State) => {
        setInternalState(values);

        if (values.v === '' || values.v0 === '' || values.r === '' || values.c === '') {return;}

        const calculatedState: State = {
            ...values,
            o: String(formula(values) / values.ou) 
        }

        setInternalState(calculatedState);
        onCalculate(calculatedState);
    }

    const formula = (values: State): number => (
        (parseFloat(values.r) * values.ru) * (parseFloat(values.c) * values.cu) * Math.log(
            (parseFloat(values.v0) * values.v0u) / (parseFloat(values.v) * values.vu)
        )
    );


    return (
        <article className="capacitor-discharge">
            <header>
                {header}
            </header>
            <Section variant={variants}>
                <FormStack>
                    <FormRow variants={['stretch']}>
                        <VoltageInput 
                            text={<>V<sub>s</sub></>}
                            value={internalState.v0}
                            unit={internalState.v0u}
                            onValueChange={handleChangeInitialVoltage}
                            onUnitChange={handleChangeInitialVoltageUnit}
                        />
                    </FormRow>
                    <FormRow variants={['stretch']}>
                        <VoltageInput 
                            text={<>V</>}
                            value={internalState.v}
                            unit={internalState.vu}
                            onValueChange={handleChangeTargetVoltage}
                            onUnitChange={handleChangeTargetVoltageUnit}
                        />
                    </FormRow>
                    <FormRow variants={['stretch']}>
                        <ResistorInput
                            text={<>R</>}
                            value={internalState.r}
                            unit={internalState.ru}
                            onValueChange={handleChangeResistor}
                            onUnitChange={handleChangeResistorUnit}
                        />
                    </FormRow>
                    <FormRow variants={['stretch']}>
                        <FaradInput
                            text={<>C</>}
                            value={internalState.c}
                            unit={internalState.cu}
                            onValueChange={handleChangeCapacitor}
                            onUnitChange={handleChangeCapacitorUnit}
                        />
                    </FormRow>
                    <FormRow variants={['stretch']}>
                        <SecondOutput 
                            text={<>t</>}
                            value={internalState.o}
                            unit={internalState.ou}
                            onUnitChange={handleChangeTimeUnit}
                        />
                    </FormRow>
                </FormStack>
            </Section>
            <footer>
                <details className="capacitor-discharge__details">
                    <summary className="capacitor-discharge__summary">Description</summary>
                    <math xmlns="http://www.w3.org/1998/Math/MathML" className="capacitor-discharge__formula">
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
                    <ul className="capacitor-discharge__description">
                        <li><strong>V</strong> is the voltage across the capacitor at some time</li>
                        <li><strong>V<sub>s</sub></strong> is the initial voltage across the capacitor</li>
                        <li><strong>R</strong> is resistance in Ohms</li>
                        <li><strong>C</strong> is capacitance in Farads</li>
                        <li><strong>t</strong> is time in seconds</li>
                    </ul>
                </details>
            </footer>
        </article>
    )
}
