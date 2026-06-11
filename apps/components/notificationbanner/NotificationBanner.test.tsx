import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import NotificationBanner from './NotificationBanner'

describe('NotificationBanner', () => {
  it('renders the message text', () => {
    render(<NotificationBanner message="This site is not affiliated with any government agency." />)
    expect(screen.getByRole('alert')).toHaveTextContent(
      'This site is not affiliated with any government agency.'
    )
  })

  it('returns null when message is an empty string', () => {
    const { container } = render(<NotificationBanner message="" />)
    expect(container.firstChild).toBeNull()
  })

  it('has role="alert" for screen reader announcements', () => {
    render(<NotificationBanner message="Test message" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('applies uppercase styling class', () => {
    render(<NotificationBanner message="Test message" />)
    expect(screen.getByRole('alert')).toHaveClass('uppercase')
  })

  it('applies header background color class', () => {
    render(<NotificationBanner message="Test message" />)
    expect(screen.getByRole('alert')).toHaveClass('bg-header')
  })

  it('renders white text', () => {
    render(<NotificationBanner message="Test message" />)
    expect(screen.getByRole('alert')).toHaveClass('text-white')
  })
})
