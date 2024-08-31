import React, { useContext } from 'react';
import VoltageDivider from '../components/VoltageDivider';
import VoltageRatio from "../components/VoltageRatio";
import OhmsLaw from "../components/OhmsLaw";
import { Tab, TabItem } from "../elements/Tab";
import { ResistorValuesContext } from '../contexts/ResistorValuesContext';

export default function CalculatorsVoltage () {
    
    const resistorValues = useContext(ResistorValuesContext);

    return (
        <Tab>
            <TabItem title="Ohm's law" path="ohms-law">
                <h3>Ohm's law</h3>
                <OhmsLaw />
            </TabItem>
            <TabItem title="Voltage Divider" path="voltage-divider">
                <VoltageDivider />
            </TabItem>
            <TabItem title="Voltage Ratio" path="voltage-ratio">
                <VoltageRatio values={resistorValues} />
            </TabItem>
        </Tab>
    )
}
