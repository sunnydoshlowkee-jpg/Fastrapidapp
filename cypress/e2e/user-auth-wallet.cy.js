describe('User App - Auth and Wallet Flow', () => {
  it('Loads the login page correctly', () => {
    cy.visit('/auth/login')
    // Check for elements that exist on the login page
    cy.get('input[type="email"]').should('exist')
    cy.contains('button', 'Log In').should('exist')
  })

  // Placeholder for when we have a reliable test user setup in DB
  it('Logs in and views wallet (Mock)', () => {
    // Normally we'd use cy.request to login via API and set token,
    // or type into the UI.
    cy.visit('/app')
    // The wallet balance should be visible on the home page mobile header
    cy.contains('₦').should('exist')
  })
})
