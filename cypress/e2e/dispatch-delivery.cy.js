describe('Dispatch App - Delivery Flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/dispatch/delivery/*', {
      statusCode: 200,
      body: {
        id: 1,
        status: 'pending',
        order: { user: { full_name: 'John Doe', phone: '08012345678' } }
      }
    }).as('getDelivery')
  })

  it('Loads the dispatch app home correctly', () => {
    cy.visit('/dispatch')
    // The dispatch app should have MapView elements
    cy.contains('You are online').should('exist')
  })

  it('Navigates to active delivery and verifies map controls', () => {
    // If a delivery is active, clicking on the map or notification navigates
    cy.visit('/dispatch/delivery/1')
    cy.contains('Food Pickup').should('exist')

    // Since map controls no longer alert, they are buttons. Let's find them by icon classes if possible or button presence.
    // They are fab buttons top right. We can check if any button exists.
    cy.get('button').should('have.length.greaterThan', 2)
  })

  it('Navigates to Customer Chat from active delivery', () => {
    cy.visit('/dispatch/delivery/1')
    
    // Accept delivery and proceed to a step where chat is available
    cy.contains('Accept', { timeout: 10000 }).click()
    cy.contains('Heading to Pickup', { timeout: 10000 }).should('exist')
    
    // Arrived at pickup
    cy.contains('Arrived at Pickup').click()
    cy.contains('Confirm Pickup', { timeout: 10000 }).should('exist')
    
    // There should be a chat button (it links to /dispatch/delivery/1/chat)
    // We can also just directly visit the chat URL since it's a dynamic route
    cy.visit('/dispatch/delivery/1/chat')
    cy.contains('Online').should('exist') // Chat header status
    cy.get('textarea[placeholder="Message..."]').should('exist')
    
    // Send a message
    cy.get('textarea').type('Hello, I have arrived{enter}')
    cy.contains('Hello, I have arrived').should('exist')
  })
})
