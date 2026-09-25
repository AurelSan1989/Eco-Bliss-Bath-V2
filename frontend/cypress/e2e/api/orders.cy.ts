describe('Orders API', () => {
  it('should reject unauthenticated requests', () => {
    cy.env(['apiUrl']).then((env) => {
        cy.request({
        method: 'GET', 
        url: `${env.apiUrl}/orders`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(401)
      })
    })
})

  it('should return the cart for real user', () => {
  cy.apiLogin().then((token) => {
    cy.env(['apiUrl']).then((env) => {
      cy.request({
        method: 'GET',
        url: `${env.apiUrl}/orders`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.equal(200)
      })
    })
  })
})

  it('should add available product to the cart', () => {
  cy.apiLogin().then((token) => {
    cy.env(['apiUrl']).then((env) => {
      cy.request({
        method: 'GET',
        url: `${env.apiUrl}/products`,
      }).then((productResponse) => {
        const inStock = productResponse.body.find((product) => product.availableStock > 0)

        cy.request({
          method: 'PUT',
          url: `${env.apiUrl}/orders/add`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: {
            product: inStock.id,
            quantity: 1,
          },
        }).then((addResponse) => {
          expect(addResponse.status).to.equal(200)
        })
      })
    })
  })
})

  it('should reject out-of-stock product', () => {
    cy.apiLogin().then((token) => {
      cy.env(['apiUrl']).then((env) => {
        cy.request({
          method: 'GET',
          url: `${env.apiUrl}/products`,
        }).then((productResponse) => {
          const notInStock = productResponse.body.find((product) => product.availableStock <= 0)

          cy.request({
            method: 'PUT',
            url: `${env.apiUrl}/orders/add`,
            failOnStatusCode: false,
            headers: {
              Authorization : `Bearer ${token}`,
            },
            body: {
              product: notInStock.id,
              quantity: 1,
            }
          }).then((addResponse) => {
            expect(addResponse.status).to.equal(400) // Ou 409
          })
        })
      })
    })
  })
})