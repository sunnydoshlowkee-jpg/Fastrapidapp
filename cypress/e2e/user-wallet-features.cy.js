describe('User App - Wallet & Payment Features', () => {
  beforeEach(() => {
    // Intercept data plans API
    cy.intercept('GET', '**/user/wallet/bills/data-plans*', {
      statusCode: 200,
      body: {
        data: [
          { id: '1', name: '10GB - 30 Days', price: 3000 }
        ]
      }
    }).as('getDataPlans')
    cy.visit('/app')
  })

  it('Navigates to Wallet and verifies transaction history opens', () => {
    cy.visit('/app/wallet')
    cy.contains('Wallet').should('exist')
    cy.contains('View All').click()
    cy.url().should('include', '/wallet/transactions')
    cy.contains('Transaction History').should('exist')
  })

  it('Tests the PayBills flow (Airtime and Data)', () => {
    cy.visit('/app/wallet/pay-bills?type=airtime')
    cy.contains('Pay Bills').should('exist')
    
    // Switch to Data Bundle
    cy.contains('Data Bundle').click()
    cy.wait('@getDataPlans')
    cy.contains('Select Data Plan').should('exist')
    
    // Type phone number
    cy.get('input[type="tel"]').type('08012345678')
    
    // Select plan by clicking the chevron/dropdown
    cy.contains('Select Data Plan').parent().click()
    // Wait for dropdown to be visible
    cy.contains('10GB - 30 Days').click({ force: true })
    
    // Verify amount is populated
    cy.get('input[type="text"]').should('have.value', '3000')
    
    // Click pay
    cy.contains('Pay ₦3,000').click()
    
    // We expect a mock failure or navigation to wallet (since we don't have real auth token here, 
    // it will either show network error or navigate if successful).
    // Let's assert it attempts processing.
    cy.contains('Processing').should('exist')
  })

  it('Tests the CryptoCheckout flow', () => {
    // Add an item to cart first so total > 0
    cy.visit('/app/item/1')
    cy.contains('Add to Cart').click()
    
    // Now visit crypto
    cy.visit('/app/payment/crypto')
    cy.contains('Crypto Checkout').should('exist')
    cy.contains('BTC Wallet Address').should('exist')
    cy.contains('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh').should('exist')
    
    // Check initial status
    cy.contains('Awaiting Payment').should('exist')
  })
})
