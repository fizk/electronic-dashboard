import type { Meta, StoryObj } from '@storybook/react';
 
import CapacitorDischarge from './CapacitorDischarge';
 
const meta: Meta<typeof CapacitorDischarge> = {
  component: CapacitorDischarge,
};
 
export default meta;
type Story = StoryObj<typeof CapacitorDischarge>;
 
export const Primary: Story = {
  args: {
    variants: ['framed', 'raised']
  },
};
