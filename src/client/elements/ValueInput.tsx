import React, {
    type ReactNode, 
    type ChangeEvent
} from "react";
import formatNumber from '../helpers/formatNumber'
import './ValueInput.css';

interface Props {
    text?: ReactNode
    value?: string
    unit?: number
    onValueChange?: (value: string) => void
    onUnitChange?: (value: string) => void
    children: ReactNode
}

function Input ({
    children,
    text = 'R', 
    value = '0', 
    unit = 1, 
    onValueChange = (value: string) => {}, 
    onUnitChange = (value: string) => {}
}: Props) {

    const handleOnValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        onValueChange(event.currentTarget.value.replaceAll(',', ''));
    };

    const handleOnUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onUnitChange(event.currentTarget.value.replaceAll(',', ''));
    };

    return (
        <label className="value-input">
            <span className="value-input__label">{text}</span>
            <input className="value-input__input" onChange={handleOnValueChange} value={formatNumber(value)} />
            <select className="value-input__unit" onChange={handleOnUnitChange} value={unit}>
                {children}
            </select>
        </label>
    )
}

interface InputProps {
    text?: ReactNode
    value?: string
    unit?: number
    onValueChange?: (value: string) => void
    onUnitChange?: (value: string) => void
}

export function ResistorInput (props: InputProps) {
    return (
        <Input {...props}>
            <option value={1}>&nbsp;Ω</option>
            <option value={Math.pow(10, 3)}>KΩ</option>
            <option value={Math.pow(10, 6)}>MΩ</option>
        </Input>
    )
}

export function VoltageInput (props: InputProps) {
    return (
        <Input {...props}>
            <option value={Math.pow(10, -6)} >µV</option>
            <option value={Math.pow(10, -3)} >mV</option>
            <option value={1}>&nbsp;V</option>
        </Input>
    )
}

export function AmperInput (props: InputProps) {
    return (
        <Input {...props}>
            <option value={Math.pow(10, -6)}>µA</option>
            <option value={Math.pow(10, -3)}>mA</option>
            <option value={1}>&nbsp;A</option>
        </Input>
    )
}

export function FaradInput (props: InputProps) {
    return (
        <Input {...props}>
            <option value={Math.pow(10, -12)}>pF</option>
            <option value={Math.pow(10, -9)}>nF</option>
            <option value={Math.pow(10, -6)}>µF</option>
            <option value={1}>&nbsp;F</option>
        </Input>
    )
}
