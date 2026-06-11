import { Controller, type Control, type FieldValues, type Path, type RegisterOptions } from 'react-hook-form'
import type { ReactNode } from 'react'
import Label from '../input/Label'

type SelectOption = {
  label: string | ReactNode
  value: string | number
}

type FormSelectProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label?: string
  placeholder?: string
  options: SelectOption[]
  className?: string
  rules?: RegisterOptions<T, Path<T>>
  showError?: boolean
  isRequired?: boolean
}

const Select = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
  className,
  rules,
  showError = true,
  isRequired = false,
}: FormSelectProps<T>) => {
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
            <select
              id={name}
              name={field.name}
              ref={field.ref}
              value={field.value ?? ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              aria-required={isRequired}
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : undefined}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm text-input border-2 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 ${hasError
                  ? 'border-error bg-red-50'
                  : 'border-input bg-white'
                } ${className ?? ''}`}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {showError && hasError && (
              <p id={errorId} role="alert" className="ml-1 text-xs text-error">{fieldState.error?.message}</p>
            )}
          </div>
        )
      }}
    />
  )
}

export default Select
