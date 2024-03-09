import {connection} from "../../database/db.connector"

export async function GET() {
    // connection.connect().then(res => {
    //     console.log(res)
    // }).catch(err => {
    //     console.error(err)
    // })

    try {
        const [results, fields] = await connection.query(
            // 'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45'
            'select * from Room'
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


export async function POST() {
    return Response.json({
        message: `POST method called`,
    });
}


export async function PUT() {
    return Response.json({
        message: `PUT method called`,
    });
}


export async function DELETE() {
    return Response.json({
        message: `DELETE method called`,
    });
}
