import type { Meta, StoryObj } from '@storybook/react';
 
import VoltageDivider from './VoltageDivider';
 
const meta: Meta<typeof VoltageDivider> = {
  component: VoltageDivider,
};
 
export default meta;
type Story = StoryObj<typeof VoltageDivider>;
 
export const Primary: Story = {
  args: {
  },
};
