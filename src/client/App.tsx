import React, { useContext, useRef, useEffect, useState, MouseEvent } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classVariant from './helpers/classVariant';
import Logo from './icons/Logo';
import Cog from './icons/Cog';
import { Button, Toggle } from './elements/Form';
import { ConfigContext } from './contexts/ConfigContext';
import { Outlet } from "react-router-dom";
import './fonts/latinmodern-math.otf';
import './App.css';

export default function App () {
    const {isAllResistorValues, setIsAllResistorValues} = useContext(ConfigContext);
    const [dialogState, setDialogState] = useState(false);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        dialogState 
            ? dialogRef.current?.showModal()
            : dialogRef.current?.close();

    }, [dialogState]);

    const handleDialogToggle = (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setDialogState(!dialogState);
    }

    return (
        <>
            <header className="app__header">
                <Link to="/">
                    <Logo />
                </Link>
            </header>
            <nav className="app__navigation">
                <ul className="main-nav">
                    <li>
                        <span>Calculators</span>
                        <ul>
                            <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/calculators/units">Units</NavLink></li>
                            <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/calculators/op-amps">OpAmps</NavLink></li>
                            <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/calculators/voltage">Voltage</NavLink></li>
                            <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/calculators/filters">Filter</NavLink></li>
                            <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/calculators/capacitor">Capacitor</NavLink></li>
                            <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/calculators/resistor">Resistor</NavLink></li>
                        </ul>
                    </li>
                    <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/transistor">Transistor</NavLink></li>
                    <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/ic">ICs</NavLink></li>
                    <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/eseries">E series</NavLink></li>
                    <li>
                        <span>Inventory</span>
                        <ul>
                            <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/inventory/resistors">Resistors</NavLink></li>
                            <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/inventory/capacitors">Capacitors</NavLink></li>        
                        </ul>
                    </li>
                    <li><NavLink className={({isActive}) => classVariant('main-nav__link', isActive ? ['active'] : [])} to="/wantlist">WantList</NavLink></li>
                </ul>
                <nav className="main-control">
                    <a href="#" onClick={handleDialogToggle}>
                        <Cog />
                    </a>
                </nav>
                <dialog ref={dialogRef}>
                    <Toggle checked={isAllResistorValues} onToggle={setIsAllResistorValues} text="Display all values" />
                    <Button onClick={handleDialogToggle}>close</Button>
                </dialog>
            </nav>
            <main className="app__content">
                <Outlet />
            </main>
        </>
    )
}
