import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
    ResistorInput,
    VoltageInput,
    FaradInput,
    AmperInput
} from './ValueInput';
 
const meta: Meta<typeof ResistorInput> = {
  component: ResistorInput,
  render: () => (
    <ul>
        <li><ResistorInput text="R" /></li>
        <li><VoltageInput text="V" /></li>
        <li><FaradInput text="F" /></li>
        <li><AmperInput text="A" /></li>
    </ul>
  )
};
 
export default meta;
type ResistorStory = StoryObj<typeof ResistorInput>;
 
export const Primary: ResistorStory = {
    args: {
        
    },
};

