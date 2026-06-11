import type { Meta, StoryObj } from '@storybook/react'
import WizardPage from './WizardPage'
import type { WizardStep } from './types'

const STEPS: WizardStep[] = [
  {
    name: 'Email',
    component: <div className="p-4 text-center text-sm text-muted">Email step content</div>,
    validations: ['email'],
  },
  {
    name: 'Personal Info',
    pageInfo: 'Your information is kept secure and private.',
    component: <div className="p-4 text-center text-sm text-muted">Personal info content</div>,
    validations: ['firstName', 'lastName'],
  },
  {
    name: 'Address',
    additionalInfo: 'We use this to find local benefits near you.',
    pageInfo: 'All data is encrypted.',
    component: <div className="p-4 text-center text-sm text-muted">Address content</div>,
    validations: ['zipCode'],
  },
]

const meta = {
  title: 'Molecules/WizardPage',
  component: WizardPage,
  decorators: [
    (Story) => (
      <div className="max-w-sm p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    currentStepIndex: { control: { type: 'range', min: 0, max: STEPS.length - 1 } },
  },
} satisfies Meta<typeof WizardPage>

export default meta
type Story = StoryObj<typeof meta>

export const FirstStep: Story = {
  args: { steps: STEPS, currentStepIndex: 0 },
}

export const WithPageInfo: Story = {
  args: { steps: STEPS, currentStepIndex: 1 },
}

export const WithAdditionalInfo: Story = {
  args: { steps: STEPS, currentStepIndex: 2 },
}
