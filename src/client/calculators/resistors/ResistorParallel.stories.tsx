import type { Meta, StoryObj } from '@storybook/react';
 
import ResistorParallel from './ResistorParallel';
 
const meta: Meta<typeof ResistorParallel> = {
  component: ResistorParallel,
};
 
export default meta;
type Story = StoryObj<typeof ResistorParallel>;
 
export const Primary: Story = {
  args: {
  },
};
