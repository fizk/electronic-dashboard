import React, { ReactElement, ReactNode } from 'react';
import { Button, Toggle } from '../elements/Form';
import Cart from "../icons/Cart";
import type {CapacitorValue} from '../types.d';
import './CapacitorValueList.css';

interface Props {
    values: CapacitorValue[],
    onSelect: (item: CapacitorValue) => void
    onAdd: (item: CapacitorValue) => void
    format: (value: CapacitorValue) => ReactNode
}

export default function CapacitorValueList ({values, onSelect, onAdd, format}: Props) {

    return (
        <>
        <ul className="capacitor-value-list">
            {values.map(value => (
                <li key={value.id} className="capacitor-value-list__item">
                    <Toggle checked={value.active} onToggle={() => onSelect(value)} />
                    <span className="capacitor-value-list__label">{format(value)}</span>
                    <Button onClick={() => onAdd(value)}>
                        <Cart />
                    </Button>
                </li>
            ))}
        </ul>
        </>
    )
}
