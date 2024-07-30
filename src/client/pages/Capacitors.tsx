import React from 'react';
import CapacitorConverter from '../components/CapacitorConverter';
import CapacitorCodeCalculator from "../components/CapacitorCodeCalculator";
import { Section } from '../elements/Section';
import './Capacitors.css';

export default function Capacitors () {
    return (
        <article className="capacitors-page">
            <header className="capacitors-page__header">
                <h1>Capacitors</h1>
            </header>
            <section className="capacitors-page__section">
                <Section>
                    <header><h2>Converter</h2></header>
                    <CapacitorConverter />
                </Section>
            </section>
            <section className="capacitors-page__section">
                <header><h2>Codes</h2></header>
                <CapacitorCodeCalculator />
            </section>
        </article>
    )
}
