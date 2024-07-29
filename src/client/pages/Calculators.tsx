import React, {MouseEvent} from "react";
import VoltageDivider from "../components/VoltageDivider";
import {useQuery, useQueryClient,} from '@tanstack/react-query';
import VoltageRatio from "../components/VoltageRatio";
import type {ValueItemEntry} from '../types.d';
import NonInvertingOpAmp from "../components/NonInvertingOpAmp";
import InvertingOpAmp from "../components/InvertingOpAmp";
import useLocalStorage from '../hooks/useLocalStorage';
import { Toggle } from "../elements/Form";
import Levelshifter from "../components/LevelShifter";

export default function Calculators () {
    
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
            
            <h3>Level Shifter</h3>
            <Levelshifter values={query?.data || []} allValues={storage}  />

            <h3>InvertingOpAmp</h3>
            <InvertingOpAmp values={query?.data || []} allValues={storage}  />

            <h3>NonInvertingOpAmp</h3>
            <NonInvertingOpAmp values={query?.data || []} allValues={storage}  />

            <h3>VoltageDivider</h3>
            <VoltageDivider values={query?.data || []} allValues={storage}  />

            <h3>VoltageRatio</h3>
            <VoltageRatio values={query?.data || []} allValues={storage}  />

        </div>
    )
}
