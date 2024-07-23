import React, {DetailedHTMLProps, InputHTMLAttributes, ButtonHTMLAttributes, ReactNode} from "react";
import './Form.css';

interface LabelInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    text: ReactNode
}

export function LabelInput({text, ...rest}: LabelInputProps) {
    return (
        <div className="label-input">
            <span className="label-input__label">{text}</span>
            <input {...rest}  className="label-input__input"/>
        </div>
    )
}

export function LabelOutput({text, ...rest}: LabelInputProps) {
    return (
        <div className="label-output">
            <input {...rest}  className="label-output__input"/>
            <span className="label-output__label">{text}</span>
        </div>
    )
}

interface LabelSelectProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    text: ReactNode
    children: ReactNode
}

export function LabelSelect({text, children, ...rest}: LabelSelectProps) {
    return (
        <div className="label-select">
            <span className="label-select__label">{text}</span>
            <select {...rest}  className="label-select__input">
                {children}
            </select>
        </div>
    )
}

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: ReactNode
}

export function Button({children, ...rest}: ButtonProps) {
    return (
        <button {...rest} className="button">
            {children}
        </button>
    )
}