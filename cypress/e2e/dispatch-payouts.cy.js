describe('Dispatch App - Payouts & Profile', () => {
  beforeEach(() => {
    cy.visit('/dispatch')
  })

  it('Navigates to Payout History from Earnings', () => {
    cy.visit('/dispatch/earnings')
    cy.contains('Payout History').should('exist')
    cy.contains('VIEW ALL').click()
    
    cy.url().should('include', '/earnings/history')
    cy.contains('Payout History').should('exist')
    cy.get('input[placeholder="Search by ref, amount, bank..."]').should('exist')
  })

  it('Searches for a specific payout in Payout History', () => {
    cy.visit('/dispatch/earnings/history')
    cy.get('input[placeholder="Search by ref, amount, bank..."]').type('PAY-100234')
    cy.contains('Transfer to Kuda Bank').should('exist')
  })

  it('Opens Zone Selection modal in Rider Profile', () => {
    cy.visit('/dispatch/profile')
    cy.contains('Current Zone').should('exist')
    cy.contains('Change').click()
    
    // Modal should be visible
    cy.contains('Select Zone').should('exist')
    cy.contains('Surulere, Lagos').click()
    
    // Modal should close and update zone (mocked state so it updates instantly)
    cy.contains('Select Zone').should('not.exist')
    cy.contains('Surulere, Lagos').should('exist')
  })
})
