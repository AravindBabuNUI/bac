import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-10">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'muted'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Continue',
    variant: 'primary',
    className: 'w-[200px]',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Get Started',
    variant: 'secondary',
    className: 'w-[200px]',
  },
};

export const Danger: Story = {
  args: {
    children: 'Delete Account',
    variant: 'danger',
    className: 'w-[200px]',
  },
};

export const Muted: Story = {
  args: {
    children: 'Cancel',
    variant: 'muted',
    className: 'w-[200px]',
  },
};

export const Rounded: Story = {
  args: {
    children: 'Submit',
    variant: 'primary',
    rounded: true,
    className: 'w-[200px]',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Unavailable',
    variant: 'primary',
    disabled: true,
    className: 'w-[200px]',
  },
};
