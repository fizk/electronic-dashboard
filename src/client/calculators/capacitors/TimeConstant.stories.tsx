import type { Meta, StoryObj } from '@storybook/react';
 
import TimeConstant from './TimeConstant';
 
const meta: Meta<typeof TimeConstant> = {
  component: TimeConstant,
};
 
export default meta;
type Story = StoryObj<typeof TimeConstant>;
 
export const Primary: Story = {
  args: {
    variants: ['framed', 'raised']
  },
};
