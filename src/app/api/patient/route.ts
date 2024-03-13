import { RowDataPacket } from "mysql2";
import {connection} from "../../database/db.connector"
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const data = await req.json()

    try {
        const [results, fields] = await connection.query<RowDataPacket[]>(
            `SELECT 
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
            left join Building bd on bd.b_id = r.building_id `
        );
        console.log("Retrive rooms data from backend".green)
        console.log(results[0])
        console.log(fields)
        return Response.json({
            status: "success",
            // rooms: results
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

    if(data.operation === "edit"){
        console.log("change staff")
        console.log(data)
        try {
            var name_to_change : string = data.staff_fname_to_change
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
                )
            where r.room_id = ${data.room_id}

            `
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
    return Response.json({
        message: `PUT method called`,
    });
}


export async function DELETE() {
    return Response.json({
        message: `DELETE method called`,
    });
}
