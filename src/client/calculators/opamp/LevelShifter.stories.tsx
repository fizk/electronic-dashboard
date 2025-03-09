import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import LevelShifter from './LevelShifter';
import { ResistorValuesContextWrapper } from '../../contexts/ResistorValuesContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigContextWrapper } from '../../contexts/ConfigContext';
 
const meta: Meta<typeof LevelShifter> = {
  component: LevelShifter,
};
 
export default meta;
type Story = StoryObj<typeof LevelShifter>;
 
const queryClient = new QueryClient()

export const Primary: Story = {
    args: {
        state: {
            inMin: '0',
            inMinUnit: 1,
            inMax: '0',
            inMaxUnit: 1,
            outMin: '0',
            outMinUnit: 1,
            outMax: '0',
            outMaxUnit: 1,
            bias: '12',
            biasUnit: 1,
        },
        variants: ['framed', 'raised'],
        header: (<h2 style={{marginBlock: 0}}>LevelShifter</h2>)
    },
    render: (args) => {
        return (
            <QueryClientProvider client={queryClient}>
                <ResistorValuesContextWrapper host='http://localhost:3030'>
                    <ConfigContextWrapper>
                        <LevelShifter {...args} />
                    </ConfigContextWrapper>
                </ResistorValuesContextWrapper>
            </QueryClientProvider>
        )
    }
};
