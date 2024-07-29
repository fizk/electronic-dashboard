import React from 'react';
import {Link,NavLink} from "react-router-dom";
import './App.css';
import classVariant from './helpers/classVariant';

export default function App ({children}) {
    return (
        <>
            <nav className="app__navigation">
                <ul className='main-nav'>
                    <li><NavLink end className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/electronic">Home</NavLink></li>
                    <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/electronic/wantlist">WantList</NavLink></li>
                    <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/electronic/resistors">Resistors</NavLink></li>
                    <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/electronic/capacitors">Capacitors</NavLink></li>
                    <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/electronic/calculators">Calculators</NavLink></li>
                </ul>
            </nav>
            <main className="app__content">
                {children}
            </main>
        </>
    )
}
