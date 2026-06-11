import type { Meta, StoryObj } from '@storybook/react';
import ProgressBar from './ProgressBar';

const LABELS = ['Email', 'Personal', 'Address', 'Phone'];

const meta = {
  title: 'Molecules/ProgressBar',
  component: ProgressBar,
  decorators: [
    (Story) => (
      <div className="max-w-sm p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    currentStep: { control: { type: 'range', min: 0, max: LABELS.length } },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>

export const FirstStep: Story = {
  args: { currentStep: 0, labels: LABELS },
};

export const MidStep: Story = {
  args: { currentStep: 2, labels: LABELS },
};

export const LastStep: Story = {
  args: { currentStep: 3, labels: LABELS },
};

export const AllCompleted: Story = {
  args: { currentStep: 4, labels: LABELS },
};

export const TwoSteps: Story = {
  args: { currentStep: 0, labels: ['Start', 'Finish'] },
};
