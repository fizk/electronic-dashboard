import React from 'react';
import type {
    DetailedHTMLProps,
    InputHTMLAttributes,
    ButtonHTMLAttributes,
    ReactNode,
    TextareaHTMLAttributes,
    HTMLAttributes
} from 'react';
import classVariant from '../helpers/classVariant';
import './Form.css';

interface LabelInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    text?: ReactNode
    attachLeft?: boolean
    attachRight?: boolean
}

export function LabelInput({text, attachLeft = false, attachRight = false, ...rest}: LabelInputProps) {
    const classVariants: string[] = [];
    attachLeft && classVariants.push('left');
    attachRight && classVariants.push('right');

    return (
        <label className={classVariant('label-input', classVariants)}>
            {text && (
                <span className="label-input__label">{text}</span>
            )}
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
    attachLeft?: boolean
    attachRight?: boolean
}

export function LabelSelect({text, attachLeft = false, attachRight = false, children, ...rest}: LabelSelectProps) {
    const classVariants: string[] = [];
    !text && classVariants.push('stand-alone');
    attachRight && classVariants.push('right');
    attachLeft && classVariants.push('left');

    return (
        <label className={classVariant('label-select', classVariants)}>
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
    kind?: 'normal' | 'warning' | 'danger'
}

export function Button({children, kind = 'normal', ...rest}: ButtonProps) {
    return (
        <button {...rest} className={classVariant('button', [kind])}>
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

interface TextAreaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    text?: string
}

export function Textarea({children, text, ...props}: TextAreaProps) {
    return (
        <div className="textarea">
            {text && <span className="textarea__label">{text}</span>}
            <textarea {...props} className="textarea__input">{children}</textarea>
        </div>
    )
}

interface FormStackProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    variants?: string[]
}

export function FormStack({children, variants = []}: FormStackProps) {
    return (
        <div className={classVariant('form-stack', variants)}>{children}</div>
    )
}

export function FormRow({children}:FormStackProps) {
    return (
        <div className="form-row">{children}</div>
    )
}
