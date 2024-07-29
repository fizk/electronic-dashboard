import React, {ChangeEvent, useState, MouseEvent} from "react";
import {LabelInput, LabelSelect, LabelOutput, Button} from '../elements/Form';
import type {ValueItemEntry} from '../types.d'
import './VoltageRatio.css';

interface Props {
    values: ValueItemEntry[]
    allValues: boolean
}

interface Output {
    r1: string
    r2: string
    sum: number
}

export default function VoltageRatio ({values = []}: Props) {
    
                                            //    in  out
    const [inputState, setInputState] = useState<[string, string]>(['',  '']);
    const [outputState, setOutputState] = useState<Output[]>([]);


    const handleVin = (event: ChangeEvent<HTMLInputElement>) => {
        setInputState([
            event.currentTarget.value,
            inputState.at(1)!,
        ]);

        if (
            event.currentTarget.value === '' || 
            event.currentTarget.value === '0' || 
            inputState.at(1) === '' ||
            inputState.at(1) === '0'
        ) {return};

        const calculations = calculate(
            parseFloat(event.currentTarget.value), 
            parseFloat(inputState.at(1)!)
        );
        setOutputState(calculations);
    };

    const handleVout = (event: ChangeEvent<HTMLInputElement>) => {
        setInputState([
            inputState.at(0)!,
            event.currentTarget.value
        ]);

        if (
            inputState.at(0) === '' ||  
            inputState.at(0) === '0' ||  
            event.currentTarget.value === '' ||
            event.currentTarget.value === '0'
        ) {return};

        const calculations = calculate(
            parseFloat(inputState.at(0)!), 
            parseFloat(event.currentTarget.value)
        );
        setOutputState(calculations);
    };

    const calculate = (input: number, output: number) => {
        const filteredValues = values.filter(item => item.active);

        const allValues: Output[] = [];
        for(let i=0; i<filteredValues.length; i++) {
            for(let j=0; j<filteredValues.length; j++) {
                allValues.push({
                    r1: filteredValues[i].text,
                    r2: filteredValues[j].text,
                    sum: (filteredValues[j].value / (filteredValues[i].value + filteredValues[j].value)) * input
                });
            }
        }

        return allValues.filter(item => {
            return item.sum >= (output - 0.5) && item.sum <= (output + 0.5)
        }).slice().sort((a, b) => a.sum - b.sum );
    }

    return (
        <article className="voltage-ratio">
            <aside className="voltage-ratio__aside">
                <div>
                    <LabelInput text={<>V<sub>in</sub></>} onChange={handleVin} value={inputState.at(0) || ''} />
                </div>
                <div>
                    <LabelInput text={<>V<sub>out</sub></>} onChange={handleVout} value={inputState.at(1) || ''} />
                </div>
            </aside>
            <section className="voltage-ratio__content">
                <table className="voltage-ratio__table">
                    <thead className="voltage-ratio__table-head">
                        <tr>
                            <td>R<sub>1</sub></td>
                            <td>R<sub>2</sub></td>
                            <td>V<sub>out</sub></td>
                        </tr>
                    </thead>
                    <tbody className="voltage-ratio__table-body">
                        {outputState.map(item => (
                            <tr key={`${item.r1}${item.r2}`}>
                                <td>{item.r1}</td>
                                <td>{item.r2}</td>
                                <td>{item.sum.toFixed(3)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </article>
    )
}