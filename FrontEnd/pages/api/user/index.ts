import { IOktaProfile } from 'interfaces/IOktaProfile';
import { IUser } from 'interfaces/IUser';
import type { NextApiRequest, NextApiResponse } from 'next';
import faunadb, { query as q } from 'faunadb'
import { v4 as uuidv4 } from 'uuid';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let client: faunadb.Client = null
  if (req.method === "POST") {
    try {
      client = new faunadb.Client({ secret: process.env.FAUNA_KEY })

      const data = req.body as IOktaProfile;
      const authId = data.sub
      let found = await client.query(
        q.Exists(q.Match(q.Index('users-authId'), authId))
      )

      if (found) {
        return res.status(204).json({ status: "Success", data: authId });
      }

      if (!found) {

        const newUser: IUser = {
          authId: data.sub, // unique id at id provider (sub field for okta-id field in nextauth)
          userId: uuidv4(), // id in our system (guid string), not database record id
          fullName: data.name,
          firstName: data.given_name,
          lastName: data.family_name,
          userName: data.preferred_username,
          email: data.email
        }
        const what = await client.query(
          q.Create(q.Collection('users'), { data: newUser })
        )
        return res.status(201).json({ status: "Success", data: authId });
      }
    } catch (error) {
      return res.status(500).json({
        status: "Error",
        data: { msg: "Could not create user", error }
      });
    } finally {
      await client.close()
    }
  }

  return res.status(405).json({ msg: "Method not implemented" });
};