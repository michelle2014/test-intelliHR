/// <reference types='cypress'/>
/// <reference path="../../support/index.d.ts" />
import {
    deleteDownloadsFolder, validateCsvFile, 
} from './utils'
// @ts-check
import { environment } from '../../environments'

describe('intelliHR test suite', () => {   
    
    // User Story #1
    it('intelliHR homepage successfully loads and intelliHR logo is visible', () => {
        
        // Visit intelliHR homepage
        cy.visit('https://intellihr.co/')
        
        // Find logo image within header and verify visibility
        cy.get('header').find('.ihr-header-logo').should('be.visible')
    })

    // User Story #2
    it('find and click links, taken to SEEK page and verify content of "The Role"', () => {

        // Find 'Careers' link and click
        cy.get('footer').find('a[href="/company/careers/"]').click()
        
        // Taken to the Careers page
        cy.url().should('include', '/company/careers/')
        
        // Find Quality Engineer link and click
        cy.get('a[href="https://intellihr.co/company/career/quality-assurance-engineer-i/"]').click()
        
        // Taken to Quality Engineer page
        cy.url().should('include', '/company/career/quality-assurance-engineer-i/')
        
        // Find Apply Now and click
        cy.get('a[href="https://www.seek.com.au/job/51833149"]').click()
        
        // Taken to SEEK page
        cy.url().should('include', '/job/51833149')
        
        // Find the content of "The Role" containing "the role" is visible
        cy.contains('the role')
    })

    // User Story #3
    it('tenant login page loads succesfully and username and password fields are visible', () => {

        // Visit <tenant>/spa/settings
        cy.visit('/spa/settings')

        // Should see the login page
        cy.url().should('include', 'auth/login?redirect_url=')

        // Verify username field is visible
        cy.get('input[name="username"]')

        // Verify password field is visible
        cy.get('input[name="password"]')
    })

    // User Story #4
    it('normal user login page loads successfullly, log in then should see the dashboard and h1 containing greeting visible', () => {
        
        // Visit <tenant>/auth/login
        cy.visit('/auth/login')

        // Should see the login page
        cy.url().should('include', '/auth/login')

        // Type username
        cy.get('input[name="username"]').type(environment.Normal_User_username)

        // Type password
        cy.get('input[name="password"]').type(environment.Normal_User_password)

        // Find sign in button and click
        cy.get('button[type="submit"]').click()

        // Should see the dashboard
        cy.url().should('include', '/dashboard')

        // Verify that h1 containing greeting is visible, html doesn't come with a h1 tag, so only the text is verified with the div
        cy.get('.header-greeting').contains(/^Good \w+, Charlie/)
    })


    it('normal user logs out successfully', 
    
        {"retries": 3},

        () => {

        // Log out
        cy.get('a[href="https://qa-tech-test-demo.uat.internihr.ninja/auth/logout"]')
        
    })

    // User Story #5
    it('Manager creates the first skill', () => {
        // Manager visits skills page
        cy.visit('/spa/settings/skills')

        // Type username
        cy.get('input[name="username"]').type(environment.Manager_username)

        // Type password
        cy.get('input[name="password"]').type(environment.Manager_password)

        // Find sign in button and click
        cy.get('button[type="submit"]').click()

        // Wait for 5 seconds
        cy.wait(5000)

        // Click Create Skill button
        cy.get('a[href="/spa/settings/skills/create"]').click()

        // Check if create form can be cancelled
        cy.get('button').contains('Cancel').click()

        // Click Create Skill button again for further test
        cy.get('a[href="/spa/settings/skills/create"]').click()

        // Enter Skill Name
        cy.get('input[name="name"]').type('New Skill 1')

        // Select Skill Discipline
        cy.get('.Select-arrow').click()
        cy.contains('Business Systems').click()

        // Click x to clear selection
        cy.get('.Select-clear').click()

        // Select Skill Discipline
        cy.get('.Select-arrow').click()
        cy.contains('Human Resources').click()

        // Enter Skill Description
        cy.get('textarea[name="description"]').type('This is the 1st new skill.')

        // Check if the skill is business critical or not
        // Cypress has a problem when try to find an input to check or uncheck
        // Even if the element is clearly visible, Cypress says both width and height are 0, thus invisible 
        cy.get('input[id="isBusinessCritical"]').should('not.be.visible').check({force:true}).should('have.value', '1')

        // Enter save to create a new skill
        cy.get('button').contains('Save').click()
        
        // Search for new skill created and should see new skill name
        // New skill may better be listed top and then after refresh listed alphabetically
        cy.get('input[name="filterControllerSearchInput"]').type('New Skill 1{enter}')
        cy.contains('New Skill 1')

        // Clear input field
        cy.get('input[name="filterControllerSearchInput"]').clear()
    
        // Click Create Skill button again for further test
        cy.get('a[href="/spa/settings/skills/create"]').click()

        // Enter Skill Name
        cy.get('input[name="name"]').type('New Skill 2')

        // Select Skill Discipline
        cy.get('.Select-arrow').click()
        cy.contains('Business Systems').click()
        
        // Enter Skill Description
        cy.get('textarea[name="description"]').type('This is the 2nd new skill.')

        // Check if the skill is business critical or not
        // Cypress has a problem when try to find an input to check or uncheck
        // Even if the element is clearly visible, Cypress says both width and height are 0, thus invisible 
        cy.get('input[id="isBusinessCritical"]').should('not.be.visible').uncheck({force:true}).should('have.value', '0')

        // Enter save to create a new skill
        cy.get('button').contains('Save').click()
        
        // Search for new skill created and should see both skill names
        // Check New Skill 1 first
        cy.get('input[name="filterControllerSearchInput"]').type('New Skill 1{enter}')
        cy.contains('New Skill 1')

        // Clear input field
        cy.get('input[name="filterControllerSearchInput"]').clear()

        // Check New Skill 2 also exists
        cy.get('input[name="filterControllerSearchInput"]').type('New Skill 2{enter}')
        cy.contains('New Skill 2')
        
        // Select the kebab menu of the second skill
        cy.get('.fa-ellipsis-v').click()

        // Select Delete option
        cy.contains('Delete').click()

        cy.contains('Are you sure you want to delete this skill?')
        
        // Confirm delete
        cy.get('.alert').click()

        // Clear input field
        cy.get('input[name="filterControllerSearchInput"]').clear()

        // Check only New Skill 1 exists
        cy.get('input[name="filterControllerSearchInput"]').type('New Skill 1{enter}')
        cy.contains('New Skill 1')

        // Clear input field
        cy.get('input[name="filterControllerSearchInput"]').clear()
       
        // Check New Skill 2 not exists
        cy.get('span').contains('New Skill 2').should('not.exist')
    })


    // User Story #6
    it('normal user tries to log in configuration editing page without success', () => {

        // Normal user tries to log in configuration editing page
        cy.visit('/configuration/edit')

        // Should see the login page
        cy.url().should('include', '/auth/login')

        // Normal user login
        cy.login()

        // Should see 'Page Not Found'
        cy.contains('Page Not Found')

        // A sad intelliman image is visible
        cy.get('#404-app').find('img')
          .should('have.attr', 'src', 'https://uat-assetsbucket-kim652owks5f.s3.amazonaws.com/images/errors/404-intelliman.svg')
    })

    // User Story #7
    it('Manager sees "Job" tab on my profile page, click on that tag should see "Remuneration Schedule"', () => {
        
        // Visit <tenant>/auth/login
        cy.visit('/auth/login')

        // Type username
        cy.get('input[name="username"]').type(environment.Manager_username)

        // Type password
        cy.get('input[name="password"]').type(environment.Manager_password)

        // Find sign in button and click
        cy.get('button[type="submit"]').click()

        // Set viewport to 550px x 750px
        cy.viewport(1366, 1024) 

        // Click My Profile
        cy.contains('My Profile').click()

         // Wait for 5 seconds
         cy.wait(5000)

        // Find Job tab and click
        cy.get('a[href="/spa/people/18a58789-556f-42f1-90f5-4df2e01bdc10/jobs"]').click()

        // Should see "Remuneration Schedule" section
        cy.contains('Remuneration Schedule')

        // Find the button within "Remuneration Schedule" and click
        cy.get('button').contains('Show Content').eq(0).click()

        // Salary figure should show
        cy.contains('Base Annual Salary')
    })


    // User Story #9
    // No Direct Reports under Ken Phil

    // User Story #10
    // Configure downloads folder
    const downloadsFolder = Cypress.config('downloadsFolder')
    
    beforeEach(deleteDownloadsFolder)

    context('finds file', () => {

        it('CSV file', () => {

            // Visit <tenant>/auth/login, it is actually not successfuly redirected, so the baseUrl is used
            cy.visit('/auth/login')

            // Log in as a manager
            // Type username
            cy.get('input[name="username"]').type(environment.Admin_username)

            // Type password
            cy.get('input[name="password"]').type(environment.Admin_password)

            // Find sign in button and click
            cy.get('button[type="submit"]').click()

            // Set viewport to 550px x 750px
            cy.viewport(1366, 1024) 

            // Click People
            cy.contains('People').click()

            // Wait for 10 seconds
            cy.wait(10000)

            // Click Export People to download
            cy.contains('Export People').click()
        
            // Wait for 5 seconds
            cy.wait(5000)

            cy.log('**find the file**')
            const mask = downloadsFolder
            
            // Validate CSV file with returned filename
            cy.task('findFiles', mask).then((foundFile) => {
                expect(foundFile).to.be.a('string')
                cy.log(`found file ${foundFile}`)
                cy.log('**confirm downloaded file**')
                validateCsvFile(`${foundFile}`)
            })
        })
    })
})