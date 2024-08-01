import React from 'react';
import type {DetailedHTMLProps, InputHTMLAttributes, ButtonHTMLAttributes, ReactNode} from 'react';
import './Form.css';

interface LabelInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    text: ReactNode
}

export function LabelInput({text, ...rest}: LabelInputProps) {
    return (
        <label className="label-input">
            <span className="label-input__label">{text}</span>
            <input {...rest}  className="label-input__input"/>
        </label>
    )
}

export function LabelOutput({text, ...rest}: LabelInputProps) {
    return (
        <label className="label-output">
            <input {...rest}  className="label-output__input"/>
            <span className="label-output__label">{text}</span>
        </label>
    )
}

interface LabelSelectProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    text?: ReactNode
    children?: ReactNode
}

export function LabelSelect({text, children, ...rest}: LabelSelectProps) {
    return (
        <label className="label-select">
            {text && (
                <span className="label-select__label">{text}</span>
            )}
            <select {...rest}  className="label-select__input">
                {children}
            </select>
        </label>
    )
}

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?: ReactNode
}

export function Button({children, ...rest}: ButtonProps) {
    return (
        <button {...rest} className="button">
            {children}
        </button>
    )
}

interface ToggleProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>  {
    onCheck?: (element: HTMLInputElement) => void
    onUnCheck?: (element: HTMLInputElement) => void
    onToggle?: (value: boolean) => void
    text?: string
}

export function Toggle({text, onCheck = () => {}, onUnCheck = () => {}, onToggle = () => {}, checked, ...rest}: ToggleProps) {
    return (
        <div className="toggle">
            <label>
                {text && (<span className="toggle__label">{text}</span>)}
                <input className="toggle__input" type="checkbox" checked={checked} onChange={(event) => {
                    onToggle(event.currentTarget.checked );
                    event.currentTarget.checked 
                        ? onCheck(event.currentTarget) 
                        : onUnCheck(event.currentTarget)
            }} {...rest} />
            </label>
        </div>
    )
}
