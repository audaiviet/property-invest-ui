import { IApiResponse } from 'services/ErrorService';
import { deleteProject, getProjectsByPage } from '../../../services/ProjectService';
import { defaultProject } from '../../../interfaces/IProject';
const project = defaultProject

context('Project api', () => {

    before(() => {
    })

    after(() => {
    });

    it.skip('Can add a project', () => {
        expect(true).to.equal(true)
    })

    it.skip("Can add a new project", () => {

        project.name = 'TEST PROJECT 101'

        cy.visit("http://localhost:3000");
        cy.request("POST", "api/project", project)
            .its('status').should('be.equal', 201)
            .its('body').its('status').should('be.equal', 'Success')
    });

    it.skip('Should not add duplicate project', () => {
        project.name = 'TEST-PROJECT-106'

        // Add new project
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: 'http://localhost:3000/api/project',
            body: project
        }).then((response) => {
            console.log(response)
            expect(response.status).to.equal(201)
        })

        // Add duplicate
        cy.request({
            failOnStatusCode: false,
            method: 'POST',
            url: 'http://localhost:3000/api/project',
            body: project
        }).then((resp) => {
            expect(resp.status).to.eq(400)
            expect(resp.body.status).to.eq(400)
            expect(resp.body.detail).to.equal('Project already exists.')
        })
    })

    it('Can get projects', async () => {
        process.env.FAUNA_KEY = Cypress.env('FAUNA_KEY')
        console.log("############ Cypress.env: ", Cypress.env())
        const response: IApiResponse = await getProjectsByPage()
        expect(response.status).to.equal(200)
        console.log("############ data:", response.data)
        delete process.env.FAUNA_KEY
    })

    it('Can delete an existing project', async () => {
        const response: IApiResponse = await deleteProject('TEST-PROJECT-106')
    })
})