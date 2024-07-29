import React, {useState, ChangeEvent} from "react";
import classVariant from "../helpers/classVariant";
import { LabelOutput, LabelSelect } from "../elements/Form";
import './ResistorCodeCalculator.css';

export default function ResistorCodeCalculator ()  {
    const [valueState, setValueState] = useState([0,0,0]);
    const [outcomeState, setOutcomeState] = useState(0);
    const [unitState, setUnitState] = useState(1);

    const calculateResistorValue = (one: number, two: number, three: number, unit: number) => (
        (((one * 10) + two) * Math.pow(10, three)) / unit
    );

    const handleValueChange = (column: number, value: number) => {
        switch(column) {
            case 0: {
                setValueState([value, valueState.at(1)!, valueState.at(2)!]);
                setOutcomeState(calculateResistorValue(
                    value, 
                    valueState.at(1)!, 
                    valueState.at(2)!, 
                    unitState
                ));
            }; break;
            case 1: {
                setValueState([valueState.at(0)!, value, valueState.at(2)!]);
                setOutcomeState(calculateResistorValue(
                    valueState.at(0)!, 
                    value, 
                    valueState.at(2)!, 
                    unitState
                ));
            }; break;
            case 2: {
                setValueState([valueState.at(0)!, valueState.at(1)!, value]);
                setOutcomeState(calculateResistorValue(
                    valueState.at(0)!, 
                    valueState.at(1)!, 
                    value, 
                    unitState
                ));
            }; break;
        }
    }

    const handleUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setUnitState(Number(event.currentTarget.value));
        setOutcomeState(calculateResistorValue(
            valueState.at(0)!, 
            valueState.at(1)!, 
            valueState.at(2)!, 
            Number(event.currentTarget.value)
        ));
    }

    return (
        <section className="resistor-code-calculator">
            <div className="resistor-code-calculator__table">
            {[0,1,2,3,4,5,6,7,8,9].map(row => (
                <div key={row}>
                    {[0,1,2].map(column => (
                        <button key={column} className={classVariant('resistor-code-calculator__button', row === valueState.at(column) ? ['active'] : [])} 
                            onClick={() => handleValueChange(column, row)}>
                                {row}
                        </button>    
                    ))}
                </div>
            ))}
            </div>
            <LabelSelect text="unit" onChange={event => handleUnitChange(event)} defaultValue={unitState}>
                <option value={1}>Ω</option>
                <option value={1000}>kΩ</option>
            </LabelSelect>
            <LabelOutput text="value" readOnly value={Intl.NumberFormat('en-GB').format(outcomeState)} />
        </section>
    )
}