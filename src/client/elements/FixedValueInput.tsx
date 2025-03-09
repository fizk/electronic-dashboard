import React, { ChangeEvent, useContext, ReactNode } from 'react';
import { ConfigContext } from '../contexts/ConfigContext';
import { ResistorValuesContext } from '../contexts/ResistorValuesContext';
import { LabelSelect } from './Form';

interface Props {
    onSelect: (event: ChangeEvent<HTMLSelectElement>) => void
    value?: string | string[] | number | undefined
    text?: ReactNode
}

export default function ResistorSelector ({onSelect, value, text}: Props) {
    const {isAllResistorValues} = useContext(ConfigContext);
    const resistorValues = useContext(ResistorValuesContext);
    
    return (
        <LabelSelect text={text} onChange={onSelect} value={value}>
            {resistorValues.map(item => (
                <option key={item.id} value={item.value} disabled={isAllResistorValues ? false :!item.active}>{item.text}</option>
            ))}
        </LabelSelect>
    );
}
