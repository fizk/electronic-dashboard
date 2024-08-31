import React from 'react';
import classVariant from '../helpers/classVariant';
import type { ReactNode } from 'react';
import './Section.css';

interface Props {
    children: ReactNode
    variant?: ( 'framed' | 'raised' )[]
}

export function Section ({children, variant = []}: Props) {
    return (
        <div className={classVariant('section', variant)}>{children}</div>
    )
}
