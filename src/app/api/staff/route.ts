import { RowDataPacket } from "mysql2";
import { connection } from "../../database/db.connector"
import { NextRequest, NextResponse } from "next/server";
import { connect } from "http2";


export async function GET(req: NextRequest) {
    const sql_getStaffDatasWithNullIfExists =
        `SELECT 
    s.s_id,
    concat(s.fname, " ", s.lname) as name,
    s.gender,
    s.role_id,
    sr.role_name
    FROM Staff s LEFT OUTER JOIN StaffRole sr ON s.role_id = sr.role_id`

    try {
        const [results, fields] = await connection.query<RowDataPacket[]>(
            sql_getStaffDatasWithNullIfExists
        );
        // console.log("Retrive patient data from backend".green)
        // console.log(results[0])
        // console.log(fields)
        return Response.json({
            status: "success",
            staff: results
        });
    } catch (err) {
        console.log(err);
        return Response.json({
            status: "failed",
        })
    }
}


// insert into Table values (...)
export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        console.log(data)

        const sqlInsertion = `
            insert into Staff(fname="") values (${data.fname})
        `

        const [results] = await connection.execute(sqlInsertion)
        console.log(results)
        return Response.json({
            status: "success",
            message: `POST method called`,
            // A: data
        });
    } catch (error) {
        console.log(error)
        return Response.json({
            status: "failed",
            message: error
        })

    }
}


// ? update Table ...
// export async function PUT(req: NextRequest, res: NextResponse) {
export async function PUT(req: NextRequest) {
    try {
        const data = await req.json()
        console.log(data)

        const sqlUpdate = `
            insert into Staff(fname="") values (${data.fname})
        `

        const [results] = await connection.execute(sqlUpdate)
        console.log(results)
        return Response.json({
            message: `PUT method called`,
        });
    } catch (error) {
        console.log(error)
        return Response.json({
            status: "failed",
            message: error
        })
    }

}

// ? drop data ...
export async function DELETE(req: NextRequest) {
    try {
        const data = await req.json()
        console.log(data)

        const sqlDelete = `
            
        `

        const [results] = await connection.execute(sqlDelete)
        console.log(results)
        return Response.json({
            message: `DELETE method called`,
        });
    } catch (error) {
        console.log(error)
        return Response.json({
            status: "failed",
            message: error
        })
    }
}
