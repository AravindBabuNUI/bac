import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Footer from './Footer'
import { FOOTER_LINKS } from '@/constants/footerlinks'

const renderFooter = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  )

describe('Footer', () => {
  it('renders the BAG logo with correct alt text', () => {
    renderFooter()
    expect(screen.getByAltText('Benefits Access Center')).toBeInTheDocument()
  })

  it('renders a nav landmark with aria-label="Footer navigation"', () => {
    renderFooter()
    expect(screen.getByRole('navigation', { name: 'Footer navigation' })).toBeInTheDocument()
  })

  it('renders the correct number of footer links', () => {
    renderFooter()
    expect(screen.getAllByRole('link')).toHaveLength(FOOTER_LINKS.length)
  })

  it('renders each link label', () => {
    renderFooter()
    FOOTER_LINKS.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('Terms & Conditions link points to /terms', () => {
    renderFooter()
    const link = screen.getByRole('link', { name: 'TERMS & CONDITIONS' })
    expect(link).toHaveAttribute('href', '/terms')
  })

  it('renders the copyright notice', () => {
    renderFooter()
    expect(screen.getByText(/© BENEFITS ACCESS CENTER/i)).toBeInTheDocument()
  })

  it('renders inside a <footer> landmark', () => {
    renderFooter()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('each link has the muted text class', () => {
    renderFooter()
    screen.getAllByRole('link').forEach((link) => {
      expect(link).toHaveClass('text-muted')
    })
  })
})
