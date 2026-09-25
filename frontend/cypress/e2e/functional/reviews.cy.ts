describe('Reviews XSS injection', () => {
  it('should clean script in review comments', () => {
    let onAlert = false
    cy.on('window:alert', () => {
      onAlert = true
    })

    cy.uiLogin()
    cy.get('[data-cy="nav-link-logout"]').should('be.visible')

    cy.intercept('GET', '**/reviews').as("getReviews")
    cy.get('[data-cy="nav-link-reviews"]').click()
    cy.wait('@getReviews')

    cy.get('[data-cy="review-input-title"]').type('Test XSS')
    cy.get('[data-cy="review-input-comment"]').type(`<img src=x onerror="alert('XSS')">`)
    cy.get('[data-cy="review-input-rating-images"]').find('img').first().click()

    cy.intercept('POST', '**/reviews').as('postReview')
    cy.get('[data-cy="review-submit"]').click()
    cy.wait('@postReview')

    cy.contains('[data-cy="review-detail"]', 'Test XSS')
      .find('[data-cy="review-comment"] img')
      .should('not.have.attr', 'onerror')

    cy.then(() => {
      expect(onAlert).to.be.false
    })
  })
})