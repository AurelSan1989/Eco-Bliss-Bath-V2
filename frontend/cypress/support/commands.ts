/// <reference types="cypress" />

Cypress.Commands.add('uiLogin', () => {
    cy.env(['userEmail', 'userPassword']).then((env) => {
      cy.visit("/#/login")

      cy.get('[data-cy="login-input-username"]').type(env.userEmail)
      cy.get('[data-cy="login-input-password"]').type(env.userPassword)
      cy.get('[data-cy="login-submit"]').click()
    })
})

Cypress.Commands.add('apiLogin', () => {
    return cy.env(['apiUrl', 'userEmail', 'userPassword']).then((env) => {
        return cy.request({
            method: 'POST',
            url: `${env.apiUrl}/login`,
            body: {
                username: env.userEmail,
                password: env.userPassword,
            },
        }).then((loginResponse) => {
            const token = loginResponse.body.token
            return token
        })
    })
})

declare global {
    namespace Cypress {
        interface Chainable {
            uiLogin(): Chainable<void>
            apiLogin(): Chainable<string>
        }
    }
}