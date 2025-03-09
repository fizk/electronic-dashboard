import React, { useState } from 'react';
import classVariant from '../helpers/classVariant';
import './CapacitorCodeCalculator.css';
import '../elements/Table.css';

export default function CapacitorCodeCalculator ()  {
                                          //          p  n  u
    const [valueState, setValueState] =     useState([0, 0, 0]);
    const [outcomeState, setOutcomeState] = useState([0, 0, 0]);

    const calculateCapacitorValue = (one: number, two: number, three: number, unit: number) => (
        (((one * 10) + two) * Math.pow(10, three)) / unit
    );

    const handleValueChange = (column: number, value: number) => {
        switch(column) {
            case 0: {
                setValueState([value, valueState.at(1)!, valueState.at(2)!]);

                setOutcomeState([
                    calculateCapacitorValue(value, valueState.at(1)!, valueState.at(2)!, 1),
                    calculateCapacitorValue(value, valueState.at(1)!, valueState.at(2)!, 1000),
                    calculateCapacitorValue(value, valueState.at(1)!, valueState.at(2)!, 1000000),
                ]);
            }; break;
            case 1: {
                setValueState([valueState.at(0)!, value, valueState.at(2)!]);
                setOutcomeState([
                    calculateCapacitorValue(valueState.at(0)!, value, valueState.at(2)!, 1),
                    calculateCapacitorValue(valueState.at(0)!, value, valueState.at(2)!, 1000),
                    calculateCapacitorValue(valueState.at(0)!, value, valueState.at(2)!, 1000000),
                ]);
            }; break;
            case 2: {
                setValueState([valueState.at(0)!, valueState.at(1)!, value]);
                setOutcomeState([
                    calculateCapacitorValue(valueState.at(0)!, valueState.at(1)!, value, 1),
                    calculateCapacitorValue(valueState.at(0)!, valueState.at(1)!, value, 1000),
                    calculateCapacitorValue(valueState.at(0)!, valueState.at(1)!, value, 1000000),
                ]);
            }; break;
        }
    }

    return (
        <section className="capacitor-code-calculator">
            <div>
            {[0,1,2,3,4,5,6,7,8].map(row => (
                <div className="capacitor-code-calculator__row" key={row}>
                    {[0,1,2].map(column => (
                        <button key={column} className={classVariant('capacitor-code-calculator__button', row === valueState.at(column) ? ['active'] : [])  } 
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
                        <td className={classVariant('table__data')}>pF</td>
                        <td className={classVariant('table__data', ['begin', 'end'])}>nF</td>
                        <td className={classVariant('table__data')}>µF</td>
                    </tr>
                </thead>
                <tbody className="table__body">
                    <tr>
                        <td className="table__data">{Intl.NumberFormat('en-GB').format(outcomeState.at(0)!)}</td>
                        <td className={classVariant('table__data', ['begin', 'end'])}>{Intl.NumberFormat('en-GB').format(outcomeState.at(1)!)}</td>
                        <td className="table__data">{Intl.NumberFormat('en-GB').format(outcomeState.at(2)!)}</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}
