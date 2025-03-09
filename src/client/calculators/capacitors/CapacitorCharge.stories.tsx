import type { Meta, StoryObj } from '@storybook/react';
 
import CapacitorCharge from './CapacitorCharge';
 
const meta: Meta<typeof CapacitorCharge> = {
  component: CapacitorCharge,
};
 
export default meta;
type Story = StoryObj<typeof CapacitorCharge>;
 
export const Primary: Story = {
  args: {
    variants: ['framed', 'raised']
  },
};
