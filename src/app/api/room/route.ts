import { RowDataPacket } from "mysql2";
import { connection } from "../../database/db.connector"
import { NextRequest, NextResponse } from "next/server";
import { RestaurantRounded } from "@mui/icons-material";


export async function GET() {
    // connection.connect().then(res => {
    //     console.log(res)
    // }).catch(err => {
    //     console.error(err)
    // })
    const sql_getRoomDatasWithNullIfExists = `
    SELECT distinctrow
concat(p.fname, " ", p.lname) as patient,
concat(s.fname, " ", s.lname) as staff,
r.room_number,
rt.type_name AS room_type,
mh.admission_date,
r.floor,
bd.building_name,
r.room_id
FROM Room r Left Join Patient p on r.patient_id = p.p_id
Left Join Staff s ON s.s_id = r.staff_id
Left Join RoomType rt on rt.rt_id = r.roomtype_id
left join MedicalHistory mh on mh.patient_id = p.p_id
left join Building bd on bd.b_id = r.building_id 
    `

    try {
        const [results, fields] = await connection.query<RowDataPacket[]>(
            sql_getRoomDatasWithNullIfExists
            // 'select * from Room'
        );
        console.log("Retrive rooms data from backend".green)
        console.log(results[0])
        // console.log(fields)

        // return 
        return Response.json({
            // message: `GET method called`,
            status: "success",
            rooms: results
        });
    } catch (err) {
        console.log(err);
        return Response.json({
            status: "failed",
        })
    }

    // return Response.json({
    //     // message: `GET method called`,
    //     message: `GET method called`,
    // });
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
    console.log("PUT on backend /api/room")

    if (data.operation === "changeStaff") {
        console.log("change staff")
        console.log(data)
        try {
            var name_to_change: string = data.staff_fname_to_change
            console.log(name_to_change)

            if (name_to_change === "" || name_to_change === null)
                return;

            const sql = `
            UPDATE  Room r 
            SET     r.staff_id  = (
                    SELECT s.s_id 
                    FROM Staff s
                    WHERE s.fname = '${name_to_change}'
                    -- WHERE s.fname = '${'นานะ'}'
                    limit 1
                )
            where r.room_id = ${data.room_id}

            `
            console.log(sql)
            const [results, fields] = await connection.query<RowDataPacket[]>(
                sql);
            console.log(results)
            return Response.json({
                status: `success`,
                message: `changed staff in room ${data.room_id}`,
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
    else if (data.operation === "changePatient") {
        console.log("change patient")
        console.log(data)
        try {
            var name_to_change: string = data.patient_fullname_to_change
            name_to_change = name_to_change?.trim()
            name_to_change = name_to_change?.split(" ")[0]
            console.log(name_to_change)

            if (name_to_change === "")
                return;

            const sql = `
            UPDATE  Room r 
            SET     r.patient_id  = (
                    SELECT p.p_id 
                    FROM Patient p
                    WHERE p.fname = '${name_to_change}'
                    -- WHERE p.fname = '${'นานะ'}'
                )
            where r.room_id = ${data.room_id}

            `
            console.log(sql)
            const [results, fields] = await connection.query<RowDataPacket[]>(
                sql);
            console.log(results)
            return Response.json({
                status: `success`,
                message: `changed patient in room ${data.room_id}`,
                // response: results
            });
        } catch (err) {
            console.log(err);
            return Response.json({
                status: "failed",
                message: JSON.stringify(err)
            })
        }
    }
    else {
        return Response.json({
            status: `failed`,
            message: `put unknow operation`,
        });
    }

}


export async function DELETE(req: NextRequest) {
    const data = await req.json()
    console.log(data)
    console.log("Clear room on DELETE METHOD")
    if (data.room_id !== undefined) {
        console.log("Clear staff and patient from this room")
        try {
            const [results, fields] = await connection.query<RowDataPacket[]>(
                `
                    update Room
                    set patient_id = null, staff_id = null
                    where room_id = ${data.room_id}
                `
            );
            console.log(results)
            return Response.json({
                status: `success`,
                message: `cleared room id[${data.room_id}]`,
                response: results
            });
        } catch (err) {
            console.log(err);
            return Response.json({
                status: "failed",
                message: err
            })
        }
    }
    return Response.json({
        message: `DELETE method called`,
    });
}
