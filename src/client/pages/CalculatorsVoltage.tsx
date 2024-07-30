import React from 'react';
import VoltageDivider from '../components/VoltageDivider';
import { useQuery } from '@tanstack/react-query';
import VoltageRatio from "../components/VoltageRatio";
import useLocalStorage from '../hooks/useLocalStorage';
import { Toggle } from '../elements/Form';
import { Tab, TabItem } from "../elements/Tab";
import type { ValueItemEntry } from '../types.d';

export default function CalculatorsVoltage () {
    const [storage, setStorage] = useLocalStorage('all-resistor-values', false);

    const query = useQuery({ queryKey: ['resistors'], queryFn: async(): Promise<ValueItemEntry[]> => {
        const request = await fetch('/electronic/api/values/resistors');
        const response = request.json();
        return response;
    } });

    const handleOnToggle = (value: boolean) => {
        setStorage(value);
    }

    return (
        <div>
            <Toggle checked={storage} onToggle={handleOnToggle} text="Display all values" />

            <Tab>
                <TabItem title="Voltage Divider" path="voltage-divider">
                    <h3>VoltageDivider</h3>
                    <VoltageDivider values={query?.data || []} allValues={storage}  />
                </TabItem>
                <TabItem title="Voltage Ratio" path="voltage-ratio">
                    <h3>VoltageRatio</h3>
                    <VoltageRatio values={query?.data || []} allValues={storage}  />
                </TabItem>
            </Tab>
        </div>
    )
}
