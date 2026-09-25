describe('Products API', () => {
  it('should return the details of a product', () => {
    cy.env(['apiUrl']).then((env) => {
      cy.request({
        method: 'GET',
        url: `${env.apiUrl}/products`,
      }).then((listResponse) => {
        const product = listResponse.body[0]
        cy.request({
          method: 'GET',
          url: `${env.apiUrl}/products/${product.id}`
        }).then((response) => {
          expect(response.status).to.equal(200)
          expect(response.body.id).to.equal(product.id)
          expect(response.body.name).to.equal(product.name)
          expect(response.body.price).to.equal(product.price)
        })
      })
    })
  })
})