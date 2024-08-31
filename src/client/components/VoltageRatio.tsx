import React, {useState} from 'react';
import { FormStack, LabelInput } from '../elements/Form';
import classVariant from '../helpers/classVariant';
import isEmpty from '../helpers/isEmpty';
import type { ChangeEvent } from 'react';
import type { ResistorValue } from '../types.d';
import '../elements/Table.css';
import './VoltageRatio.css';
import { Section } from '../elements/Section';

interface Props {
    values: ResistorValue[]
}

interface Output {
    r1: string
    r2: string
    sum: number
}

type State = [string, string];

export default function VoltageRatio ({values = []}: Props) {
    
                                                   //    in   out
    const [inputState, setInputState] = useState<State>(['0', '0']);
    const [outputState, setOutputState] = useState<Output[]>([]);

    const handleVin = (event: ChangeEvent<HTMLInputElement>) => updateState([
        event.currentTarget.value,
        inputState.at(1)!,
    ]);
    
    const handleVout = (event: ChangeEvent<HTMLInputElement>) => updateState([
        inputState.at(0)!,
        event.currentTarget.value
    ]);

    const updateState = (state: State) => {
        setInputState(state);

        const isEveryValueSet = state.every(value => !isEmpty(value));
        if (isEveryValueSet === false) return;

        const calculations = calculate(
            parseFloat(state.at(0)!), 
            parseFloat(state.at(1)!)
        );
        setOutputState(calculations);
    }

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
            <header className="voltage-ratio__header">
                <h2 className="voltage-ratio__title">Voltage Ratio</h2>
            </header>
            <aside className="voltage-ratio__aside">
                <Section variant={['framed', 'raised']}>
                    <FormStack>
                        <LabelInput text={<>V<sub>in</sub></>} type="number" onChange={handleVin} value={inputState.at(0) || ''} />
                        <LabelInput text={<>V<sub>out</sub></>} type="number" onChange={handleVout} value={inputState.at(1) || ''} />
                    </FormStack>
                </Section>
            </aside>
            <section className="voltage-ratio__content">
                <table className={classVariant('table', ['full', 'stick'])}>
                    <thead className="table__head">
                        <tr>
                            <td className="table__data">R<sub>1</sub></td>
                            <td className={classVariant('table__data', ['begin', 'end'])}>R<sub>2</sub></td>
                            <td className="table__data">V<sub>out</sub></td>
                        </tr>
                    </thead>
                    <tbody className="table__body">
                        {outputState.map(item => (
                            <tr key={`${item.r1}${item.r2}`}>
                                <td className="table__data">{item.r1}</td>
                                <td className={classVariant('table__data', ['begin', 'end'])}>{item.r2}</td>
                                <td className="table__data">{item.sum.toFixed(3)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </article>
    )
}
