import { RowDataPacket } from "mysql2";
import {connection} from "../../database/db.connector"

export async function GET() {
    try {
        const [results1] = await connection.query<RowDataPacket[]>(
            'SELECT COUNT(*) AS roomCount FROM Room r'
        );
        const roomCount = results1[0].roomCount;

        const [results2] = await connection.query<RowDataPacket[]>(
            'SELECT COUNT(*) AS staffCount FROM Staff s'
        );
        const staffCount = results2[0].staffCount;

        return NextResponse.json({
            roomCount,
            staffCount,
        });
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}