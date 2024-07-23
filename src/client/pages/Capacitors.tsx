import React from "react";
import CapacitorConverter from "../components/CapacitorConverter";
import CapacitorCodeCalculator from "../components/CapacitorCodeCalculator";


export default function Capacitors () {
    return (
        <div>
            <h2>capacitor</h2>

            <h3>Converter</h3>
            <CapacitorConverter />

            <h3>Codes</h3>
            <CapacitorCodeCalculator />
        </div>
    )
}