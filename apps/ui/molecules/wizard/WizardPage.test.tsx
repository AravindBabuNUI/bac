import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import WizardPage from './WizardPage';
import type { WizardStep } from './types';

const STEPS: WizardStep[] = [
  {
    name: 'Email',
    component: <div>Email step content</div>,
    validations: ['email'],
  },
  {
    name: 'Personal',
    pageInfo: 'Your info is secure.',
    component: <div>Personal step content</div>,
    validations: ['firstName'],
  },
  {
    name: 'Address',
    additionalInfo: 'We find local benefits.',
    pageInfo: 'Data is encrypted.',
    component: <div>Address step content</div>,
    validations: ['zipCode'],
  },
];

describe('WizardPage', () => {
  it('renders the current step component', () => {
    render(<WizardPage steps={STEPS} currentStepIndex={0} />);
    expect(screen.getByText('Email step content')).toBeInTheDocument();
  });

  it('does not render other step components', () => {
    render(<WizardPage steps={STEPS} currentStepIndex={0} />);
    expect(screen.queryByText('Personal step content')).not.toBeInTheDocument();
    expect(screen.queryByText('Address step content')).not.toBeInTheDocument();
  });

  it('renders a different step when currentStepIndex changes', () => {
    render(<WizardPage steps={STEPS} currentStepIndex={1} />);
    expect(screen.getByText('Personal step content')).toBeInTheDocument();
    expect(screen.queryByText('Email step content')).not.toBeInTheDocument();
  });

  it('does not show page header when step has no pageInfo or additionalInfo', () => {
    render(<WizardPage steps={STEPS} currentStepIndex={0} />);
    expect(screen.queryByText('Your info is secure.')).not.toBeInTheDocument();
  });

  it('shows pageInfo when present on current step', () => {
    render(<WizardPage steps={STEPS} currentStepIndex={1} />);
    expect(screen.getByText('Your info is secure.')).toBeInTheDocument();
  });

  it('shows additionalInfo when present on current step', () => {
    render(<WizardPage steps={STEPS} currentStepIndex={2} />);
    expect(screen.getByText('We find local benefits.')).toBeInTheDocument();
  });

  it('shows both pageInfo and additionalInfo when both are present', () => {
    render(<WizardPage steps={STEPS} currentStepIndex={2} />);
    expect(screen.getByText('We find local benefits.')).toBeInTheDocument();
    expect(screen.getByText('Data is encrypted.')).toBeInTheDocument();
  });

  it('renders null when currentStepIndex is out of bounds', () => {
    const { container } = render(<WizardPage steps={STEPS} currentStepIndex={99} />);
    expect(container.firstChild).toBeNull();
  });

  it('step content has animate-slide-up class', () => {
    const { container } = render(<WizardPage steps={STEPS} currentStepIndex={0} />);
    expect(container.querySelector('.animate-slide-up')).toBeInTheDocument();
  });
});
