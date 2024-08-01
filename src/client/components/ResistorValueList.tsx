import React from 'react';
import type {ResistorValue} from '../types.d';
import { Button, Toggle } from '../elements/Form';
import Cart from "../icons/Cart";
import './ResistorValueList.css';

interface Props {
    values: ResistorValue[],
    onSelect: (item: ResistorValue) => void
    onAdd: (item: ResistorValue) => void
}

export default function ResistorValueList ({values, onSelect, onAdd}: Props) {

    return (
        <>
        <ul className="resistor-value-list">
            {values.map(value => (
                <li key={value.id} className="resistor-value-list__item">
                    <Toggle checked={value.active} onToggle={() => onSelect(value)} />
                    <span className="resistor-value-list__label">{value.text}</span>
                    <Button onClick={() => onAdd(value)}>
                        <Cart />
                    </Button>
                </li>
            ))}
        </ul>
        </>
    )
}
