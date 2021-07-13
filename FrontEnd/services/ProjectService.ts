import { IProject } from 'interfaces/IProject';
import { hasValue } from './StringService';
import { NextApiRequest, NextApiResponse } from 'next';
import { useQuery } from 'react-query';
import projectsData from '../test-data/projects'
import { IApiResponse, newApiError } from './ErrorService';
import faunadb, { query as q } from 'faunadb'
import { Constants } from '../constants';
import { v4 as uuidv4 } from 'uuid';

export async function getProjectsData(): Promise<IProject[]> {
    const res = await fetch(process.env.PROJECTS_SERVICE);
    if (!res.ok) {
        throw new Error('Network response was not ok')
    }
    return res.json();
}

export async function getTestProjectsData(): Promise<IProject[]> {
    return new Promise((resolve, reject) => resolve(projectsData));
}

export const useProjects = () => {
    return useQuery('projects', getTestProjectsData)
}

export async function getAllProjects(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json(newApiError(405, '000003', 'Method not implemented'));
    }

    let client: faunadb.Client = null
    try {
        client = new faunadb.Client({ secret: process.env.FAUNA_KEY })

        let found = await client.query(
            q.Map(
                q.Paginate(q.Match(q.Index("all-projects")), { size: Constants.PROJECT_PAGESIZE }),
                x => q.Get(x)
            )
        )

        return res.status(200).json({ status: "Success", data: found });

    } catch (error) {
        return res.status(500).json(newApiError(500, '000004', 'Could not get projects', error));
    } finally {
        client && await client.close()
    }
}

export async function getProjectsByPage(): Promise<IApiResponse> {
    let client: faunadb.Client = undefined
    try {
        client = new faunadb.Client({ secret: process.env.FAUNA_KEY })
        let found = await client.query(
            q.Map(
                q.Paginate(q.Match(q.Index("all-projects")), { size: Constants.PROJECT_PAGESIZE }),
                x => q.Get(x)
            )
        )
        return { success: true, status: 200, data: found };
    }
    catch (error) {
        return newApiError(500, '000004', 'Could not get projects', error);
    }
    finally {
        client && client.close()
    }
}

export async function deleteProject(name: string): Promise<IApiResponse> {
    let client: faunadb.Client = undefined
    try {
        client = new faunadb.Client({ secret: process.env.FAUNA_KEY })
        let response = await client.query(
            q.Delete(q.Select("ref", q.Get(q.Match(q.Index("projects-name"), name))))
        )
        return { success: true, status: 200 };
    }
    catch (error) {
        return newApiError(500, '000005', 'Error deleting project', error);
    }
    finally {
        client && client.close()
    }
}

export async function getProject(name: string): Promise<IApiResponse> {
    let client: faunadb.Client = undefined
    try {
        client = new faunadb.Client({ secret: process.env.FAUNA_KEY })
        let response = await client.query(
            q.Get(q.Select("ref", q.Get(q.Match(q.Index("projects-name"), name))))
        )
        return { success: true, status: 200, data: response };
    }
    catch (error) {
        return newApiError(500, '000004', 'Project service', error);
    }
    finally {
        client && client.close()
    }
}

export async function updateProject(project: IProject): Promise<IApiResponse> {
    let client: faunadb.Client = undefined
    try {
        client = new faunadb.Client({ secret: process.env.FAUNA_KEY })
        let response = await client.query(
            q.Update(q.Select("ref", q.Get(q.Match(q.Index("projects-name"), project.name))), {
                data: project
            })
        )
        return { success: true, status: 200, data: response };
    }
    catch (error) {
        return newApiError(500, '000007', 'Project service', error);
    }
    finally {
        client && client.close()
    }
}

export async function addProject(project: IProject): Promise<IApiResponse> {
    let client: faunadb.Client = undefined
    try {
        client = new faunadb.Client({ secret: process.env.FAUNA_KEY })

        if (!hasValue(project.name)) {
            return newApiError(400, '000002', 'Validation error');
        }

        let found = await client.query(
            q.Exists(q.Match(q.Index('projects-name'), project.name))
        )

        if (found) {
            return newApiError(400, '000001', 'Validation error');
        }

        if (!found) {
            project.id = uuidv4()

            const what = await client.query(
                q.Create(q.Collection('projects'), { data: project })
            )
            return { success: true, status: 200, data: project.id };
        }
    } catch (error) {
        return {
            success: false,
            status: 500,
            errors: [
                { code: '100000', message: JSON.stringify(error) }
            ]
        };
    } finally {
        await client.close()
    }
}