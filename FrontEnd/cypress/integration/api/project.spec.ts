import { defaultProject } from './../../../interfaces/IProject';

const project = defaultProject
context('Project api', () => {
    it('Can add a project', () => {
        expect(true).to.equal(true)
    })

    it("Can add a new project", () => {

        project.name = 'TEST PROJECT 101'

        cy.visit("http://localhost:3000");
        cy.request("POST", "api/project", project)
            .its('status').should('be.equal', 201)
            .its('body').its('status').should('be.equal', 'Success')
    });

    it('Should not add duplicate project', () => {
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
})