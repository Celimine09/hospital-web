require('dotenv').config()
// console.log(process.env)

// Get the client
import 'dotenv/config'
// import {config} from 'dotenv'
import mysql from 'mysql2/promise';

// Create the connection to database
export const connection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PW,
});

// A simple SELECT query
try {
    const [results, fields] = await connection.query(
        // 'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45'
        'select * from Patient'
    );
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
} catch (err) {
    console.log(err);
}

// // Using placeholders
// try {
//     const [results] = await connection.query(
//         'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
//         ['Page', 45]
//     );

//     console.log(results);
// } catch (err) {
//     console.log(err);
// // }


//login 
export async function login(email: string, password: string): Promise<boolean> {
    try {
        const connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USERNAME,
            database: process.env.DB_NAME,
            password: process.env.DB_PW,
        });

        const [results, _] = await connection.query(
            'SELECT * FROM Staff WHERE fname = ? AND password = ?',
            [email, password]
        );

        // Check if results is an array
        if (Array.isArray(results)) {
            return results.length > 0;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error during login:', error);
        return false;
    }
}

