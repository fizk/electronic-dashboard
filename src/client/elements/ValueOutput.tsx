import React, {
    Children,
    type ReactNode, 
    type ChangeEvent,
    type ClipboardEvent,
} from "react";
import formatNumber from '../helpers/formatNumber'
import classVariant from '../helpers/classVariant'
import './ValueOutput.css';

interface Props {
    text?: ReactNode
    value?: string
    unit?: number
    onUnitChange?: (value: string) => void
    children?: ReactNode
}

function Output ({
    children,
    text = 'R', 
    value = '0', 
    unit = 1, 
    onUnitChange = (value: string) => {}
}: Props) {

    const handleOnUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onUnitChange(event.currentTarget.value.replaceAll(',', ''));
    };
    
    const handleCopy = (event: ClipboardEvent<HTMLInputElement>) => {
        navigator
        .clipboard
        .writeText(event.currentTarget?.value?.replaceAll(',', ''));
    }

    return (
        <label className="value-output">
            {Children.count(children) > 0 && (
                <select className="value-output__unit" onChange={handleOnUnitChange} value={unit}>
                    {children}
                </select>
            )}
            <input className={classVariant('value-output__input', Children.count(children) === 0 ? ['radius'] : [])} 
                value={formatNumber(value)} 
                onCopy={handleCopy} 
                readOnly 
            />
            <span className="value-output__label">{text}</span>
        </label>
    )
}

interface OutputProps {
    text?: ReactNode
    value?: string
    unit?: number
    onUnitChange?: (value: string) => void
}

export function ResistorOutput (props: OutputProps) {
    return (
        <Output {...props}>
            <option value={1}>Ω</option>
            <option value={Math.pow(10, 3)}>KΩ</option>
            <option value={Math.pow(10, 6)}>MΩ</option>
        </Output>
    )
}

export function VoltageOutput (props: OutputProps) {
    return (
        <Output {...props}>
            <option value={Math.pow(10, -6)} >µV</option>
            <option value={Math.pow(10, -3)} >mV</option>
            <option value={1}>&nbsp;V</option>
        </Output>
    )
}

export function AmperOutput (props: OutputProps) {
    return (
        <Output {...props}>
            <option value={Math.pow(10, -6)}>µA</option>
            <option value={Math.pow(10, -3)}>mA</option>
            <option value={1}>&nbsp;A</option>
        </Output>
    )
}

export function SecondOutput (props: OutputProps) {
    return (
        <Output {...props}>
            <option value={Math.pow(10, -3)}>mS</option>
            <option value={1}>&nbsp;S</option>
        </Output>
    )
}

export function ConstantOutput (props: OutputProps) {
    return (
        <Output {...props} />
    )
}
