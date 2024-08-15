import React from 'react';
import { Tab, TabItem } from "../elements/Tab";
import LowPassFilterCalculator from '../components/LowPassFilterCalculator';
import HighPassFilterCalculator from '../components/HighPassFilterCalculator';

export default function CalculatorsFilters () {

    return (
        <Tab>
            <TabItem title="Low Pass Filter" path="low-pass">
                <h3>Low Pass Filter</h3>
                <LowPassFilterCalculator />
            </TabItem>
            <TabItem title="High Pass Filter " path="high-pass">
                <h3>High Pass Filter</h3>
                <HighPassFilterCalculator />
            </TabItem>
        </Tab>
    )
}
