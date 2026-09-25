describe('Smoke Tests', () => {
  it('Should display all login elements', () => {
    cy.visit('/#/login')

    cy.get('[data-cy="login-input-username"]').should('be.visible')
    cy.get('[data-cy="login-input-password"]').should('be.visible')
    cy.get('[data-cy="login-submit"]').should('be.visible')
  })

  it('Should display all cart elements for authenticated user', () => {
    cy.uiLogin()
    cy.get('[data-cy="nav-link-logout"]').should('be.visible')

    cy.intercept('GET', '**/products').as('getProducts')
    cy.get('[data-cy="nav-link-products"]').click()
    cy.wait('@getProducts')

    cy.get('[data-cy="product-link"]').first().click()

    cy.get('[data-cy="detail-product-add"]').should('be.visible')
  })
})