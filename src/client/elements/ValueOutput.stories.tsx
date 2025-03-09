import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
    ResistorOutput,
    VoltageOutput,
    AmperOutput,
    SecondOutput,
    ConstantOutput 
} from './ValueOutput';
 
const meta: Meta<typeof ResistorOutput> = {
  component: ResistorOutput,
  render: () => (
    <ul>
        <li><ResistorOutput text="R" /></li>
        <li><VoltageOutput text="V" /></li>
        <li><AmperOutput text="F" /></li>
        <li><SecondOutput text="A" /></li>
        <li><ConstantOutput  text="A" /></li>
    </ul>
  )
};
 
export default meta;
type ResistorStory = StoryObj<typeof ResistorOutput>;
 
export const Primary: ResistorStory = {
    args: {
        
    },
};

