import { RowDataPacket } from "mysql2";
import {connection} from "../../../database/db.connector"
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    try {
        const [results, fields] = await connection.query<RowDataPacket[]>(
            `select 
            concat(fname, " ", lname) as staff_fullname
            from Staff
            `
        );
        console.log("Retrive 'Staff' from backend".green)
        // console.log(fields)
        console.log(results)
        return Response.json({
            status: "success",
            staffs_name: results.map(row => row.staff_fullname)
        });
    } catch (err) {
        console.log(err);
        return Response.json({
            status: "failed",
            message: err
        })
    }

    // return Response.json({
    //     status: "failed"
    // })
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
