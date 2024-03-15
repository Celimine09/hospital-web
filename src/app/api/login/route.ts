import { connection } from "@/app/database/db.connector";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function GET(request: NextRequest) {
        const [results] = await connection.query<RowDataPacket[]>(
            `select * from Staff`
        )

        const data = results.map((staff) => {
            return {
                "username": staff.fname,
                "password": staff.password
            }
        })

}

export async function POST(request: NextRequest) {
    const data = await request.json()
    console.log(data)
    // todo 1 ) get data from db (all usernames & pws)
    // todo 2 ) is data from req matchs in db


    const [results] = await connection.query<RowDataPacket[]>(
        `select fname,password from Staff`
    )

    const datas = results.map((staff) => {
        return {
            "username": staff.fname,
            "password": staff.password
        }
    })

    const range = results.length;
    var status:boolean = false;
    console.log(status)

    for(let i = 0 ; i < range ; i++){
        if( data.username === results[i].fname && data.password === results[i].password) {
            status = true;
            console.log(status) 
            break;
        }

        
    }

    return Response.json({
        status : status
    })

}