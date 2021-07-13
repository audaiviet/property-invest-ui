import { IProject } from './../../../interfaces/IProject';
import { IApiResponse } from 'services/ErrorService';
import { addProject, deleteProject, getProject, getProjectsByPage, updateProject } from '../../../services/ProjectService';
import { defaultProject } from '../../../interfaces/IProject';

const project = defaultProject
const uuid = () => Cypress._.random(0, 1e6)

context('Project api', () => {

    beforeEach(() => {
        process.env.FAUNA_KEY = Cypress.env('FAUNA_KEY')
    })

    afterEach(() => {
        delete process.env.FAUNA_KEY
    });

    it('Can add a new project', async () => {
        project.name = `TEST.PROJECT.ADD.${uuid()}`

        let response: IApiResponse = await addProject(project)
        expect(response.success).to.equal(true)
        expect(response.status).to.equal(200)

        response = await deleteProject(project.name)
        expect(response.success).to.equal(true)
        expect(response.status).to.equal(200)
    });

    it('Can update a project', async () => {
        project.name = `TEST.PROJECT.UPDATE.${uuid()}`

        let response: IApiResponse = await addProject(project)
        expect(response.success).to.equal(true)
        expect(response.status).to.equal(200)

        response = await getProject(project.name)
        expect(response.success).to.equal(true)
        expect(response.status).to.equal(200)

        const foundProject: IProject = response.data.data
        const newProjectManager = `Super Manager No. ${uuid()}`

        expect(foundProject.projectManager).not.to.equal(newProjectManager)
        
        foundProject.projectManager = newProjectManager
        response = await updateProject(foundProject)
        expect(response.success).to.equal(true)
        expect(response.status).to.equal(200)

        response = await getProject(foundProject.name)
        expect(response.success).to.equal(true)
        expect(response.status).to.equal(200)

        expect(foundProject.projectManager).to.equal(newProjectManager)
    })

    it('Should not add duplicate project', async () => {
        project.name = `TEST.PROJECT.DUPLICATE.${uuid()}`

        let response: IApiResponse = await addProject(project)
        expect(response.success).to.equal(true)
        expect(response.status).to.equal(200)

        response = await addProject(project)
        expect(response.success).to.equal(false)
        expect(response.status).to.equal(400)

        response = await deleteProject(project.name)
        expect(response.success).to.equal(true)
        expect(response.status).to.equal(200)
    })

    it('Can delete an existing project', async () => {
        project.name = `TEST.DELETE.${uuid()}`

        let response: IApiResponse = await addProject(project)
        expect(response.status).to.equal(200)

        response = await deleteProject(project.name)
        expect(response.success).to.equal(true)
        expect(response.status).to.equal(200)
    })
    
    it('Can get projects', async () => {
        const response: IApiResponse = await getProjectsByPage()
        expect(response.status).to.equal(200)
    })
})

