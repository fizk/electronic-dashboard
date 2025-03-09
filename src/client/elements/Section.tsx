import React, { type ReactNode} from 'react';
import classVariant from '../helpers/classVariant';
import './Section.css';

export type Variants = ( 'framed' | 'raised' )[];

interface Props {
    children: ReactNode
    variant?: Variants
}

export function Section ({children, variant = []}: Props) {
    return (
        <section className={classVariant('section', variant)}>{children}</section>
    )
}
