# test-intelliHR

This repo is a test assessment designed for intelliHR.

## How to run the test

This repo uses automation framework [Cypress](https://docs.cypress.io/guides/overview/why-cypress#Cypress-in-the-Real-World).

Please execute the following command to run the test:

```
yarn run test-intelliHR
```

## User Story #1 - Easy
As an anonymous User
When I visit <https://www.intellihr.com>
Then I should see the intelliHR public homepage
Verify intelliHR logo is visible

## User Story #2 - Medium
As an anonymous User
When I visit <https://www.intellihr.com>
Then I can find a link to 'Careers'
When I click this link
Then I am taken to the Careers page
Then I click on the "Quality Engineer" career link
Then I click on the "Apply Now" button to open the relevant SEEK page
Verify content of "The Role" is visible

## User Story #3 - Easy
As a non-logged in user
When I visit <tenant>/spa/settings
Then I should see the login page <tenant>/auth/login
Verify username and password fields are visible

## User Story #4 - Medium
As an authenticated user <normal user>
When I visit <tenant>/auth/login
Then I should see the login page
When I login with the correct credentials
Then I should see the dashboard
Verify h1 which contains greeting is visible (eg. Good Morning, <name>)

## User Story #5 - Hard
As an authenticated user <Manager>
When I visit <tenant>/spa/settings/skills
Then I press 'Create Skill' button
Then I enter all of the mandatory data
Then I press 'Save' button
Then I see 1 newly Skill listed

Then I create a new skill once again
Then I see 2 Skills listed
When I select the kebab menu for the second skill
Then I select 'Delete' option
Then I confirm, by selecting the 'Delete' option
Verify out of the 2 skills created, only the first skill is listed

## User Story #6 - Easy
As an unauthenticated user <normal user>
When I visit <tenant>/configuration/edit
Then I should see the login page
When I login with the correct credentials
Then I should see 'Page Not Found'
Verify a sad intelliman image is visible

## User Story #7 - Medium
As an authenticated user <Manager>
When I visit my profile page (left-hand side)
Then I should see a 'Job' tab
When I click on that tab
Then I should see 'Remuneration Schedule' section
Then I select "Show Content" button within the 'Remuneration Schedule' section
Verify that a salary figure is visible

## User Story #8 - Very Hard
As an authenticated user <Admin>
When I visit my profile page (left-hand side)
Then I should see my profile page
When I scroll down to 'Email Address' section
Then I click the kebab button on the second email entry
Then I should see 'Edit' and 'Delete' option
Then I select 'Edit' option
Then I change the Email Type to the other type (eg. Personal -> work) or (Work -> Personal)
Then I press the Save button
Then I am returned to the profile page
Verify the second email entry has the correct tag (eg. if selected work it should show 'work' for that email)

## User Story #9 - Easy
As an authenticated Manager (<Manager>)
When I visit <User>/spa/people/<User id>
Then I select 'Job' tab
Then I should 'Reporting' section
Verify that <user> is shown under 'Direct Reports'
User Story #10 - Medium
As an authenticated Admin (<Admin>)
When I visit People page
Then I Click on 'Export People' button
I can download a csv file and it is saved into <downloads> folder