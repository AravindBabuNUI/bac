import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'muted'

type ButtonProps = {
  children?: ReactNode
  variant?: ButtonVariant
  rounded?: boolean
  /** Required when button has no visible text (icon-only) */
  'aria-label'?: string
  onClick?: () => void
  onHover?: () => void
} & ButtonHTMLAttributes<HTMLButtonElement>

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-button/90',
  secondary: 'bg-secondary text-white hover:bg-secondary/90',
  danger: 'bg-error text-white hover:bg-error/90',
  muted: 'bg-muted text-white hover:bg-muted/90',
}

const baseClasses = 'h-16 font-semibold text-base'

export default function Button({
  children,
  variant = 'primary',
  rounded = false,
  onClick,
  onHover,
  disabled,
  className,
  'aria-label': ariaLabel,
  ...props
}: ButtonProps) {

  const classes = `${baseClasses}
    ${rounded ? 'rounded-[47px]' : 'rounded-[7px]'}
    ${variantClasses[variant]}
    ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
    ${className}`

  return (
    <button
      {...props}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={onHover}
      className={classes}
    >
      {children}
    </button>
  )
}
