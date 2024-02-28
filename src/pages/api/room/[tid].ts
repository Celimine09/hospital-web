import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { tid } = req.query
    res.end(`Post: ${tid}`)
}