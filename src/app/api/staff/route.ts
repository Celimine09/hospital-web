import { RowDataPacket } from "mysql2";
import {connection} from "../../database/db.connector"
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const data = await req.json()

    try {
        const [results, fields] = await connection.query<RowDataPacket[]>(
            ``
        );
        console.log("Retrive rooms data from backend".green)
        console.log(results[0])
        console.log(fields)
        return Response.json({
            status: "success",
            rooms: results
        });
    } catch (err) {
        console.log(err);
        return Response.json({
            status: "failed",
        })
    }
}

export async function POST() {
    return Response.json({
        message: `POST method called`,
    });
}


// export async function PUT(req: NextRequest, res: NextResponse) {
export async function PUT(req: NextRequest) {
    return Response.json({
        message: `PUT method called`,
    });
}


export async function DELETE() {
    return Response.json({
        message: `DELETE method called`,
    });
}
