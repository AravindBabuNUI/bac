import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Select from './Select';

type FormValues = { field: string }

const STATE_OPTIONS = [
  { label: 'Alabama', value: 'AL' },
  { label: 'California', value: 'CA' },
  { label: 'Florida', value: 'FL' },
  { label: 'New York', value: 'NY' },
  { label: 'Texas', value: 'TX' },
];

const SIZE_OPTIONS = [
  { label: 'Small', value: 1 },
  { label: 'Medium', value: 2 },
  { label: 'Large', value: 3 },
];

type WrapperProps = {
  label?: string
  placeholder?: string
  showError?: boolean
  withError?: boolean
  defaultValue?: string
  optionSet?: 'states' | 'sizes'
}

function SelectWrapper({ label, placeholder, showError, withError, defaultValue, optionSet = 'states' }: WrapperProps) {
  const { control, setError } = useForm<FormValues>({
    defaultValues: { field: defaultValue ?? '' },
  });

  useEffect(() => {
    if (withError) {
      setError('field', { type: 'manual', message: 'Please select an option' });
    }
  }, [withError, setError]);

  const options = optionSet === 'sizes' ? SIZE_OPTIONS : STATE_OPTIONS;

  return (
    <Select
      control={control}
      name="field"
      label={label}
      placeholder={placeholder}
      options={options}
      showError={showError}
    />
  );
}

const meta = {
  title: 'Atoms/Select',
  component: SelectWrapper,
  decorators: [
    ((Story) => (
      <div className="max-w-sm p-6">
        <Story />
      </div>
    )) as Decorator,
  ],
} satisfies Meta<typeof SelectWrapper>;

export default meta;
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Select an option',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'State',
    placeholder: 'Select your state',
  },
};

export const WithNumericValues: Story = {
  args: {
    label: 'Size',
    placeholder: 'Select size',
    optionSet: 'sizes',
  },
};

export const WithPreselectedValue: Story = {
  args: {
    label: 'State',
    defaultValue: 'CA',
  },
};

export const WithError: Story = {
  args: {
    label: 'State',
    placeholder: 'Select your state',
    withError: true,
  },
};
