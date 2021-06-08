import addUser from '../../../pages/api/user'

describe("Add a user", () => {
    let req, res;

    beforeEach(() => {
        req = {}
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
        expect(res.json).toBeCalledWith({msg:'Method not implemented'})
    })
})