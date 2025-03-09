import React, {useState, type ChangeEvent} from 'react';
import { Tab, TabItem } from "../elements/Tab";


import OhmsLaw from '../calculators/OhmsLaw';
import CapacitorCharge from '../calculators/capacitors/CapacitorCharge';
import CapacitorDischarge from '../calculators/capacitors/CapacitorDischarge';
import HighPassFilterCalculator from '../calculators/filters/HighPassFilterCalculator';
import LowPassFilterCalculator from '../calculators/filters/LowPassFilterCalculator';
import TimeConstant from '../calculators/capacitors/TimeConstant';

import VoltageDivider from '../calculators/resistors/VoltageDivider';
import ResistorSerial from '../calculators/resistors/ResistorSerial';
import ResistorParallel from '../calculators/resistors/ResistorParallel';

import './Scratchpad.css';

export default function Scratchpad () {
    const [value, setValue] = useState('1');
    const [unit, setUnit] = useState('1');

    return (
        <div>
            <ul className="scratchpad__list">
                <li className="scratchpad__list-item">
                    <OhmsLaw 
                        variants={['framed', 'raised']} 
                        onCalculate={i => console.log(i)} 
                        header={<span>OhmsLaw</span>} 
                    />
                </li>
                <li className="scratchpad__list-item">
                    <ResistorParallel 
                        variants={['framed', 'raised']} 
                        header={<span>ResistorParallel</span>} 
                        onCalculate={i => console.log(i)}
                    />
                </li>
                <li className="scratchpad__list-item">
                    <ResistorSerial 
                        variants={['framed', 'raised']} 
                        header={<span>ResistorSerial</span>} 
                        onCalculate={i => console.log(i)}
                    />
                </li>
                <li className="scratchpad__list-item" style={{gridColumn: 'span 3'}}>
                    <VoltageDivider 
                        variants={['framed', 'raised']} 
                        header={<span>VoltageDivider</span>} 
                        onCalculate={i => console.log(i)} 
                    />
                </li>
{/* 
                <li className="scratchpad__list-item"><CapacitorCharge /></li>
                <li className="scratchpad__list-item"><CapacitorDischarge /></li>
                <li className="scratchpad__list-item"><HighPassFilterCalculator /></li>
                <li className="scratchpad__list-item"><LowPassFilterCalculator /></li>
                <li className="scratchpad__list-item"><LowPassFilterCalculator /></li>
                <li className="scratchpad__list-item"><TimeConstant /></li> */}
            </ul>
        </div>
    )
}
