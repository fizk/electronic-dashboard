import React from "react";
import type { SVGProps } from 'react';
import classVariant from "../helpers/classVariant";
import './Icon.css'

interface Props extends SVGProps<SVGSVGElement> {
    kind?: 'normal' | 'disabled'
}

export default function Info ({kind = 'normal', ...rest}: Props) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={classVariant('icon-info', [kind])} {...rest}>
            <g clipPath="url(#clip0_67_2)">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 
                12.4183 3.58172 16 8 16ZM6.84655 5.35164V14.0789H9.26701V5.35164H6.84655ZM7.13633 3.86869C7.3939 4.10732 7.70261 4.22664 8.06246 
                4.22664C8.42231 4.22664 8.72913 4.10732 8.98291 3.86869C9.24049 3.62626 9.36928 3.33649 9.36928 2.99937C9.36928 2.66604 9.24049 
                2.38005 8.98291 2.14142C8.72913 1.89899 8.42231 1.77778 8.06246 1.77778C7.70261 1.77778 7.3939 1.89899 7.13633 2.14142C6.88254 
                2.38005 6.75564 2.66604 6.75564 2.99937C6.75564 3.33649 6.88254 3.62626 7.13633 3.86869Z"/>
            </g>
            <defs>
                <clipPath id="clip0_67_2">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    )
}
