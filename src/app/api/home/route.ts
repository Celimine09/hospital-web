import { RowDataPacket } from "mysql2";
import {connection} from "../../database/db.connector"

export async function GET() {
    try {
        const [results, fields] = await connection.query<RowDataPacket[]>(
            // 'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45'
            'select count(*) from Room r'
        );
        console.log(results[0]); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
        console.log(err);
    }

    try {
        const [results2, fields2] = await connection.query<RowDataPacket[]>('select count(*) from Staff s');
        console.log(results2[0]);
        console.log(fields2);
    } catch (err) {
        console.log(err);
    }

    return Response.json({
        message: "GET"
    });
}
    