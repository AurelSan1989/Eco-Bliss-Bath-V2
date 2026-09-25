describe('Reviews API', () => {
  it('should reject unauthenticated review submission', () => {
    cy.env(['apiUrl']).then((env) => {
      cy.request({
        method: 'POST',
        url: `${env.apiUrl}/reviews` ,
        failOnStatusCode: false,
        body: {
          title:"Bravo",
          comment: "Vos produits sont supers attrayants mais je n'ai pas de compte utilisateur",
          rating: 5,
        },
      }).then((response) => {
        expect(response.status).to.equal(401)
      })
    })
  })
  it('should accept a review submission from authenticated user', () => {
    cy.apiLogin().then((token) => {
      cy.env(['apiUrl']).then((env) => {
        cy.request({
        method: 'POST',
        url: `${env.apiUrl}/reviews` ,
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          title:"Bravo",
          comment: "Vos produits sont supers attrayants",
          rating: 5,
        },
      }).then((reviewResponse) => {
        expect(reviewResponse.status).to.equal(200)
      })
      })
      })
    })
  })