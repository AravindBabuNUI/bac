import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { useForm } from 'react-hook-form'
import Input from './Input'

type FormValues = { field: string }

function renderInput(props: { label?: string; placeholder?: string; isRequired?: boolean; defaultValue?: string } = {}) {
  function Wrapper() {
    const { control } = useForm<FormValues>({ defaultValues: { field: props.defaultValue ?? '' } })
    return <Input control={control} name="field" {...props} />
  }
  return render(<Wrapper />)
}

function renderInputWithError(message = 'This field is required') {
  function Wrapper() {
    const { control, setError } = useForm<FormValues>({ defaultValues: { field: '' } })
    return (
      <div>
        <Input control={control} name="field" label="Field" />
        <button onClick={() => setError('field', { type: 'manual', message })}>trigger</button>
      </div>
    )
  }
  return render(<Wrapper />)
}

describe('Input', () => {
  it('renders an input element', () => {
    renderInput()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders with placeholder', () => {
    renderInput({ placeholder: 'Enter text...' })
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    renderInput({ label: 'Full Name' })
    expect(screen.getByText('Full Name')).toBeInTheDocument()
  })

  it('does not render label when not provided', () => {
    renderInput()
    expect(screen.queryByRole('label')).not.toBeInTheDocument()
  })

  it('label htmlFor matches input id', () => {
    renderInput({ label: 'Full Name' })
    const label = screen.getByText('Full Name').closest('label')
    const input = screen.getByRole('textbox')
    expect(label).toHaveAttribute('for', input.id)
  })

  it('displays pre-filled value', () => {
    renderInput({ defaultValue: 'user@example.com' })
    expect(screen.getByRole('textbox')).toHaveValue('user@example.com')
  })

  it('updates value on user input', () => {
    renderInput()
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'hello' } })
    expect(input).toHaveValue('hello')
  })

  it('isRequired adds aria-required attribute', () => {
    renderInput({ isRequired: true })
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true')
  })

  it('isRequired shows asterisk in label', () => {
    renderInput({ label: 'Name', isRequired: true })
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('no error: aria-invalid is false', () => {
    renderInput()
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false')
  })

  it('error: input has aria-invalid=true', async () => {
    renderInputWithError()
    await act(async () => fireEvent.click(screen.getByText('trigger')))
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('error: error message is visible with role=alert', async () => {
    renderInputWithError('This field is required')
    await act(async () => fireEvent.click(screen.getByText('trigger')))
    expect(screen.getByRole('alert')).toHaveTextContent('This field is required')
  })

  it('error: aria-describedby links input to error element', async () => {
    renderInputWithError()
    await act(async () => fireEvent.click(screen.getByText('trigger')))
    const input = screen.getByRole('textbox')
    const errorId = input.getAttribute('aria-describedby')
    expect(errorId).toBeTruthy()
    expect(document.getElementById(errorId!)).toHaveTextContent('This field is required')
  })

  it('error: input gets error border class', async () => {
    renderInputWithError()
    await act(async () => fireEvent.click(screen.getByText('trigger')))
    expect(screen.getByRole('textbox')).toHaveClass('border-error')
  })
})
