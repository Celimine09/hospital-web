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
export async function POST(req: NextRequest) {
    const data = await req.json();
    console.log(data);
    console.log('kuy');
    const sql = `
            INSERT INTO Staff (fname,role_id, lname, gender)
            SELECT 
            '${data.name.split(' ')[0]}', 
            '${data.role_id}', 
            '${data.name.split(' ')[1]}', 
            '${data.gender}'
        `
    console.log(sql)

    try {
        const res = await connection.execute<any>(sql)
        console.log(res)
        return Response.json({
            status: "success",
            message: res[0]
        });
    } catch (error) {
        return Response.json({
            status: "failed",
            error: error
        });
    }
}

// ? update Table ...
// export async function PUT(req: NextRequest, res: NextResponse) {
export async function PUT(req: NextRequest) {
    try {
        const data = await req.json();
        console.log("Received data:", data);
        if (data.id !== undefined) {
            const sql = `
                UPDATE Staff
                SET fname = '${data.name.split(' ')[0]}',
                    lname = '${data.name.split(' ')[1]}',
                    gender = '${data.gender}',
                    role_id = '${data.role_id}'
                WHERE s_id = '${data.id}'
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
        console.log(data);

        const sqlUpdateRooms = `
        UPDATE Room
        SET staff_id = NULL
        WHERE staff_id = "${data.s_id}";
    `;
        console.log(sqlUpdateRooms);
        const [updateResults] = await connection.execute(sqlUpdateRooms);
        console.log(updateResults);

        const sqlUpdateMedicalHistory = `
            DELETE FROM MedicalHistory  
            WHERE doctor_id = "${data.s_id}";
        `;
        console.log(sqlUpdateMedicalHistory);
        const [updateMedicalResults] = await connection.execute(sqlUpdateMedicalHistory);
        console.log(updateMedicalResults);

        const sqlDeleteStaff = `
            DELETE FROM Staff 
            WHERE s_id = "${data.s_id}";
        `;
        console.log(sqlDeleteStaff);
        const [deleteResults] = await connection.execute(sqlDeleteStaff);
        console.log(deleteResults);

        await connection.commit();

        return NextResponse.json({
            status: "success",
            message: `Deleted staff record and updated associated rooms`,
            result: {
                deleteResults,
                updateMedicalResults
            }
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: "failed",
            message: `Failed to delete staff record or update associated rooms`
        });
    }
}