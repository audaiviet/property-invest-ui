import { IProject } from './IProject';

export interface IProjectService {
    exist: (id: string) => boolean
}

export function createProject(project: IProject) {
    
}