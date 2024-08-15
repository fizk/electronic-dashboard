import React, { Children, useState } from 'react';
import classVariant from '../helpers/classVariant';
import type { ReactElement, ReactNode, MouseEvent } from 'react';
import './Tab.css';

interface TabProps {
    children?: ReactNode
}

export const Tab = ({children}: TabProps) => {
    const [active, setActive] = useState(window.location.hash.replace('#', ''))
    
    const handleSelect = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
        event.preventDefault();
        window.location.hash = path;
        setActive(path);
    }

    return (
        <div className="tab">
            <ul className="tab__links">
                {Children.map(children, (child, index) => {
                    return (
                        <li>
                            <a href="#" className={classVariant('tab__button', (!active && index === 0 || (child as any).props.path === active) ? ['active'] : [])} onClick={event => handleSelect(event, ((child as ReactElement).props as TabItemProps).path)}>
                                {((child as ReactElement).props as TabItemProps).title}
                            </a>
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
    title: ReactNode
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
