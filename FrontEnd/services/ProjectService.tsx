import { IProject } from 'interfaces/IProject';
import { useQuery } from 'react-query';
import projectsData from 'test-data/projects'

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

export const addProject = function(data:IProject): void {
    console.log(JSON.stringify(data))
}