import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProgressBar from './ProgressBar';

const LABELS = ['Email', 'Personal', 'Address', 'Phone'];

describe('ProgressBar', () => {
  it('renders the correct number of step indicators', () => {
    render(<ProgressBar currentStep={0} labels={LABELS} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(LABELS.length);
  });

  it('renders inside an ordered list with aria-label="Form progress"', () => {
    render(<ProgressBar currentStep={0} labels={LABELS} />);
    expect(screen.getByRole('list', { name: 'Form progress' })).toBeInTheDocument();
  });

  it('renders the BAG logo', () => {
    render(<ProgressBar currentStep={0} labels={LABELS} />);
    expect(screen.getByAltText('Benefits Access Center Logo')).toBeInTheDocument();
  });

  it('renders the cash image', () => {
    render(<ProgressBar currentStep={0} labels={LABELS} />);
    expect(screen.getByAltText('Money pile')).toBeInTheDocument();
  });

  it('FirstStep: first item has aria-current="step"', () => {
    render(<ProgressBar currentStep={0} labels={LABELS} />);
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveAttribute('aria-current', 'step');
  });

  it('FirstStep: non-current items do not have aria-current', () => {
    render(<ProgressBar currentStep={0} labels={LABELS} />);
    const items = screen.getAllByRole('listitem');
    expect(items[1]).not.toHaveAttribute('aria-current', 'step');
    expect(items[2]).not.toHaveAttribute('aria-current', 'step');
    expect(items[3]).not.toHaveAttribute('aria-current', 'step');
  });

  it('FirstStep: only first item is active', () => {
    render(<ProgressBar currentStep={0} labels={LABELS} />);
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveClass('bg-progress-active');
    expect(items[1]).toHaveClass('bg-progress-inactive');
    expect(items[2]).toHaveClass('bg-progress-inactive');
    expect(items[3]).toHaveClass('bg-progress-inactive');
  });

  it('MidStep: correct item has aria-current="step"', () => {
    render(<ProgressBar currentStep={2} labels={LABELS} />);
    const items = screen.getAllByRole('listitem');
    expect(items[2]).toHaveAttribute('aria-current', 'step');
  });

  it('MidStep: items up to current are active, rest inactive', () => {
    render(<ProgressBar currentStep={2} labels={LABELS} />);
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveClass('bg-progress-active');
    expect(items[1]).toHaveClass('bg-progress-active');
    expect(items[2]).toHaveClass('bg-progress-active');
    expect(items[3]).toHaveClass('bg-progress-inactive');
  });

  it('LastStep: all items are active', () => {
    render(<ProgressBar currentStep={3} labels={LABELS} />);
    screen.getAllByRole('listitem').forEach((item) => {
      expect(item).toHaveClass('bg-progress-active');
    });
  });

  it('current step aria-label starts with "Current step:"', () => {
    render(<ProgressBar currentStep={0} labels={LABELS} />);
    expect(screen.getAllByRole('listitem')[0]).toHaveAttribute('aria-label', 'Current step: Email');
  });

  it('completed step aria-label starts with "Completed:"', () => {
    render(<ProgressBar currentStep={2} labels={LABELS} />);
    expect(screen.getAllByRole('listitem')[0]).toHaveAttribute('aria-label', 'Completed: Email');
  });

  it('upcoming step aria-label starts with "Upcoming:"', () => {
    render(<ProgressBar currentStep={0} labels={LABELS} />);
    expect(screen.getAllByRole('listitem')[1]).toHaveAttribute('aria-label', 'Upcoming: Personal');
  });

  it('renders only two indicators for a two-step flow', () => {
    render(<ProgressBar currentStep={0} labels={['Start', 'Finish']} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
