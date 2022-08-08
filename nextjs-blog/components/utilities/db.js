import mysql from "mysql2/promise"



export default async function executeQuery(query) {
    const pool =  mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 5
    
    })
    let res = await pool.execute(query)
    
    return res;
}

  
