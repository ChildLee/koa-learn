import * as mysql from 'mysql2'

const pool = mysql.createPool({
  multipleStatements: true,//允许多条sql语句
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'sa',
  database: 'test'
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

it('should ms', function () {
  setInterval(function () {
    console.time('1')
    query('SELECT `user`.`id`, `user`.`name`, `user`.`created_at`, `user`.`updated_at`, `area`.`id` AS `area.id`, `area`.`name` AS `area.name`, `area`.`created_at` AS `area.created_at`, `area`.`updated_at` AS `area.updated_at`, `area`.`user_id` AS `area.user_id` FROM `users` AS `user` LEFT OUTER JOIN `areas` AS `area` ON `user`.`id` = `area`.`user_id`;').then(res => {
      console.timeEnd('1')
    })
  }, 1111)
})

it('should update', function () {
  query("UPDATE `users` SET `name`=3,`updated_at`='2018-07-11 05:49:26' WHERE `id` = 70").then(res => {
    console.log(res)
  })
})
