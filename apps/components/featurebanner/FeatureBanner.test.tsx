import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import FeatureBanner from './FeatureBanner'
import { BANNER_CONTENT } from '@/constants/banner'

describe('FeatureBanner', () => {
  it('renders all banner items', () => {
    render(<FeatureBanner />)
    BANNER_CONTENT.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('renders the correct number of images', () => {
    render(<FeatureBanner />)
    expect(screen.getAllByRole('img')).toHaveLength(BANNER_CONTENT.length)
  })

  it('each image uses the banner label as alt text', () => {
    render(<FeatureBanner />)
    BANNER_CONTENT.forEach(({ label }) => {
      expect(screen.getByAltText(label)).toBeInTheDocument()
    })
  })

  it('renders "Secure & Private" label', () => {
    render(<FeatureBanner />)
    expect(screen.getByText('Secure & Private')).toBeInTheDocument()
  })

  it('renders "Free Access" label', () => {
    render(<FeatureBanner />)
    expect(screen.getByText('Free Access')).toBeInTheDocument()
  })

  it('each item label is bold', () => {
    render(<FeatureBanner />)
    BANNER_CONTENT.forEach(({ label }) => {
      expect(screen.getByText(label)).toHaveClass('font-bold')
    })
  })
})
