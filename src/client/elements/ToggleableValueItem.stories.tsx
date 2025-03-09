import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import type {CapacitorValue, ResistorValue} from '../types';
import ToggleableValueItem, { 
    capacitorValueFormat, 
    capacitorLabelFormatter,
    resistorLabelFormatter,
    resistorValueFormat,
} from './ToggleableValueItem';
 
const meta: Meta<typeof ToggleableValueItem> = {
  component: ToggleableValueItem,
};
 
export default meta;
type CapacitorStory = StoryObj<typeof ToggleableValueItem<CapacitorValue>>;
type ResistorStory = StoryObj<typeof ToggleableValueItem<ResistorValue>>;
 
export const CapacitorSmall: CapacitorStory = {
    args: {
        item: {
            active: true,
            farad: 1e-10,
            farad_value: "1e-10F",
            id: "100",
            micro: 0.0001,
            micro_value: "0.0001µ",
            nano: 0.1,
            nano_value: "0.1n",
            notes: null,
            pico: 100,
            pico_value: "100p",
        },
        formatLabel: capacitorLabelFormatter,
        formatValue: capacitorValueFormat
    },
};
 
export const ResistorSmall: ResistorStory = {
    args: {
        item: {
            active: true,
            id: "1.3",
            notes: null,
            text: "1.3",
            value: 1.3,
        },
        formatLabel: resistorLabelFormatter,
        formatValue: resistorValueFormat
    },
};
 
export const ResistorLarge: ResistorStory = {
    args: {
        item: {
            active: true,
            id: "1100",
            notes: null,
            text: "1.1k",
            value: 1100,
        },
        formatLabel: resistorLabelFormatter,
        formatValue: resistorValueFormat
    },
};
