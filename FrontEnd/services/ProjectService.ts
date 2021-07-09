import { IProject } from 'interfaces/IProject';
import { hasValue } from 'interfaces/StringService';
import { NextApiRequest, NextApiResponse } from 'next';
import { useQuery } from 'react-query';
import projectsData from '../test-data/projects'
import { IApiResponse, newApiError } from './ErrorService';
import faunadb, { query as q } from 'faunadb'
import { Constants } from '../constants';

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

export const addProject = function (data: IProject): void {
    console.log(JSON.stringify(data))
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