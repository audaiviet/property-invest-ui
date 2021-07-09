# Cypress end to end testing
## Environment variables
We need to access env variable FAUNA_KEY to get access to the faunadb.
In cypress env variables can be specify in cypress.json or cypress.env.json (located in main project folder, not cypress folder). Variables of same name in cypress.env.json will override those in cypress.json. Note env variable are specified differently in the two files. Add the files to .gitignore to avoid leaking sensitive data. You can save an example or template file instead.

### env variables in cypress.json
```
{
  env: {
    "FAUNA_KEY": "abc..."
  }
}
```
### env variables in cypress.env.json
To do that add file cypress/cypress.env.json
Add cypress.env.json to .gitignore
Add the following to cypress/cypress.env.json,
```
{
  "FAUNA_KEY": "abc..."
}
```
In your cypress test add,
```
Cypress.env('FAUNA_KEY')
```
## GOTCHAS!!!
The cypress.json file should be in the main project folder, not the cypress folder!!!