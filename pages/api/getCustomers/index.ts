import { NextApiRequest, NextApiResponse } from 'next'
import faunadb from 'faunadb'

const secret = process.env.FAUNADB_SECRET_KEY
const q = faunadb.query;
const client = new faunadb.Client({ secret })

export default async (_: NextApiRequest, res: NextApiResponse) => {
    try {
        const dbs = await client.query(
            q.Map(
                q.Paginate(
                    q.Match(
                        q.Index('all_customers')
                    )
                ),
                ref => q.Get(ref)
            )
        ) as { data: object }
        res.status(200).json(dbs.data)
    }
    catch(error) {
        res.status(500).json({Error: error.message})
    }
}