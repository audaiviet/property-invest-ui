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
    images: string[], // Project photos
    amountRequired: number, // Amount required for project
    amountReceived: number, // Amount invested so far by people. Computed property
    investmentUnit: number, // People can invest multiples of this amount (£1000, x * £1000)
    interestRate?: number,
    isActive: boolean,
    isDeleted: boolean,
    isCompleted: boolean,
}

export const defaultProject = {
    id: undefined,
    name: '',
    startDate: undefined,
    endDate: undefined,
    estimatedDurationInDays: undefined,
    estimatedCost: undefined,
    annualInterestRateOffered: undefined,
    projectManager: '',
    description: '',
    images: [], // Project photos
    amountRequired: 0, // Amount required for project
    amountReceived: 0, // Amount invested so far by people. Computed property
    investmentUnit: 0, // People can invest multiples of this amount (£1000, x * £1000)
    interestRate: 0,
    isActive: false,
    isDeleted: false,
    isCompleted: false,
}