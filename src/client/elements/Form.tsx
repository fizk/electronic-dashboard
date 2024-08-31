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
    attached?: ('left' | 'right') []
}

export function LabelInput({text, attached = [], ...rest}: LabelInputProps) {
    return (
        <label className={classVariant('label-input', attached)}>
            {text && (
                <span className="label-input__label">{text}</span>
            )}
            <input {...rest}  className={classVariant('label-input__input', text ? [] : ['full-radius'])}/>
        </label>
    )
}

interface LabelOutputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    text?: ReactNode
    attached?: ('left' | 'right') []
}
export function LabelOutput({text, attached = [], ...rest}: LabelOutputProps) {
    return (
        <label className={classVariant('label-output', attached)}>
            <input {...rest}  className={classVariant('label-output__input', text ? [] : ['full-radius'])} readOnly/>
            {text && (
                <span className="label-output__label">{text}</span>
            )}
        </label>
    )
}

export interface LabelSelectProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    text?: ReactNode
    children?: ReactNode
    attached?: ('left' | 'right') []
}

export function LabelSelect({text, attached = [], children, ...rest}: LabelSelectProps) {
    return (
        <label className={classVariant('label-select', attached)}>
            {text && (
                <span className="label-select__label">{text}</span>
            )}
            <select {...rest}  className={classVariant('label-select__input')}>
                {children}
            </select>
        </label>
    )
}

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children?: ReactNode
    kind?: 'primary' | 'secondary' | 'warning' | 'danger'
}

export function Button({children, kind = 'primary', ...rest}: ButtonProps) {
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

interface FormStackProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function FormStack({children}: FormStackProps) {
    return (
        <div className={classVariant('form-stack')}>{children}</div>
    )
}

interface FormRowProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    variants?: ('stretch' | 'none' | 'compact' | 'begin' | 'end' | 'center') []
}

export function FormRow({children, variants = []}:FormRowProps) {
    return (
        <div className={classVariant('form-row', variants)}>{children}</div>
    )
}
