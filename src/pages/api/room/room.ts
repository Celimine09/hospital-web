import type { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import { NextResponse } from 'next/server'

const cors = Cors({
    methods: ['GET', 'HEAD']
})


// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
// function runMiddleware(req:NextApiRequest, res:NextResponse<ResponseData>, fn:any) {
async function runMiddleware(req:NextApiRequest, res:any, fn:any) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result:any) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}


type ResponseData = {
    message: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    // const { username, email } = req.body
    // await runMiddleware(req, res, cors)
    switch (req.method) {
        case "PATCH":
            break;
        case "POST":
            break;
        case "GET":
            break;

        default:
            break;
        // res.redirect(307, "/")
    }
    res.status(200).json({ message: 'Room data' })
}