import React from 'react';
import { useQuery } from '@tanstack/react-query';
import NonInvertingOpAmp from '../components/NonInvertingOpAmp';
import InvertingOpAmp from '../components/InvertingOpAmp';
import useLocalStorage from '../hooks/useLocalStorage';
import { Toggle } from '../elements/Form';
import Levelshifter from '../components/LevelShifter';
import { Tab, TabItem } from '../elements/Tab';
import type { ValueItemEntry } from '../types.d';

export default function CalculatorsOpAmps () {
    
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
                <TabItem title="Level Shifter" path="level-shifter">
                    <h3>Level Shifter</h3>
                    <Levelshifter values={query?.data || []} allValues={storage}  />
                </TabItem>
                <TabItem title="Inverting OpAmp" path="inverting-op-amp">
                    <h3>InvertingOpAmp</h3>
                    <InvertingOpAmp values={query?.data || []} allValues={storage}  />
                </TabItem>
                <TabItem title="Non-Inverting OpAmp" path="non-inverting-op-amp">
                    <h3>NonInvertingOpAmp</h3>
                    <NonInvertingOpAmp values={query?.data || []} allValues={storage}  />
                </TabItem>
            </Tab>
        </div>
    )
}
