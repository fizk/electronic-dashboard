import React from "react";
import type {ValueItemEntry} from '../types.d';
import './ResistorValueList.css';

interface Props {
    values: ValueItemEntry[],
    onSelect: (item: ValueItemEntry) => void
    onAdd: (item: ValueItemEntry) => void
}

export default function ResistorValueList ({values, onSelect, onAdd}: Props) {

    return (
        <ul className="resistor-value-list">
            {values.map(value => (
                <li key={value.id}>
                    <input type="checkbox" defaultChecked={value.active} onChange={() => onSelect(value)} />
                    <span>{value.text}</span>
                    <button onClick={() => onAdd(value)}>add to wantlist</button>
                </li>
            ))}
        </ul>
    )
}