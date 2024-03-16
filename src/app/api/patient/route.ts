import { RowDataPacket } from "mysql2";
import { connection } from "../../database/db.connector"
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
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

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        console.log(data)

        const sqlInsertion = `
            insert into Patient(fname="") values (${data.fname})
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

// export async function PUT(req: NextRequest, res: NextResponse) {
export async function PUT(req: NextRequest) {
    try {
        const data = await req.json();
        console.log("Received data:", data);
        if (data.p_id !== undefined) {
            const birthday = new Date(data.birthday);
                // Format the birthday date to MySQL datetime format
                const formattedBirthday = birthday.toISOString().slice(0, 19).replace('T', ' ');
            const sql = `
                UPDATE Patient
                SET fname = "${data.name.split(' ')[0]}",
                    lname = "${data.name.split(' ')[1]}",
                    gender = "${data.gender}",
                    birthday = "${formattedBirthday}",
                    phone_no = "${data.phone_no}"
                WHERE p_id = "${data.p_id}"
            `;
            console.log("SQL query:", sql);

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


export async function DELETE() {
    return Response.json({
        message: `DELETE method called`,
    });
}
