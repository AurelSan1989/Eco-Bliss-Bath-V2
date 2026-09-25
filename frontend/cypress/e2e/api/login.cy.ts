describe('Login API', () => {
  it('should reject unknow user', () => {
    cy.env(['apiUrl']).then((env) => {
      cy.request({
        method: 'POST',
        url: `${env.apiUrl}/login`,
        body: {
          username: "unknow@test.invalid",
          password: 'password',
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(401)
      })
    })
  })
  it('should accept real user', () => {
    cy.env(['apiUrl', 'userEmail', 'userPassword']).then((env) => {
      cy.request({
        method: 'POST',
        url: `${env.apiUrl}/login`,
        body : {
          username: env.userEmail,
          password: env.userPassword,
        }
      }).then((loginResponse) => {
        expect(loginResponse.status).to.equal(200)
        expect(loginResponse.body.token).to.exist
        })
      })
    })
  })