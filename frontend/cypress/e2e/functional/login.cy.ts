describe('Login UI', () => {
  it('should log', () => {
    cy.uiLogin()

    cy.get('[data-cy="nav-link-cart"]').should('be.visible')
    cy.get('[data-cy="nav-link-logout"]').should('be.visible')
  })
})