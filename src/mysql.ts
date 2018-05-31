import * as mysql from 'mysql'

const pool = mysql.createPool({
    multipleStatements: true,//允许多条sql语句
    host: '594dd08f4ab56.gz.cdb.myqcloud.com',
    port: 17677,
    user: 'root',
    password: 'ymy2017888888',
    database: 'area'
})

let query = function (sql: string, options: any) {
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