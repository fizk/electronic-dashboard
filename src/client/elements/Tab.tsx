import React, { Children, useState } from 'react';
import classVariant from '../helpers/classVariant';
import type { ReactElement, ReactNode } from 'react';
import './Tab.css';

interface TabProps {
    children?: ReactNode
}

export const Tab = ({children}: TabProps) => {
    const [active, setActive] = useState(window.location.hash.replace('#', ''))
    
    const handleSelect = (path: string) => {
        window.location.hash = path;
        setActive(path);
    }

    return (
        <div>
            <ul className="tab__links">
                {Children.map(children, (child, index) => {
                    return (
                        <li>
                            <span className={classVariant('tab__button', (!active && index === 0 || (child as any).props.path === active) ? ['active'] : [])} onClick={() => handleSelect(((child as ReactElement).props as TabItemProps).path)}>
                                {((child as ReactElement).props as TabItemProps).title}
                            </span>
                        </li>
                    )
                })}
            </ul>
            {React.Children.toArray(children).filter((child, index) => {
                if (!active && index === 0) return child;
                return (child as any).props.path === active}
            )}
        </div>
    )
}


interface TabItemProps {
    children?: ReactNode
    title: string | ReactNode
    path: string
    active?: boolean
}
export const TabItem = ({children}: TabItemProps) => {
    return (
        <div>
            {children}
        </div>
    )
}
