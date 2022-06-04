import mysql from "mysql2/promise"



export default async function testRes() {
    const connection = await mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    
    })
    let res = await connection.execute('SELECT * FROM haru_blog.events')
    //console.log(rows)
    return res;
}

  
