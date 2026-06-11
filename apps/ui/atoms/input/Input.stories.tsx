import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from './Input';

type FormValues = { field: string }

type WrapperProps = {
  label?: string
  placeholder?: string
  showError?: boolean
  withError?: boolean
  defaultValue?: string
}

function InputWrapper({ label, placeholder, showError, withError, defaultValue }: WrapperProps) {
  const { control, setError } = useForm<FormValues>({
    defaultValues: { field: defaultValue ?? '' },
  });

  useEffect(() => {
    if (withError) {
      setError('field', { type: 'manual', message: 'This field is required' });
    }
  }, [withError, setError]);

  return (
    <Input
      control={control}
      name="field"
      label={label}
      placeholder={placeholder}
      showError={showError}
    />
  );
}

const meta = {
  title: 'Atoms/Input',
  component: InputWrapper,
  decorators: [
    ((Story) => (
      <div className="max-w-sm p-6">
        <Story />
      </div>
    )) as Decorator,
  ],
} satisfies Meta<typeof InputWrapper>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'Enter your full name',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    defaultValue: 'user@example.com',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    withError: true,
  },
};
