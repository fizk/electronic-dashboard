import React, { useState } from "react";
import { FormRow, FormStack } from "../../elements/Form";
import { FaradInput, ResistorInput, VoltageInput } from "../../elements/ValueInput";
import { Section, type Variants } from "../../elements/Section";
import { ConstantOutput } from "../../elements/ValueOutput";
import { line, curveCardinal, curveCatmullRom } from "d3-shape";
import { scaleLinear } from "d3-scale";
import '../../elements/Table.css';
import './TimeConstant.css';

interface State {
    v: string
    c: string
    r: string
    o: string
    vu: number
    cu: number
    ru: number
}

type Sequence = [
    number,
    number,
    number,
    number,
    number,
];

interface Props {
    state?: State
    variants?: Variants
    onCalculate: (state: State) => void
}

const defaultState: State = {
    v: '',
    c: '',
    r: '',
    o: '',
    vu: 1,
    cu: 1,
    ru: 1,
}

export default function TimeConstant ({
    variants = [],
    state = defaultState,
    onCalculate = () => {},
}: Props) {

    const [internalState, setInternalState] = useState<State>(state);
    
    const [sequence, setSequence] = useState<Sequence[]>([]);

    const handleVoltageChange = (value: string) => updateState({
        ...internalState,
        v: value,
    });
    const handleVoltageUnitChange = (value: string) => updateState({
        ...internalState,
        vu: parseFloat(value),
    });
    const handleCapacitanceChange = (value: string) => updateState({
        ...internalState,
        c: value,
    });
    const handleCapacitanceUnitChange = (value: string) => updateState({
        ...internalState,
        cu: parseFloat(value),
    });
    const handleResistanceChange = (value: string) => updateState({
        ...internalState,
        r: value,
    });
    const handleResistanceUnitChange = (value: string) => updateState({
        ...internalState,
        ru: parseFloat(value),
    });

    const updateState = (values: State) => {
        setInternalState(values);
        
        if (values.c === '' || values.r === '') {
            setInternalState({...values,o: ''});
            return;
        };

        const timeConstant = (parseFloat(values.c) * values.cu) * (parseFloat(values.r) * values.ru);
        const updatedState = {
            ...values,
            o: timeConstant.toFixed(5),
        }
        
        setInternalState(updatedState);
        onCalculate(updatedState)

        if (values.v !== '') {
            setSequence(calculateSequence(timeConstant, parseFloat(values.v) * values.vu));
        };
    };

    const calculateSequence = (value: number, volt: number): Sequence[] => {
        return [
            // discharge%     charge%      sec  chargeV    dischargeV
            [100,   100-100,     value * 0,                          0,                 volt],
            [36.8,  100- 36.8,   value * 1, volt * ((100-36.8)  / 100), volt * (36.8  / 100)],
            [13.5,  100- 13.5,   value * 2, volt * ((100-13.5)  / 100), volt * (13.5  / 100)],
            [4.98,  100-  4.98,  value * 3, volt * ((100-4.98)  / 100), volt * (4.98  / 100)],
            [1.83,  100-  1.83,  value * 4, volt * ((100-1.83)  / 100), volt * (1.83  / 100)],
            [0.674, 100-  0.674, value * 5, volt * ((100-0.674) / 100), volt * (0.674 / 100)],
            [0.248, 100-  0.248, value * 6, volt * ((100-0.248) / 100), volt * (0.248 / 100)],
        ];
    };


    const stuff: {x: number, y: number}[] = sequence.map((item, i) => {
        return {
            x: i,
            y: item.at(3)!,
        }
    });

    // const stuff = [
    //     {
    //         "x": 0,
    //         "y": 0
    //     },
    //     {
    //         "x": 1,
    //         "y": 7.584
    //     },
    //     {
    //         "x": 2,
    //         "y": 10.379999999999999
    //     },
    //     {
    //         "x": 3,
    //         "y": 11.4024
    //     },
    //     {
    //         "x": 4,
    //         "y": 11.7804
    //     },
    //     {
    //         "x": 5,
    //         "y": 11.91912
    //     },
    //     {
    //         "x": 6,
    //         "y": 11.97024
    //     }
    // ];

    const x = scaleLinear()
        .range([0, 700])
        .domain([0, 6])
    const y = scaleLinear()
        .range([0, 300])
        .domain([0, parseFloat(internalState.v || '12')])

    const lineGenerator = line<{x: number, y: number}>()
        .x(d => x(d.x))
        .y(d => y(d.y))
        // .curve(curveCardinal.tension(.4))
        .curve(curveCatmullRom.alpha(.5))
    ;
    console.log(JSON.stringify(stuff, undefined, 4));
    console.log(lineGenerator(stuff));

    return (
        <article className="time-constant">
            <header className="time-constant__header">
                <h2 className="time-constant__title">Time Constant</h2>
            </header>
            <Section variant={variants}>
                <FormStack>
                    <FormRow variants={['stretch']}>
                        <VoltageInput 
                            text={<>V</>}
                            value={internalState.v}
                            unit={internalState.vu}
                            onValueChange={handleVoltageChange}
                            onUnitChange={handleVoltageUnitChange}
                        />
                    </FormRow>
                    <FormRow variants={['stretch']}>
                        <FaradInput
                            text={<>C</>}
                            value={internalState.c}
                            unit={internalState.cu}
                            onValueChange={handleCapacitanceChange}
                            onUnitChange={handleCapacitanceUnitChange}
                        />
                    </FormRow>
                    <FormRow variants={['stretch']}>
                        <ResistorInput
                            text={<>R</>}
                            value={internalState.r}
                            unit={internalState.ru}
                            onValueChange={handleResistanceChange}
                            onUnitChange={handleResistanceUnitChange}
                        />
                    </FormRow>
                    <ConstantOutput 
                        text={<>τ/s</>}
                        value={internalState.o}
                        unit={1}
                        onUnitChange={() => {}}
                    />
                </FormStack>
                <div className="time-constant__table">
                    <table className="table table--full">
                        <thead className="table__head">
                            <tr>
                                <td className="table__data table__data--numeric">τ</td>
                                <td className="table__data table__data--numeric">sec</td>
                                <td className="table__data table__data--numeric table__data--begin">% <sub>charge</sub></td>
                                <td className="table__data table__data--numeric">V <sub>charge</sub></td>
                                <td className="table__data table__data--numeric table__data--begin">% <sub>discharge</sub></td>
                                <td className="table__data table__data--numeric">V <sub>discharge</sub></td>
                            </tr>
                        </thead>
                        <tbody className="table__body">
                            {sequence.map((item, i) => (
                                <tr key={`${item.at(0)}${item.at(1)}${item.at(2)}`}>
                                    <td className="table__data table__data--numeric">{i + 'τ'}</td>
                                    <td className="table__data table__data--numeric">{item.at(2)?.toFixed(2)}</td>
                                    <td className="table__data table__data--numeric table__data--begin">{item.at(1)?.toFixed(2)}</td>
                                    <td className="table__data table__data--numeric">{item.at(3)?.toFixed(2)}</td>
                                    <td className="table__data table__data--numeric table__data--begin">{item.at(0)?.toFixed(2)}</td>
                                    <td className="table__data table__data--numeric">{item.at(4)?.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <svg width={700} height={300}>
                    <path
                        d={lineGenerator(stuff) || ''}
                        stroke="#9a6fb0"
                        fill="none"
                        strokeWidth={2}
                        />
                    </svg>
                </div>
            </Section>
            <footer className="time-constant__description">
                <details>
                    <summary className="time-constant__summary">Description</summary>
                    <math xmlns="http://www.w3.org/1998/Math/MathML">
                        <mstyle displaystyle="true">
                            <mrow>
                            <mi>&#x03C4;</mi>
                            <mo>=</mo>
                            <mi>R</mi>
                            <mi>C</mi>
                            </mrow>
                        </mstyle>
                    </math>
                    <p>
                        In the realm of electronics, a time constant, denoted by the Greek letter 'τ' (tau), 
                        measures the speed at which a system responds to changes. Specifically, it's the <strong>time required for a 
                        system's response to reach approximately 63.2% of its final value</strong> following a step input.
                    </p>
                    <p>
                        [..] the time constant gives an indication of how quickly the circuit responds to changes in input. A small time constant 
                        implies a quick response, while a larger time constant indicates a slower response.
                    </p>
                    <p>
                        <q><a href="https://www.keysight.com/used/us/en/knowledge/formulas/time-constant-formula">-- source</a></q>
                    </p>
                </details>
            </footer>
        </article>
    )
}
