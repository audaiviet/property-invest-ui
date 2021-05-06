export interface IProject {
    id: string,
    name: string,
    startDate: string,
    endDate: string,
    estimatedDurationInDays: number,
    estimatedCost: number,
    annualInterestRateOffered: number,
    projectManager: string,
    description: string,
    images: string[],
}