import { NextRequest, NextResponse } from "next/server";
import { connection } from "../../database/db.connector";

export async function GET() {
    try {
        const [results, fields] = await connection.query(
            // Fname and password from staff
            'SELECT fname FROM Staff'
        );
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available

        // Return the results from the database
        return NextResponse.json({
            success: true,
            data: results // Sending data back to the client
        });

    } catch (err: any) { // Explicitly typing 'err' as 'any'
        console.log(err);
        return NextResponse.json({
            success: false,
            error: err.message // You can customize the error response as needed
        }, { status: 500 }); // Set appropriate status code
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const data = await req.json();
        console.log(data);

        // Process the data, maybe insert into database or perform other operations

        return NextResponse.json({
            success: true
        });

    } catch (err: any) { // Explicitly typing 'err' as 'any'
        console.log(err);
        return NextResponse.json({
            success: false,
            error: err.message // You can customize the error response as needed
        }, { status: 500 }); // Set appropriate status code
    }
}
