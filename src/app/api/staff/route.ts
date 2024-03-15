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
        const data = await req.json();
        console.log("Received data:", data);
        if (data.s_id !== undefined) {
            const sql = `
                UPDATE Staff
                SET fname = '${data.name.split(' ')[0]}',
                    lname = '${data.name.split(' ')[1]}',
                    gender = '${data.gender}',
                    role_id = '${data.role_id}'
                WHERE s_id = '${data.s_id}'
            `;
            console.log("SQL query:", sql);
            console.log("SQL parameters:", [data.gender, data.role_id, data.role_name, data.s_id]);

            const [results, fields] = await connection.query<RowDataPacket[]>(
                sql);
            console.log("SQL execution results:", results); return Response.json({
                message: `PUT method called`,
            });
        } else {
            // Handle the case where data.gender or data.s_id is undefined
            return Response.json({
                status: "failed",
                message: "Gender or s_id is undefined",
            });
        }
    } catch (error) {
        console.log(error);
        return Response.json({
            status: "failed",
            message: error,
        });
    }
}


// ? drop data ...
export async function DELETE(req: NextRequest) {
    try {
        const data = await req.json();
        console.log("Received data:", data);

        const sql = `
            DELETE FROM Staff
            WHERE s_id = ${data.s_id}
        `;

        // const [results] = await connection.execute(sqlDelete, [data.s_id]);
        // console.log(results);
        const [results, fields] = await connection.query<RowDataPacket[]>(
            sql);
        return Response.json({
            message: `DELETE method called`,
        });
    } catch (error) {
        console.log(error);
        return Response.json({
            status: "failed",
            message: error,
        });
    }
}
