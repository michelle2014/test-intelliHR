/// <reference types='cypress'/>
// @ts-check
import { environment } from '../../environments'

describe('intelliHR test suite user story #5', () => {   
    
    // // User Story #5
    // it('Manager creates the first skill', () => {
    //     // Manager visits skills page
    //     cy.visit('/spa/settings/skills')

    //     // Type username
    //     cy.get('input[name="username"]').type(environment.Manager_username)

    //     // Type password
    //     cy.get('input[name="password"]').type(environment.Manager_password)

    //     // Find sign in button and click
    //     cy.get('button[type="submit"]').click()

    //     // Click Create Skill button
    //     cy.get('a[href="/spa/settings/skills/create"]').click()

    //     // Check if create form can be cancelled
    //     cy.get('button').contains('Cancel').click()

    //     // Click Create Skill button again for further test
    //     cy.get('a[href="/spa/settings/skills/create"]').click()

    //     // Enter Skill Name
    //     cy.get('input[name="name"]').type('New Skill 1')

    //     // Select Skill Discipline
    //     cy.get('.Select-arrow').click()
    //     cy.contains('Business Systems').click()

    //     // Click x to clear selection
    //     cy.get('.Select-clear').click()

    //     // Select Skill Discipline
    //     cy.get('.Select-arrow').click()
    //     cy.contains('Human Resources').click()

    //     // Enter Skill Description
    //     cy.get('textarea[name="description"]').type('This is the 1st new skill.')

    //     // Check if the skill is business critical or not
    //     // Cypress has some problems when try to find an input to check or uncheck
    //     // Even if the element is clearly visible, Cypress says both width and height are 0, thus invisible 
    //     // cy.get('input[name="isBusinessCritical"]').should('have.attr', 'value=1')

    //     // Enter save to create a new skill
    //     cy.get('button').contains('Save').click()
        
    //     // Search for new skill created and should see new skill name
    //     // New skill may better be listed top and then after refresh listed alphabetically
    //     cy.get('input[name="filterControllerSearchInput"]').type('New Skill 1{enter}')
    //     cy.contains('New Skill 1')
    // })

    it('Manager creates the second skill', () => {

        // Manager visits skills page
        cy.visit('/spa/settings/skills')

        // Type username
        cy.get('input[name="username"]').type(environment.Manager_username)

        // Type password
        cy.get('input[name="password"]').type(environment.Manager_password)

        // Find sign in button and click
        cy.get('button[type="submit"]').click()

        // Set viewport to 550px x 750px
        cy.viewport(1366, 1024) 
       
        // Click Create Skill button again for further test
        cy.get('a[href="/spa/settings/skills/create"]').click()

        // Enter Skill Name
        cy.get('input[name="name"]').type('New Skill 2')

        // Select Skill Discipline
        cy.get('.Select-arrow').eq(1).click()
        cy.contains('Business Systems').click()

        // Enter Skill Description
        cy.get('textarea[name="description"]').type('This is the 2nd new skill.')

        // Enter save to create a new skill
        cy.get('button').contains('Save').click()
        
        // Search for new skill created and should see new skill name
        // cy.get('input[name="filterControllerSearchInput"]').type('New Skill 1{enter}')
        // cy.contains('New Skill 1')
        cy.get('input[name="filterControllerSearchInput"]').type('New Skill 2{enter}')
        cy.contains('New Skill 2')
    })

    it('Manager deletes the second skill', () => {

        // Select the kebab menu of the second skill
        cy.get('.fa-ellipsis-v').click()

        // Select Delete option
        cy.contains('Delete').click()

        cy.contains('Are you sure you want to delete this skill?')
        
        // Confirm delete
        cy.get('button').contains('Delete').click()
    })

})