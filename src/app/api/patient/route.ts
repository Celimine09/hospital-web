import { RowDataPacket } from "mysql2";
import { connection } from "../../database/db.connector"
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    const sql_getPatientDatasWithNullIfExists =
        `SELECT 
        p_id,
        concat(fname, " ", lname) as name,
        gender,
        birthday,
        phone_no
        FROM Patient`

    try {
        const [results, fields] = await connection.query<RowDataPacket[]>(
            sql_getPatientDatasWithNullIfExists
        );
        return Response.json({
            status: "success",
            patient: results
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
    const data = await req.json()
    console.log(data)
    console.log("PUT on backend /api/patient")

    try {
        var fname: string = data.fname;
        var lname: string = data.lname;
        var phone_no: string = data.phone_no;
        var gender: string = data.gender;
        var birthday: string = data.birthday;
        var p_id: number = data.p_id;

        if (fname === "" || fname === null)
            return;

        const sql = `
            UPDATE Patient
            SET fname = '${fname}',
                lname = '${lname}',
                phone_no = '${phone_no}',
                gender = '${gender}',
                birthday = '${birthday}'
            WHERE p_id = ${p_id}
            `;
        const [results, fields] = await connection.query<RowDataPacket[]>(
            sql);
        console.log(results)
        return Response.json({
            status: `success`,
            message: `saved`,
            // response: results
        });
    } catch (err) {
        console.log(err);
        return Response.json({
            status: "failed",
            message: err
        })
    }
}


export async function DELETE() {
    return Response.json({
        message: `DELETE method called`,
    });
}
