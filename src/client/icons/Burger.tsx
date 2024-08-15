import React from "react";
import classVariant from "../helpers/classVariant";
import type { SVGProps } from 'react';
import './Icon.css'

interface Props extends SVGProps<SVGSVGElement> {
    kind?: 'normal' | 'disabled'
}

export default function Burger ({kind = 'normal', ...rest}: Props) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" className={classVariant('icon-burger', [kind])} fill="none" {...rest}>
            <g clipPath="url(#clip0_70_8)">
                <rect width="16" height="16" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 
                    0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8 5.5C8.82843 5.5 9.5 4.82843 9.5 4C9.5 
                    3.17157 8.82843 2.5 8 2.5C7.17157 2.5 6.5 3.17157 6.5 4C6.5 4.82843 7.17157 5.5 8 5.5ZM9.5 8C9.5 
                    8.82843 8.82843 9.5 8 9.5C7.17157 9.5 6.5 8.82843 6.5 8C6.5 7.17157 7.17157 6.5 8 6.5C8.82843 6.5 
                    9.5 7.17157 9.5 8ZM8 13.5C8.82843 13.5 9.5 12.8284 9.5 12C9.5 11.1716 8.82843 10.5 8 10.5C7.17157 
                    10.5 6.5 11.1716 6.5 12C6.5 12.8284 7.17157 13.5 8 13.5Z"/>
            </g>
            <defs>
                <clipPath id="clip0_70_8">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
            </defs>
        </svg>

    )
}
