import * as mysql from 'mysql'
import {queryCallback} from 'mysql'

const pool = mysql.createPool({
    multipleStatements: true,//允许多条sql语句
    host: '594dd08f4ab56.gz.cdb.myqcloud.com',
    port: 17677,
    user: 'root',
    password: 'ymy2017888888',
    database: 'area'
})

let query = function (sql: string, options: any, callback: queryCallback) {
    pool.getConnection((err, connection) => {
        if (err) {
            callback(err, null, null)
        } else {
            connection.query(sql, options, (err, results, fields) => {
                connection.release()
                callback(err, results, fields)
            })
        }
    })
}

export {query}