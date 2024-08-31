import React from 'react';
import NonInvertingOpAmp from '../components/OpAmp/NonInvertingOpAmp';
import InvertingOpAmp from '../components/OpAmp/InvertingOpAmp';
import Levelshifter from '../components/OpAmp/LevelShifter';
import { Tab, TabItem } from '../elements/Tab';
import DifferentialOpAmp from '../components/OpAmp/DifferentialOpAmp';
import InvertingSummingOpAmp from '../components/OpAmp/InvertingSummingOpAmp';
import CalculatorTemplate from './CalculatorTemplate';

function Template ({children, title}) {
    return (
        <article style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)'}}>
            <header style={{gridColumn: '1 / span 1'}}>
                <h3>{title}</h3>
            </header>
            {children}
        </article>
    )
}


export default function CalculatorsOpAmps () {
    return (
        <Tab>
            <TabItem title="Inverting" path="inverting-op-amp">
                <CalculatorTemplate header="Inverting OpAmp">
                    <InvertingOpAmp />
                </CalculatorTemplate>
            </TabItem>
            <TabItem title="Non-Inverting" path="non-inverting-op-amp">
                <CalculatorTemplate header="Non-Inverting OpAmp">
                    <NonInvertingOpAmp />
                </CalculatorTemplate>
            </TabItem>
            <TabItem title="Differential" path="diff-op-amp">
                <CalculatorTemplate header="Differential amplifier">
                    <DifferentialOpAmp  />
                </CalculatorTemplate>
            </TabItem>
            <TabItem title="Summing" path="inverting-summing-op-amp">
                <CalculatorTemplate header="Inverting Summing amplifier">
                    <InvertingSummingOpAmp  />
                </CalculatorTemplate>
            </TabItem>
            <TabItem title="Level Shifter" path="level-shifter">
                <CalculatorTemplate header="Level Shifter">
                    <Levelshifter />
                </CalculatorTemplate>
            </TabItem>
        </Tab>
    )
}
