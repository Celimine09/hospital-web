import { RowDataPacket } from "mysql2/promise";
import { connection } from "../../database/db.connector";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const [results1, fields1] = await connection.query('select count(*) from Room r');
        console.log(results1);
        console.log(fields1);
    } catch (err) {
        console.log(err);
    }

    try {
        const [results2, fields2] = await connection.query('select count(*) from Staff s');
        console.log(results2);
        console.log(fields2);
    } catch (err) {
        console.log(err);
    }

    return Response.json({
        message: "GET"
    });
}
    