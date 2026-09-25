describe('Cart UI', () => {
  it('should add a product to the cart', () => {
    cy.uiLogin()
    cy.get('[data-cy="nav-link-logout"]').should('be.visible')

    cy.env(['apiUrl']).then((env) => {
      cy.request({
        method: 'GET',
        url: `${env.apiUrl}/products`,
      }).then((productResponse) => {
        const inStock = productResponse.body.find((product) => product.availableStock > 0)
        
        cy.intercept('GET', '**/products').as('getProducts')
        
        cy.get('[data-cy="nav-link-products"]').click()
        cy.wait('@getProducts')

        cy.contains('[data-cy="product"]', inStock.name).find('[data-cy="product-link"]').click()
        cy.get('[data-cy=detail-product-name]').should('contain', inStock.name)

        cy.get('[data-cy="detail-product-add"]').click()

        cy.contains('[data-cy="cart-line"]', inStock.name).should('be.visible')
      })
    })
  })

  it('sould décrémenter le stock correctement', () => {
    cy.uiLogin()
    cy.get('[data-cy="nav-link-logout"]').should('be.visible')

    cy.intercept('GET', '**/products').as('getProducts')

    cy.get('[data-cy="nav-link-products"]').click()
    cy.wait('@getProducts')
    cy.get('[data-cy="product-link"]').first().click()
    cy.get('[data-cy="detail-product-stock"]')
    .invoke('text')
    .should('match', /-?\d+/)
    .then((stockBeforeText) => {
      const stockBefore = parseInt(stockBeforeText.match(/-?\d+/) [0], 10)
      cy.get('[data-cy="detail-product-add"]').click()
      cy.reload()
      cy.get('[data-cy="detail-product-stock"]')
      .invoke('text')
      .should('match', /-?\d+/)
      .then((stockAfterText) => {
        const stockAfter = parseInt(stockAfterText.match(/-?\d+/)[0], 10)

       expect(stockAfter).to.equal(stockBefore - 1)
      })
    })
  })
})