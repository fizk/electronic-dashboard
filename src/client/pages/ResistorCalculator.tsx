import React from "react";
import { Section } from '../elements/Section';
import ResistorParallel from "../calculators/resistors/ResistorParallel";
import './ResistorCalculator.css'

export default function ResistorCalculator () {
    return (
        <div className="resistor-calculator-page">
            <Section variant={['framed', 'raised']}>
                <ResistorParallel />
            </Section>

        </div>
    )
}
