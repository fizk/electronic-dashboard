import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import InvertingSummingOpAmp from './InvertingSummingOpAmp';
import { ResistorValuesContextWrapper } from '../../contexts/ResistorValuesContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigContextWrapper } from '../../contexts/ConfigContext';
 
const meta: Meta<typeof InvertingSummingOpAmp> = {
  component: InvertingSummingOpAmp,
};
 
export default meta;
type Story = StoryObj<typeof InvertingSummingOpAmp>;
 
const queryClient = new QueryClient()

export const Primary: Story = {
    args: {
        state: {
            items: [
                {v: '0', r: '0', vu: 1}
            ],
            rf: '1',
            o: '1',
            ou: 1,
        },
        variants: ['framed', 'raised'],
        header: <h2 style={{marginBlock: 0}}>InvertingSummingOpAmp</h2>,
        open: true
    },
    render: (args) => {
        return (
            <QueryClientProvider client={queryClient}>
                <ResistorValuesContextWrapper host='http://localhost:3030'>
                    <ConfigContextWrapper>
                        <InvertingSummingOpAmp {...args} />
                    </ConfigContextWrapper>
                </ResistorValuesContextWrapper>
            </QueryClientProvider>
        )
    }
};
