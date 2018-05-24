import * as mysql from 'mysql'

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sa',
    database: 'area'
})

connection.connect()

connection.query('select * from area_provinces', (err, results) => {
    console.log(results)
})

connection.end()
