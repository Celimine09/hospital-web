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
    const data = await request.json();
    console.log(data);
    const birthday = new Date(data.birthday);
    // Format the birthday date to MySQL datetime format
    const formattedBirthday = birthday.toISOString().slice(0, 19).replace('T', ' ');

    data.phone_no.toString;
    const sql = `
            INSERT INTO Patient (fname,birthday, lname, gender, phone_no)
            SELECT 
            '${data.name.split(' ')[0]}', 
            '${formattedBirthday}', 
            '${data.name.split(' ')[1]}', 
            '${data.gender}',
            '${data.phone_no}'
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

// export async function PUT(req: NextRequest, res: NextResponse) {
export async function PUT(req: NextRequest) {
    try {
        const data = await req.json();
        console.log("Received data:", data);
        if (data.id !== undefined) {
            const birthday = new Date(data.birthday);
            // Format the birthday date to MySQL datetime format
            const formattedBirthday = birthday.toISOString().slice(0, 19).replace('T', ' ');

            data.phone_no.toString;
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
                message: "Gender or p_id is undefined",
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

export async function DELETE(req: NextRequest) {
    try {
        const data = await req.json();
        console.log(data);

        const sqlUpdateRooms = `
        UPDATE Room
        SET patient_id = NULL
        WHERE patient_id = "${data.p_id}";
    `;
        console.log(sqlUpdateRooms);
        const [updateResults] = await connection.execute(sqlUpdateRooms);
        console.log(updateResults);

        const sqlUpdateMedicalHistory = `
            DELETE FROM MedicalHistory 
            WHERE patient_id = "${data.p_id}";
        `;
        console.log(sqlUpdateMedicalHistory);
        const [updateMedicalResults] = await connection.execute(sqlUpdateMedicalHistory);
        console.log(updateMedicalResults);

        const sqlDeletePatient = `
            DELETE FROM Patient
            WHERE p_id = "${data.p_id}";
        `;

        console.log(sqlDeletePatient);

        const [deletePatient] = await connection.execute(sqlDeletePatient, [data.p_id]);

        console.log(deletePatient);
        await connection.commit();

        return Response.json({
            status: "success",
            message: `Deleted patient record and updated associated rooms`,
        });
    } catch (error) {
        console.error(error);
        return Response.json({
            status: "failed",
            message: `Failed to delete patient record or update associated rooms`
        });
    }
}
