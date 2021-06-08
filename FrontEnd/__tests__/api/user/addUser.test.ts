import addUser from '../../../pages/api/user'

jest.mock('faunadb', () => ({
    ...jest.requireActual('faunadb'),
    Client: jest.fn().mockImplementation((x) => ({
        query: jest.fn((x) => Promise.resolve(true)),
        close: jest.fn().mockResolvedValue(0)
    })),
}));

import faunadb from 'faunadb'

describe("Add a user", () => {
    let req, res;

    beforeEach(() => {
        req = {
            method: 'POST',
            body: {}
        }
        res = {
            status: jest.fn(() => res),
            end: jest.fn(),
            json: jest.fn(x => x)
        }
    })

    test("Should return 405 if method not POST", async () => {
        req.method = 'GET'

        const response = await addUser(req, res)

        expect(res.status).toBeCalledWith(405)
        expect(res.json).toBeCalledWith({ msg: 'Method not implemented' })
    })

    test("Should return 204 if user found", async () => {
        jest.spyOn(faunadb, 'Client').mockImplementation((x) => ({
            query: jest.fn((x) => Promise.resolve(true)),
            close: jest.fn().mockResolvedValue(0)
        }))
        const response = await addUser(req, res)
        expect(res.status).toBeCalledWith(204)
    })

    test("Should return 201 if user NOT found", async () => {
        jest.spyOn(faunadb, 'Client').mockImplementation((x) => ({
            query: jest.fn((x) => Promise.resolve(false)),
            close: jest.fn().mockResolvedValue(0)
        }))
        const response = await addUser(req, res)
        expect(res.status).toBeCalledWith(201)
    })
})