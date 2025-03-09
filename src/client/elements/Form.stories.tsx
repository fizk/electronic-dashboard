import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FormStack, LabelInput }  from './Form';
 
const meta: Meta<typeof FormStack> = {
  component: FormStack,
};
 
export default meta;
type Story = StoryObj<typeof FormStack>;
 
export const LabelInputStory: Story = {
    name: 'LabelInput',
    args: {
    },
    render: (args) => {
        return (
            <FormStack>
                <LabelInput value="no label" />
                <LabelInput text="text" value="with label" />
                <LabelInput text="left" attached={['left']} />
                <LabelInput text="right" attached={['right']} />
                <LabelInput text="left, right" attached={['right', 'left']} />
            </FormStack>
        )
    }
};
