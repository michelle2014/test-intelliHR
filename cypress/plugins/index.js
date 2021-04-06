/// <reference types="cypress" />
const fs = require('fs')
const { rmdir } = require('fs')
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {

    // a task to find one file matching the given mask
    // returns just the first matching file
    
    // Find the file downloaded within the downloads folder
    async findFiles (mask) {
      if (!mask) {
        throw new Error('Missing a file mask to search')
      }

      console.log('searching for files %s', mask)
      
      // Get the file list
      const list = fs.readdirSync(mask);
      
      // If no file
      if (!list.length) {
        console.log('found no files')

        return null
      }

      // Get the first file found
      console.log('found %d files, first one %s', list.length, list[0])

      return list[0]
    },

    // Delete the downloads folder to clean the state before the test
    deleteFolder (folderName) {
      console.log('deleting folder %s', folderName)

      return new Promise((resolve, reject) => {
        rmdir(folderName, { maxRetries: 10, recursive: true }, (err) => {
          if (err) {
            console.error(err)

            return reject(err)
          }

          resolve(null)
        })
      })
    },
  })
}
