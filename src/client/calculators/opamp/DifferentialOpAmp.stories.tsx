import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DifferentialOpAmp from './DifferentialOpAmp';
import { ResistorValuesContextWrapper } from '../../contexts/ResistorValuesContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigContextWrapper } from '../../contexts/ConfigContext';
 
const meta: Meta<typeof DifferentialOpAmp> = {
  component: DifferentialOpAmp,
};
 
export default meta;
type Story = StoryObj<typeof DifferentialOpAmp>;
 
const queryClient = new QueryClient()

export const Primary: Story = {
    args: {
        state: {
            r1: '10',
            r2: '10',
            rf: '10',
            rg: '100',
            v1: '20',
            v2: '10',
            vu1: 1,
            vu2: 1,
            o: '10',
            ou: 1,
        },
        open: true,
        variants: ['framed', 'raised'],
        header: (<h2 style={{marginBlock: 0}}>DifferentialOpAmp</h2>)
    },
    render: (args) => {
        return (
            <QueryClientProvider client={queryClient}>
                <ResistorValuesContextWrapper host='http://localhost:3030'>
                    <ConfigContextWrapper>
                        <DifferentialOpAmp {...args} />
                    </ConfigContextWrapper>
                </ResistorValuesContextWrapper>
            </QueryClientProvider>
        )
    }
};
