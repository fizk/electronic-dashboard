import React from 'react';
import { NavLink } from "react-router-dom";
import classVariant from './helpers/classVariant';
import './App.css';

export default function App ({children}) {
    return (
        <>
            <nav className="app__navigation">
                <ul className='main-nav'>
                    <li><NavLink end className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/">Home</NavLink></li>
                    <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/wantlist">WantList</NavLink></li>
                    <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/resistors">Resistors</NavLink></li>
                    <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/capacitors">Capacitors</NavLink></li>
                    <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/calculators">Calculators</NavLink></li>
                </ul>
            </nav>
            <main className="app__content">
                {children}
            </main>
        </>
    )
}
