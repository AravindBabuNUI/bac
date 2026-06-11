import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useForm } from 'react-hook-form'
import Select from './Select'

type FormValues = { field: string }

const STATE_OPTIONS = [
  { label: 'Alabama', value: 'AL' },
  { label: 'California', value: 'CA' },
  { label: 'New York', value: 'NY' },
]

const SIZE_OPTIONS = [
  { label: 'Small', value: 1 },
  { label: 'Medium', value: 2 },
  { label: 'Large', value: 3 },
]

function renderSelect(props: {
  label?: string
  placeholder?: string
  isRequired?: boolean
  defaultValue?: string
  options?: { label: string; value: string | number }[]
} = {}) {
  const { options = STATE_OPTIONS, ...rest } = props
  function Wrapper() {
    const { control } = useForm<FormValues>({ defaultValues: { field: rest.defaultValue ?? '' } })
    return <Select control={control} name="field" options={options} {...rest} />
  }
  return render(<Wrapper />)
}

function renderSelectWithError(message = 'Please select an option') {
  function Wrapper() {
    const { control, setError } = useForm<FormValues>({ defaultValues: { field: '' } })
    return (
      <div>
        <Select control={control} name="field" options={STATE_OPTIONS} label="State" />
        <button onClick={() => setError('field', { type: 'manual', message })}>trigger</button>
      </div>
    )
  }
  return render(<Wrapper />)
}

describe('Select', () => {
  it('renders a combobox element', () => {
    renderSelect()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    renderSelect({ label: 'State' })
    expect(screen.getByText('State')).toBeInTheDocument()
  })

  it('does not render label when not provided', () => {
    renderSelect()
    expect(screen.queryByText('label')).not.toBeInTheDocument()
  })

  it('label htmlFor matches select id', () => {
    renderSelect({ label: 'State' })
    const label = screen.getByText('State').closest('label')
    const select = screen.getByRole('combobox')
    expect(label).toHaveAttribute('for', select.id)
  })

  it('renders all options', () => {
    renderSelect()
    expect(screen.getByRole('option', { name: 'Alabama' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'California' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'New York' })).toBeInTheDocument()
  })

  it('renders placeholder as first disabled option', () => {
    renderSelect({ placeholder: 'Select a state' })
    const placeholder = screen.getByRole('option', { name: 'Select a state' })
    expect(placeholder).toBeDisabled()
  })

  it('renders numeric value options', () => {
    renderSelect({ options: SIZE_OPTIONS })
    expect(screen.getByRole('option', { name: 'Small' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Medium' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Large' })).toBeInTheDocument()
  })

  it('displays pre-selected value', () => {
    renderSelect({ defaultValue: 'CA' })
    expect(screen.getByRole('combobox')).toHaveValue('CA')
  })

  it('selecting an option updates value', () => {
    renderSelect()
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'NY' } })
    expect(screen.getByRole('combobox')).toHaveValue('NY')
  })

  it('isRequired adds aria-required attribute', () => {
    renderSelect({ isRequired: true })
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-required', 'true')
  })

  it('isRequired shows asterisk in label', () => {
    renderSelect({ label: 'State', isRequired: true })
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('no error: aria-invalid is false', () => {
    renderSelect()
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'false')
  })

  it('error: select has aria-invalid=true', async () => {
    renderSelectWithError()
    await act(async () => fireEvent.click(screen.getByText('trigger')))
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('error: error message is visible with role=alert', async () => {
    renderSelectWithError('Please select an option')
    await act(async () => fireEvent.click(screen.getByText('trigger')))
    expect(screen.getByRole('alert')).toHaveTextContent('Please select an option')
  })

  it('error: aria-describedby links select to error element', async () => {
    renderSelectWithError()
    await act(async () => fireEvent.click(screen.getByText('trigger')))
    const select = screen.getByRole('combobox')
    const errorId = select.getAttribute('aria-describedby')
    expect(errorId).toBeTruthy()
    expect(document.getElementById(errorId!)).toHaveTextContent('Please select an option')
  })

  it('error: select gets error border class', async () => {
    renderSelectWithError()
    await act(async () => fireEvent.click(screen.getByText('trigger')))
    expect(screen.getByRole('combobox')).toHaveClass('border-error')
  })
})
