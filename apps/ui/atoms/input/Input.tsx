import { Controller, type Control, type FieldValues, type Path, type RegisterOptions } from 'react-hook-form'
import { type InputHTMLAttributes } from 'react'
import Label from './Label'

type FormInputProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label?: string
  placeholder?: string
  className?: string
  type?: string
  rules?: RegisterOptions<T, Path<T>>
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'value' | 'defaultValue'>
  normalizeValue?: (value: string) => string
  showError?: boolean
  isRequired?: boolean
}

const Input = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  type = "text",
  rules,
  inputProps,
  normalizeValue,
  showError = true,
  isRequired = false,
}: FormInputProps<T>) => {
  const { onChange: inputOnChange, onBlur: inputOnBlur, ...restInputProps } = inputProps ?? {}

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => {
        const errorId = `${name}-error`
        const hasError = !!fieldState.error
        return (
          <div className={`flex flex-col gap-1 ${className ?? ''}`}>
            {label && (
              <Label id={name} label={label} isRequired={isRequired} />
            )}
            <input
              id={name}
              {...restInputProps}
              name={field.name}
              value={field.value ?? ''}
              placeholder={placeholder}
              type={type}
              aria-required={isRequired}
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : undefined}
              onChange={(e) => {
                const raw = e.target.value
                const value = normalizeValue ? normalizeValue(raw) : raw
                field.onChange(value)
                inputOnChange?.(e)
              }}
              onBlur={(e) => {
                field.onBlur()
                inputOnBlur?.(e)
              }}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-input border-2 outline-none transition placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 focus:animate-input-focus ${hasError
                  ? 'animate-shake border-error bg-red-50 placeholder:text-red-400'
                  : 'border-input bg-white'
                } ${className ?? ''}`}
            />
            {showError && hasError && (
              <p id={errorId} role="alert" className="ml-1 text-xs text-left text-error">{fieldState.error?.message}</p>
            )}
          </div>
        )
      }}
    />
  )
}

export default Input
