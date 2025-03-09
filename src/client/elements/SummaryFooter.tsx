import React, { type ReactNode } from "react";

interface Props {
    children?: ReactNode
    label?: string
    open?: boolean
}

export function SummaryFooter({ children, label, open = false }: Props) {
    return (
        <footer>
            <details open={open}>
                <summary>{label}</summary>
                {children}
            </details>
        </footer>
    )
}
