/// <reference types='cypress'/>
// @ts-check
import { environment } from '../../environments'

describe('intelliHR test suite user story #8', () => {   
    
    // User Story #8
    it('Admin edits the second email', () => {

        // Visit <tenant>/auth/login
        cy.visit('/auth/login')

        // Log in as an admin
        // Type username
        cy.get('input[name="username"]').type(environment.Admin_username)

        // Type password
        cy.get('input[name="password"]').type(environment.Admin_password)

        // Find sign in button and click
        cy.get('button[type="submit"]').click()

        // Click My Profile
        cy.contains('My Profile').click()

        // Should see my profile page, url doesn't work now need to check later
        cy.contains('Admin Profile')

        // Scroll down to Email Address, url doesn't work now need to check later
        cy.get('Email Address').scrollIntoView().should('be.visible')

        // Click the kebab button on the second email entry, url doesn't work now need to check later
        cy.get('Email Address').find('.kebab').eq(1).click()

        // Should see Edit and Delete and select Edit
        cy.contains('Delete')
        cy.contains('Edit').click()

        // Change Email type, , url doesn't work now need to check later
        

        // Press Save button
        cy.contains('Save').click()

        // Return to the profile page, url doesn't work now need to check later
        cy.contains('Admin Profile')

        // Verify the second email entry has the correct tag, url doesn't work now need to check later
        cy.contains('Work')
    })
})