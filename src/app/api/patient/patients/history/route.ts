import { RowDataPacket } from "mysql2";
import { connection } from "@/app/database/db.connector"
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";


export async function GET(req: NextRequest) {
    // const data = await req.json()
    console.log("Retrive patients history data from backend".green)

    try {
        const [results, fields] = await connection.query<RowDataPacket[]>(
            `
            select mh.h_id as history_id,
mh.patient_id,
concat(p.fname, " ", p.lname) as patient_name,
s.s_id as doctor_id,
concat(s.fname, " ", s.lname) as doctor_name,
simple_diagnosis,
diagnosis_desc,
admission_date ,
discharge_date ,
bill_price 
from
MedicalHistory mh 
left join Patient p ON p.p_id = mh.patient_id
left join Staff s ON s.s_id = mh.doctor_id 
            `
        );
        console.log(results)
        console.log(fields)
        return Response.json({
            status: "success",
            history: results.map((res) => {
                return {
                    id: res.history_id,
                    history_id: res.history_id,
                    // patient : {
                    //     patient_id : res.patient_id,
                    //     patient_name : res.patient_name,
                    // },
                    // doctor : {
                    //     doctor_id : res.doctor_id,
                    //     doctor_name : res.doctor_name,
                    // },
                    patient_id: res.patient_id,
                    patient_name: res.patient_name,
                    doctor_id: res.doctor_id,
                    doctor_name: res.doctor_name,
                    simple_diagnosis: res.simple_diagnosis,
                    diagnosis_desc: res.diagnosis_desc,
                    admission_date: res.admission_date,
                    discharge_date: res.discharge_date,
                    bill_price: res.bill_price,
                }
            })
        });
    } catch (err) {
        console.log(err);
        return Response.json({
            status: "failed",
        })
    }
}

export async function POST(req: NextRequest) {
    const data = await req.json()
    console.log("Requets from History POST is ...")
    console.log(data)
    const sql = `
    INSERT INTO MedicalHistory (
        patient_id, doctor_id, simple_diagnosis,
        diagnosis_desc, admission_date, discharge_date,
        bill_price
    )
    SELECT
        patient_subquery.p_id,
        staff_subquery.s_id,
        "${data.simple_diagnosis}",
        "${data.diagnosis_desc}",
        ${data.admission_date},
        ${data.discharge_date},
        ${data.bill_price}
    FROM
        (
            SELECT p_id
            FROM Patient
            -- WHERE CONCAT(fname, " ", lname) = "${data.patient_name}"
            WHERE CONCAT(fname, " ", lname) = "นาทีทอง มองอะไร"
        ) AS patient_subquery
    CROSS JOIN
        (
            SELECT s_id
            FROM Staff
            -- WHERE CONCAT(fname, " ", lname) = "ชลที มียา"
            WHERE CONCAT(fname, " ", lname) = "${data.doctor_name}"
        ) AS staff_subquery;
    
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
    const data = await req.json();

    console.log("change history to new one (using old data to rewrite).")
    console.log(data)
    const sql = `
update MedicalHistory mh
inner join Patient p on p.p_id = mh.patient_id 
inner join Staff s on s.s_id = mh.doctor_id 
set 
	mh.patient_id = (select p2.p_id
		from Patient p2
		-- where CONCAT(p2.fname, " ", p2.lname) = "เปาวริชชี่ ร่ำรวยงาน" 
		where CONCAT(p2.fname, " ", p2.lname) = "${data.patient_name}" 
	),
	mh.doctor_id  = (select s2.s_id
		from Staff  s2
		-- where CONCAT(s2.fname, " ", s2.lname) = "ชลที มียา"
		where CONCAT(s2.fname, " ", s2.lname) = "${data.doctor_name}"
	),
    mh.diagnosis_desc = "${data.diagnosis_desc}",
    mh.simple_diagnosis = "${data.simple_diagnosis}",
    mh.admission_date = ${data.admission_date},
    mh.discharge_date = ${data.discharge_date},
    mh.bill_price = "${data.bill_price}"
where mh.h_id = "${data.history_id}"
`
    console.log(sql)
    try {
        const [results] = await connection.execute(sql)
        await connection.commit()
        return Response.json({
            status: "success",
            msg: "updated data on db",
            result: results
        });
    } catch (error) {
        console.error(error)
        return Response.json({
            status: "failed",
            msg: "failed update data on db",
            error: error
        });
    }
}


export async function DELETE(req: NextRequest) {
    try {
        const data = await req.json()
        console.log("deleting history from DELETE http method")
        console.log(data)
        const sql = `
    delete from MedicalHistory where h_id = "${data.history_id}";
        `
        console.log(sql)
        const [results] = await connection.execute(sql)
        console.log(results)
        await connection.commit()
        return NextResponse.json({
            stats: "success",
            msg: `deleted`,
            result: results
        });
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            stats: "failed",
            msg: `history is not deleted`,
            error: error
        });

    }
}
