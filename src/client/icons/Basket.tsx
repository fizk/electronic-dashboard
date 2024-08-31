import React from "react";
import classVariant from "../helpers/classVariant";
import type { SVGProps } from 'react';
import './Icon.css'

interface Props extends SVGProps<SVGSVGElement> {
    kind?: 'normal' | 'disabled'
}

export default function Basket ({kind = 'normal', ...rest}: Props) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" className={classVariant('icon-burger', [kind])} fill="none" {...rest}>
            <g clipPath="url(#clip0_218_9)">
                <path fillRule="evenodd" clipRule="evenodd" d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.1813 10.0399L12.5274 4.76923H14V3.94075H11.8839L11.5666 5.18322L3 5.17709L3.91075 10.0399L11.1813 10.0399ZM11.3721 11.7343C11.3721 12.4648 10.7778 13.0592 10.0472 13.0592C9.31668 13.0592 8.72234 12.4648 8.72233 11.7343C8.72233 11.5588 8.7567 11.3913 8.81892 11.2379H6.28391C6.34612 11.3913 6.38049 11.5588 6.38049 11.7343C6.38049 12.4648 5.78617 13.0592 5.05562 13.0592C4.32507 13.0592 3.73074 12.4648 3.73074 11.7343C3.73074 11.0037 4.32509 10.4094 5.05562 10.4094H10.0472C10.7778 10.4094 11.3721 11.0037 11.3721 11.7343Z" fill="#D9D9D9"/>
            </g>
            <defs>
                <clipPath id="clip0_218_9">
                    <rect width="16" height="16" fill="white"/>
                </clipPath>
            </defs>
        </svg>



    )
}
