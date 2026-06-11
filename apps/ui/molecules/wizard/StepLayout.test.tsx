import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StepLayout from './StepLayout'

function renderStepLayout(props: {
  title?: string
  subtitle?: string
  continueText?: string
  isSubmit?: boolean
} = {}) {
  return render(
    <form onSubmit={(e) => e.preventDefault()}>
      <StepLayout
        title={props.title ?? 'Step Title'}
        subtitle={props.subtitle ?? 'Step subtitle'}
        continueText={props.continueText}
        isSubmit={props.isSubmit}
      >
        <div>Child content</div>
      </StepLayout>
    </form>
  )
}

describe('StepLayout', () => {
  it('renders the title', () => {
    renderStepLayout({ title: 'Welcome!' })
    expect(screen.getByText('Welcome!')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    renderStepLayout({ subtitle: 'Now we need the basics' })
    expect(screen.getByText('Now we need the basics')).toBeInTheDocument()
  })

  it('renders children', () => {
    renderStepLayout()
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('default button text is "CONTINUE"', () => {
    renderStepLayout()
    expect(screen.getByRole('button', { name: 'CONTINUE' })).toBeInTheDocument()
  })

  it('renders custom continueText', () => {
    renderStepLayout({ continueText: 'SUBMIT' })
    expect(screen.getByRole('button', { name: 'SUBMIT' })).toBeInTheDocument()
  })

  it('default button has type="submit"', () => {
    renderStepLayout()
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('isSubmit=false: button has type="button"', () => {
    renderStepLayout({ isSubmit: false })
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('wrapper has role="group"', () => {
    renderStepLayout()
    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  it('wrapper has aria-labelledby="step-title"', () => {
    renderStepLayout()
    expect(screen.getByRole('group')).toHaveAttribute('aria-labelledby', 'step-title')
  })

  it('h2 has id="step-title"', () => {
    renderStepLayout({ title: 'Welcome!' })
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('id', 'step-title')
  })
})
