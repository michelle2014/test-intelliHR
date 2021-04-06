// @ts-check
const path = require('path')

// Delete downloads folder to make sure the test has 'clean' state before starting
export const deleteDownloadsFolder = () => {
    const downloadsFolder = Cypress.config('downloadsFolder')
  
    cy.task('deleteFolder', downloadsFolder)
  }

// Yield the object
export const validateCsv = (csv: string) => {
    cy.wrap(csv)
//    .then(neatCSV)
//    .then(validateCsvList)
}

// export const validateCsvList = (list: any) => {
//     expect(list, 'number of records').to.have.length(167382)
//     expect(list[2], 'third record').to.deep.equal('D')
// }

// Asserts that the file exists
// Will retry reading the file if it does not initially exist
export const validateCsvFile = (name: string) => {
  const downloadsFolder = Cypress.config('downloadsFolder')
  const filename = path.join(downloadsFolder, name)

  cy.readFile(filename, 'utf8').then(validateCsv)
}