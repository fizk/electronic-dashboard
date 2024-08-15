import React, { useContext } from 'react';
import VoltageDivider from '../components/VoltageDivider';
import VoltageRatio from "../components/VoltageRatio";
import { Tab, TabItem } from "../elements/Tab";
import { ResistorValuesContext } from '../contexts/ResistorValuesContext';

export default function CalculatorsVoltage () {
    
    const resistorValues = useContext(ResistorValuesContext);

    return (
        <Tab>
            <TabItem title="Voltage Divider" path="voltage-divider">
                <h3>Voltage Divider</h3>
                <VoltageDivider />
            </TabItem>
            <TabItem title="Voltage Ratio" path="voltage-ratio">
                <h3>Voltage Ratio</h3>
                <VoltageRatio values={resistorValues} />
            </TabItem>
        </Tab>
    )
}
