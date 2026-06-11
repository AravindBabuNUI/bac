import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('renders children text', () => {
    render(<Button>Continue</Button>);
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
  });

  it('default variant applies primary background class', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');
  });

  it('secondary variant applies secondary background class', () => {
    render(<Button variant="secondary">Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-secondary');
  });

  it('danger variant applies error background class', () => {
    render(<Button variant="danger">Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-error');
  });

  it('muted variant applies muted background class', () => {
    render(<Button variant="muted">Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-muted');
  });

  it('default shape applies rounded-[7px]', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('rounded-[7px]');
  });

  it('rounded prop applies rounded-[47px]', () => {
    render(<Button rounded>Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('rounded-[47px]');
  });

  it('disabled prop makes button non-interactive', () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('disabled applies opacity-50 and cursor-not-allowed classes', () => {
    render(<Button disabled>Click</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('opacity-50');
    expect(btn).toHaveClass('cursor-not-allowed');
  });

  it('enabled button has cursor-pointer class', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).toHaveClass('cursor-pointer');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('aria-label is applied for icon-only buttons', () => {
    render(<Button aria-label="Close dialog" />);
    expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
  });

  it('type prop is forwarded to the button element', () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
