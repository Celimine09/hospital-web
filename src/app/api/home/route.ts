import { RowDataPacket } from "mysql2";
import {connection} from "../../database/db.connector"

export async function GET() {
    // connection.connect().then(res => {
    //     console.log(res)
    // }).catch(err => {
    //     console.error(err)
    // })

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
        const [results, fields] = await connection.query(
            // 'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45'
            'select count(*) from Staff s '
        );
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
        console.log(err);
    }

    return Response.json({
        message: `GET method called`,
    });
}

// ! CRUD ครูด
// * create retrieve update delete