// load type definitions that come with Cypress module
/// <reference types="cypress" />
// @ts-check

declare namespace Cypress {
    interface Chainable {

        login(): void
    }
}