import * as mysql from 'mysql'

const pool = mysql.createPool({
    multipleStatements: true,//允许多条sql语句
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'sa',
    database: 'area'
})

let query = function (sql, options = []) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            err ? reject(err)
                : connection.query(sql, options, (err, results, fields) => {
                    connection.release()
                    err ? reject(err) : resolve(results)
                })
        })
    })
}

export default query