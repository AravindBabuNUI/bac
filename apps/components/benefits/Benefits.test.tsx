import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Benefits from './Benefits'
import { BENEFITS } from '@/constants/footerlinks'

describe('Benefits', () => {
  it('renders a list with aria-label="Benefits"', () => {
    render(<Benefits />)
    expect(screen.getByRole('list', { name: 'Benefits' })).toBeInTheDocument()
  })

  it('renders the correct number of benefit items', () => {
    render(<Benefits />)
    expect(screen.getAllByRole('listitem')).toHaveLength(BENEFITS.length)
  })

  it('renders each benefit text', () => {
    render(<Benefits />)
    BENEFITS.forEach((benefit) => {
      expect(screen.getByText(benefit)).toBeInTheDocument()
    })
  })

  it('renders a decorative tick image with empty alt text per item', () => {
    const { container } = render(<Benefits />)
    // alt="" makes images presentational — query by attribute rather than role
    const images = container.querySelectorAll('img[alt=""]')
    expect(images).toHaveLength(BENEFITS.length)
  })

  it('tick image container has aria-hidden="true"', () => {
    const { container } = render(<Benefits />)
    const hiddenWrappers = container.querySelectorAll('[aria-hidden="true"]')
    expect(hiddenWrappers).toHaveLength(BENEFITS.length)
  })

  it('applies staggered animation delay to each item', () => {
    render(<Benefits />)
    const items = screen.getAllByRole('listitem')
    items.forEach((item, index) => {
      expect(item).toHaveStyle({ animationDelay: `${index * 150}ms` })
    })
  })

  it('applies slide-up animation class to each item', () => {
    render(<Benefits />)
    screen.getAllByRole('listitem').forEach((item) => {
      expect(item).toHaveClass('animate-slide-up')
    })
  })
})
