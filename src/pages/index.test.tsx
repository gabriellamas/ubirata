// __tests__/index.test.jsx

import Home from './index'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Home', () => {
  beforeEach(async () => {
    await waitFor(() => {
      render(<Home />)
    })
  })

  it('should renders a heading', async () => {
    const heading = screen.getByRole('heading', {
      name: /Ubirata/i
    })
    expect(heading).toBeInTheDocument()
  })

  it('shopuld renders homepage unchanged', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
})
