import React, { ReactElement, ReactNode } from "react";
import './CalculatorTemplate.css'

interface Props {
    header?: ReactNode
    children: ReactElement
}

export default function CalculatorTemplate ({children, header}: Props) {
    return (
        <article className="calculator-template">
            <header className="calculator-template__header">
                <h3>{header}</h3>
            </header>
            {children}
        </article>
    )
}
