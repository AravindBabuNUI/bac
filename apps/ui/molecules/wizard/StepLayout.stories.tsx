import type { Decorator, Meta, StoryObj } from '@storybook/react'
import StepLayout from './StepLayout'

const meta = {
  title: 'Molecules/StepLayout',
  component: StepLayout,
  decorators: [
    ((Story) => (
      <div className="max-w-sm p-6 bg-white rounded-xl shadow">
        <form onSubmit={(e) => e.preventDefault()}>
          <Story />
        </form>
      </div>
    )) as Decorator,
  ],
} satisfies Meta<typeof StepLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <StepLayout {...args}>
      <div className="p-4 bg-gray-100 rounded text-sm text-muted">Form fields go here</div>
    </StepLayout>
  ),
  args: {
    title: 'Welcome!',
    subtitle: 'Now we just need the basics',
    children: null,
  },
}

export const WithCustomContinueText: Story = {
  render: (args) => (
    <StepLayout {...args}>
      <div className="p-4 bg-gray-100 rounded text-sm text-muted">Final fields</div>
    </StepLayout>
  ),
  args: {
    title: 'Last Step',
    subtitle: 'Almost there!',
    continueText: 'SUBMIT',
    children: null,
  },
}

export const AsButton: Story = {
  render: (args) => (
    <StepLayout {...args}>
      <div className="p-4 bg-gray-100 rounded text-sm text-muted">Step content</div>
    </StepLayout>
  ),
  args: {
    title: 'Choose Your Plan',
    subtitle: 'Pick what works for you',
    isSubmit: false,
    continueText: 'NEXT',
    children: null,
  },
}
