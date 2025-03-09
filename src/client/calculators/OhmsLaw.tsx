import React, { useState, type ReactNode } from "react";
import { Button, FormRow, FormStack } from "../elements/Form";
import { AmperInput, ResistorInput, VoltageInput } from "../elements/ValueInput";
import { Section, type Variants } from "../elements/Section";
import './OhmsLaw.css';

interface Props {
    header?: ReactNode
    variants?: Variants
    state?: State
    onCalculate?: (state: State) => void
}

interface State {
    r: string
    v: string
    i: string
    ru: number
    vu: number
    iu: number
}

const defaultState: State = {
    v: '', 
    i: '', 
    r: '', 
    vu: 1, 
    iu: 1, 
    ru: 1
}

export default function OhmsLaw ({
    header = null, 
    onCalculate = () => {}, 
    variants = [],
    state = defaultState
}: Props) {

    const [internalState, setState] = useState<State>(state);
    const [active, setActive] = useState<boolean>(false);

    const handleVoltageChange = (value: string) => setInternalState({
        ...internalState,
        v: value,
    });

    const handleCurrentChange = (value: string) => setInternalState({
        ...internalState,
        i: value,
    });

    const handleResistanceChange = (value: string) => setInternalState({
        ...internalState,
        r: value,
    });

    const handleVoltageUnitChange = (value: string) => setInternalState({
        ...internalState,
        vu: parseFloat(value),
    });

    const handleCurrentUnitChange = (value: string) => setInternalState({
        ...internalState,
        iu: parseFloat(value),
    });

    const handleResistanceUnitChange = (value: string) => setInternalState({
        ...internalState,
        ru: parseFloat(value),
    });

    const handleCalculate = () => calculate(internalState);

    const setInternalState = (state: State) => {
        const numberOfActive = [state.v, state.i, state.r].reduce((previous, current) => {
            if (current !== '') return previous + 1;
            return previous;
        }, 0);
        setActive(numberOfActive === 2);
        setState(state)
    }

    const calculate = (values: State) => {
        if (values.v === '' && (values.r !== '' && values.i !== '')) {
            const calculated = {
                ...internalState,
                v: String(
                    ((Number(values.i) * values.iu) * (Number(values.r) * values.ru)) / values.vu
                ),
            };
            setInternalState(calculated);
            onCalculate(calculated);
        } else if (values.r === '' && (values.i !== '' && values.v !== '')) {
            const calculated = {
                ...internalState,
                r: String(
                    (Number(values.v) * values.vu) / (Number(values.i) * values.iu) / values.ru
                ),
            };
            setInternalState(calculated);
            onCalculate(calculated);
        } else if (values.i === '' && (values.r !== '' && values.v !== '')) {
            const calculated = {
                ...internalState,
                i: String(
                    (Number(values.v) * values.vu) / (Number(values.r) * values.ru) / values.iu
                ),
            };
            setInternalState(calculated);
            onCalculate(calculated);
        }
    }

    return (
        <article className="ohms-law">
            {header && (
                <header className="ohms-law__header">
                    {header}
                </header>
            )}
            <Section variant={variants}>
                <FormStack>
                    <FormRow variants={['stretch']}>
                        <VoltageInput
                            text="V"
                            value={internalState.v}
                            unit={internalState.vu}
                            onValueChange={handleVoltageChange}
                            onUnitChange={handleVoltageUnitChange}
                        />
                    </FormRow>
                    <FormRow variants={['stretch']}>
                        <AmperInput 
                            text="I"
                            value={internalState.i}
                            unit={internalState.iu}
                            onValueChange={handleCurrentChange}
                            onUnitChange={handleCurrentUnitChange}
                        />
                    </FormRow>
                    <FormRow variants={['stretch']}>
                        <ResistorInput 
                            text="R"
                            value={internalState.r}
                            unit={internalState.ru}
                            onValueChange={handleResistanceChange}
                            onUnitChange={handleResistanceUnitChange}
                        />
                    </FormRow>
                    <FormRow variants={['stretch']}>
                        <Button onClick={handleCalculate} disabled={!active}>Calculate</Button>
                    </FormRow>
                </FormStack>
            </Section>
            <footer>
                <details className="ohms-law__details">
                    <summary className="ohms-law__summary">Description</summary>
                    <ul className="ohms-law__formula-list">
                        <li className="ohms-law__formula-item">
                            <math xmlns="http://www.w3.org/1998/Math/MathML">
                                <mstyle displaystyle="true">
                                    <mi>v</mi><mo>=</mo><mi>i</mi><mo>&#xd7;</mo><mi>r</mi>
                                </mstyle>
                            </math>
                        </li>
                        <li className="ohms-law__formula-item">
                            <math xmlns="http://www.w3.org/1998/Math/MathML">
                                <mstyle displaystyle="true">
                                    <mi>r</mi><mo>=</mo><mfrac><mi>v</mi><mi>i</mi></mfrac>
                                </mstyle>
                            </math>
                        </li>
                        <li className="ohms-law__formula-item">
                            <math xmlns="http://www.w3.org/1998/Math/MathML">
                                <mstyle displaystyle="true">
                                    <mi>i</mi><mo>=</mo><mfrac><mi>v</mi><mi>r</mi></mfrac>
                                </mstyle>
                            </math>
                        </li>
                    </ul>
                    <p>
                        Ohm's law states that the electric current through a conductor between two points is 
                        directly proportional to the voltage across the two points. Introducing the constant of 
                        proportionality, the resistance, one arrives at the three mathematical equations used 
                        to describe this relationship:
                    </p>
                </details>
            </footer>
        </article>
    )
}
