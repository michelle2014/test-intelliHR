/// <reference types='cypress'/>
/// <reference path="../../support/index.d.ts" />
// @ts-check

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
        cy.get('input[name="username"]').type('charlie')

        // Type password
        cy.get('input[name="password"]').type('fishactivitystrengthneedle')

        // Find sign in button and click
        cy.get('button[type="submit"]').click()

        // Should see the dashboard
        cy.url().should('include', '/dashboard')

        // Verify that h1 containing greeting is visible, html doesn't come with a h1 tag, so only the text is verified with the div
        cy.get('.header-greeting').should('have.text', 'Good evening, Charlie')
    })


    it('normal user logs out successfully', 
    
        {"retries": 3},

        () => {

        // Log out
        cy.get('a[href="https://qa-tech-test-demo.uat.internihr.ninja/auth/logout"]')
        
        cy.wait(10000)
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
        cy.get('input[name="username"]').type('kenphil')

        // Type password
        cy.get('input[name="password"]').type('actvisitoredgetool')

        // Find sign in button and click
        cy.get('button[type="submit"]').click()

        // Set viewport to 550px x 750px
        cy.viewport(1366, 1024) 

        // Click My Profile
        cy.contains('My Profile').click()

         // Wait for 5 seconds
         cy.wait(10000)

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
    it('Admin click on "Export People" button, download a csv file and saved it into downloads folder', () => {
        
        // Visit <tenant>/auth/login, it is actually not successfuly redirected, so the baseUrl is used
        cy.visit('/auth/login')

        // Log in as a manager
        // Type username
        cy.get('input[name="username"]').type('qaadmin')

        // Type password
        cy.get('input[name="password"]').type('lotworsetermeye')

        // Find sign in button and click
        cy.get('button[type="submit"]').click()

        // Set viewport to 550px x 750px
        cy.viewport(1366, 1024) 

        // Click People
        cy.contains('People').click()

        // Wait for 5 seconds
        cy.wait(5000)

        // Click Export People to download
        cy.contains('Export People').click()

        // Wait for 5 seconds
        cy.wait(5000)

        // Verify csv downloaded exists
        cy.readFile('../intelliHR/cypress/downloads/people-export-qa_tech_test_demo-2021[0-9]*.csv')
    })
})