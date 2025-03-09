import React from "react";
import TimeConstant from '../calculators/capacitors/TimeConstant';
import CapacitorDischarge from '../calculators/capacitors/CapacitorDischarge';
import CapacitorCharge from '../calculators/capacitors/CapacitorCharge';
import { Section } from '../elements/Section';
import FaradConverter from '../converters/UnitConvert/FaradConverter';
import CapacitorCodeCalculator from "../converters/CapacitorCodeCalculator";

import './CapacitorCalculator.css'

export default function CapacitorCalculator () {
    return (
        <div className="capacitor-calculator-page">
            <Section variant={['framed', 'raised']}>
                <TimeConstant />
            </Section>

            <Section variant={['framed', 'raised']}>
                <CapacitorDischarge />
            </Section>

            <Section variant={['framed', 'raised']}>
                <CapacitorCharge />
            </Section>

            <Section variant={['framed', 'raised']}>
                <h2>Code converter</h2>
                <CapacitorCodeCalculator />
            </Section>  

            <Section variant={['framed', 'raised']}>
                <h2>Units converter</h2>
                <FaradConverter />                        
            </Section>
        </div>
    )
}
