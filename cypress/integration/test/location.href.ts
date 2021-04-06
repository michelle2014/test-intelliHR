// @ts-check
/// <reference types="cypress">
import {
    deleteDownloadsFolder, validateCsvFile, 
} from './utils'
import { environment } from '../../environments'

const path = require('path')

describe('file download', () => {
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

            // Wait for 5 seconds
            cy.wait(20000)

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