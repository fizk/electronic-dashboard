import React from 'react';
import {Link,} from "react-router-dom";
import './App.css';

export default function App ({children}) {
    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/wantlist">WantList</Link></li>
                <li><Link to="/resistors">Resistors</Link></li>
                <li><Link to="/capacitors">Capacitors</Link></li>
                <li><Link to="/calculators">Calculators</Link></li>
            </ul>
            {children}
        </div>
    )
}
