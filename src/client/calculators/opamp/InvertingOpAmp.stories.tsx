import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import InvertingOpAmp from './InvertingOpAmp';
import { ResistorValuesContextWrapper } from '../../contexts/ResistorValuesContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigContextWrapper } from '../../contexts/ConfigContext';
 
const meta: Meta<typeof InvertingOpAmp> = {
  component: InvertingOpAmp,
};
 
export default meta;
type Story = StoryObj<typeof InvertingOpAmp>;
 
const queryClient = new QueryClient()

export const Primary: Story = {
    args: {
        state: {
            v: '10',
            vu: 1,
            rf: '100',
            r2: '100',
            o: '0',
            ou: 1,
            a: '0',
        },
        variants: ['framed', 'raised'],
        header: <h2 style={{marginBlock: 0}}>InvertingOpAmp</h2>
    },
    render: (args) => {
        return (
            <QueryClientProvider client={queryClient}>
                <ResistorValuesContextWrapper host='http://localhost:3030'>
                    <ConfigContextWrapper>
                        <InvertingOpAmp {...args} />
                    </ConfigContextWrapper>
                </ResistorValuesContextWrapper>
            </QueryClientProvider>
        )
    }
};
