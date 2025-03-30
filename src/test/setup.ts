import { expect, afterEach } from 'vitest'

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  document.body.innerHTML = ''
})

// Add custom matchers for DOM testing
expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null
    return {
      message: () => `expected ${received} to be in the document`,
      pass,
    }
  },
  toHaveClass(received, className) {
    const pass = received.classList.contains(className)
    return {
      message: () => `expected ${received} to have class ${className}`,
      pass,
    }
  },
}) 