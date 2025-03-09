import type { Meta, StoryObj } from '@storybook/react';
 
import ResistorSerial from './ResistorSerial';
 
const meta: Meta<typeof ResistorSerial> = {
  component: ResistorSerial,
};
 
export default meta;
type Story = StoryObj<typeof ResistorSerial>;
 
export const Primary: Story = {
  args: {
  },
};
