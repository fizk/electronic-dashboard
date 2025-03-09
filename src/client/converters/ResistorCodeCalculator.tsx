import React, {useState } from 'react';
import classVariant from '../helpers/classVariant';
import { FormStack } from '../elements/Form';
import './ResistorCodeCalculator.css';
import '../elements/Table.css';

interface Props {}

export default function ResistorCodeCalculator ({}: Props)  {
    const [valueState, setValueState] = useState([0,0,0]);
    const [outcomeState, setOutcomeState] = useState(0);

    const calculateResistorValue = (one: number, two: number, three: number) => (
        (((one * 10) + two) * Math.pow(10, three))
    );

    const handleValueChange = (column: number, value: number) => {
        switch(column) {
            case 0: {
                setValueState([value, valueState.at(1)!, valueState.at(2)!]);
                setOutcomeState(calculateResistorValue(
                    value, 
                    valueState.at(1)!, 
                    valueState.at(2)!,
                ));
            }; break;
            case 1: {
                setValueState([valueState.at(0)!, value, valueState.at(2)!]);
                setOutcomeState(calculateResistorValue(
                    valueState.at(0)!, 
                    value, 
                    valueState.at(2)!,
                ));
            }; break;
            case 2: {
                setValueState([valueState.at(0)!, valueState.at(1)!, value]);
                setOutcomeState(calculateResistorValue(
                    valueState.at(0)!, 
                    valueState.at(1)!, 
                    value,
                ));
            }; break;
        }
    }

    return (
        <section className="resistor-code-calculator">
            <div>
                {[0,1,2,3,4,5,6,7,8,9].map(row => (
                    <div className="resistor-code-calculator__row" key={row}>
                        {[0,1,2].map(column => (
                            <button key={column} className={classVariant('resistor-code-calculator__button', row === valueState.at(column) ? ['active'] : [])} 
                                onClick={() => handleValueChange(column, row)}>
                                    {row}
                            </button>    
                        ))}
                    </div>
                ))}
            </div>
            <table className="table table--full">
                <thead className="table__head">
                    <tr>
                        <td className={classVariant('table__data')}>Ω</td>
                        <td className={classVariant('table__data', ['begin'])}>kΩ</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={classVariant('table__data')}>{Intl.NumberFormat('en-GB').format(outcomeState)}</td>
                        <td className={classVariant('table__data', ['begin'])}>{Intl.NumberFormat('en-GB').format(outcomeState / 1000)}</td>
                    </tr>
                </tbody>
            </table>
            
        </section>
    )
}
