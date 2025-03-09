import React, { useState, type ReactNode } from "react";
import { FormRow, FormStack } from '../../elements/Form';
import { FaradInput, ResistorInput, VoltageInput } from "../../elements/ValueInput";
import { SecondOutput } from "../../elements/ValueOutput";
import { Section, type Variants } from "../../elements/Section";
import './CapacitorCharge.css';

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

export default function CapacitorCharge ({
    header = null, 
    state = defaultState, 
    variants = [],
    onCalculate = () => {}
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
    const handleChangeOutputUnit = (value: string) => updateState({
        ...internalState,
        ou: parseFloat(value),
    });

    const updateState = (values: State) => {
        setInternalState(values);

        if (values.v === '' || values.v0 === '' || values.r === '' || values.c === '') {return;}

        const outcome = {
            ...values,
            o: String(formula(values) / values.ou),
        };

        setInternalState(outcome);
        onCalculate(outcome);
    }

    const formula = (values: State): number => (
        -1 * ((parseFloat(values.r) * values.ru) * (parseFloat(values.c) * values.cu) * Math.log(
            1 - ( (parseFloat(values.v0) * values.v0u) / (parseFloat(values.v) * values.vu) )
        ))
    );

    return (
        <article className="capacitor-charge">
            <header>
                {header}
            </header>
            <Section variant={variants}>
                <FormStack>
                    <FormRow variants={['stretch']}>
                        <VoltageInput 
                            text={<>V<sub>s</sub></>}
                            value={internalState.v}
                            unit={internalState.vu}
                            onValueChange={handleChangeTargetVoltage}
                            onUnitChange={handleChangeTargetVoltageUnit}
                        />
                    </FormRow>
                    <FormRow variants={['stretch']}>
                        <VoltageInput 
                            text={<>V</>}
                            value={internalState.v0}
                            unit={internalState.v0u}
                            onValueChange={handleChangeInitialVoltage}
                            onUnitChange={handleChangeInitialVoltageUnit}
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
                            onUnitChange={handleChangeOutputUnit}
                        />
                    </FormRow>
                </FormStack>
            </Section>
            <footer>
                <details className="capacitor-charge__details">
                    <summary className="capacitor-charge__summary">Description</summary>
                    <math xmlns="http://www.w3.org/1998/Math/MathML" className="capacitor-charge__formula">
                        <mstyle displaystyle="true">
                            <mrow>
                                <mi>t</mi>
                                <mo>=</mo>
                                <mo>&#x2212;</mo>
                                <mi>R</mi>
                                <mi>C</mi>
                                <mi>l</mi>
                                <mi>n</mi>
                            <mrow>
                                <mo>(</mo>
                                <mn>1</mn>
                                <mo>&#x2212;</mo>
                                <mfrac>
                                <mi>V</mi>
                                <msub>
                                    <mi>V</mi>
                                    <mi>s</mi>
                                </msub>
                                </mfrac>
                                <mo>)</mo>
                            </mrow>
                            </mrow>
                        </mstyle>
                    </math>
                    <ul className="capacitor-charge__description">
                        <li><strong>t</strong> is the time to charge the capacitor (in seconds)</li>
                        <li><strong>R</strong> is the resistance of the charging circuit (in ohms)</li>
                        <li><strong>C</strong> is the capacitance of the capacitor (in farads)</li>
                        <li><strong>V</strong> is the final voltage on the capacitor (in volts)</li>
                        <li><strong>V<sub>s</sub></strong> is the source voltage (in volts)</li>
                    </ul>
                </details>
            </footer>
        </article>
    )
}
