import type { NextApiRequest, NextApiResponse } from 'next';
import faunadb, { query as q } from 'faunadb'
import { v4 as uuidv4 } from 'uuid';
import { IProject } from 'interfaces/IProject';
import { hasValue } from 'interfaces/StringService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    let client: faunadb.Client = null
    if (req.method === "POST") {
        try {
            client = new faunadb.Client({ secret: process.env.FAUNA_KEY })

            const newProjectData: IProject = req.body;
            if (!hasValue(newProjectData.name)) {
                return res.status(400).json({ msg: "Project must have a name" });
            }

            let found = await client.query(
                q.Exists(q.Match(q.Index('projects-name'), newProjectData.name))
            )

            if (found) {
                return res.status(400).json({ msg: "Project already exists" });
            }

            if (!found) {
                newProjectData.id = uuidv4()

                const what = await client.query(
                    q.Create(q.Collection('projects'), { data: newProjectData })
                )
                return res.status(201).json({ status: "Success", data: newProjectData.id });
            }
        } catch (error) {
            return res.status(500).json({
                status: "Error",
                data: { msg: "Could not create project", error }
            });
        } finally {
            await client.close()
        }
    }

    return res.status(405).json({ msg: "Method not implemented" });
};