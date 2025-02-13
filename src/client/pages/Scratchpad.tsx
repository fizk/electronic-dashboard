import React, {useState, type ChangeEvent} from 'react';
import { Tab, TabItem } from "../elements/Tab";
import LowPassFilterCalculator from '../components/LowPassFilterCalculator';
import HighPassFilterCalculator from '../components/HighPassFilterCalculator';
import OhmsLaw from '../components/OhmsLaw';
import { LabelSelect } from '../elements/Form';

export default function Scratchpad () {

    const [components, updateComponents] = useState<any[]>([]);
    const componentsList = {
        OhmsLaw: OhmsLaw
    };

    const handleComponentSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        updateComponents([
            ...components,
            componentsList[event.currentTarget.value]
        ])
    };

    return (
        <div>
            
            <LabelSelect onChange={handleComponentSelect}>
                <option> - </option>
                <option value={'OhmsLaw'}>Ohm's Law</option>
            </LabelSelect>
            <ul>
                {components.map((Item, i) => (
                    <li key={i}>
                        <Item />
                    </li>
                ))}
            </ul>
        </div>
    )
}
