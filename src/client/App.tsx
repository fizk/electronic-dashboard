import React from 'react';
import {Link,} from "react-router-dom";
import './App.css';

export default function App ({children}) {
    return (
        <div>
            <ul>
                <li><Link to="/electronic">Home</Link></li>
                <li><Link to="/electronic/wantlist">WantList</Link></li>
                <li><Link to="/electronic/resistors">Resistors</Link></li>
                <li><Link to="/electronic/capacitors">Capacitors</Link></li>
                <li><Link to="/electronic/calculators">Calculators</Link></li>
            </ul>
            {children}
        </div>
    )
}
