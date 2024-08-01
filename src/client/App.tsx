import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import classVariant from './helpers/classVariant';
import Logo from './icons/Logo';
import './App.css';

export default function App ({children}) {
    return (
        <>
            <header className="app__header">
                <Link to="/">
                    <Logo />
                </Link>
            </header>
            <nav className="app__navigation">
                <ul className='main-nav'>
                    <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/wantlist">WantList</NavLink></li>
                    <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/resistors">Resistors</NavLink></li>
                    <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/capacitors">Capacitors</NavLink></li>
                    <li>
                        <span>Calculators</span>
                        <ul>
                            <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/calculators/op-amps">OpAmps</NavLink></li>
                            <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/calculators/voltage">Voltage</NavLink></li>
                            <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/calculators/filters">Filter</NavLink></li>
                        </ul>
                    </li>
                    <li>
                        <span>ICs</span>
                        <ul>
                            <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/ic/tl074">TL074</NavLink></li>
                            <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/ic/lm358">LM358</NavLink></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <main className="app__content">
                {children}
            </main>
        </>
    )
}
