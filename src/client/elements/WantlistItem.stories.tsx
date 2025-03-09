import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import WantlistItem from './WantlistItem';
import { WantListEntry } from '../types';
 
const meta: Meta<typeof WantlistItem> = {
  component: WantlistItem,
};
 
export default meta;
type Story = StoryObj<typeof WantlistItem>;
 
export const CapacitorSmall: Story = {
    args: {
        item: {
            id: 1,
            name: 'string',
            description: null,
            done: true,
            date: 1
        },
        onSelect: (item: WantListEntry) => {},
        onRemove: (item: WantListEntry) => {},
        onUpdate: (item: WantListEntry) => {},
    },
};
