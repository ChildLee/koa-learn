import query from './db/mysql'
import query1 from './db/mysql1'

query('select * from provinces where code=? limit ? ', [11, 1]).then(res => {
    console.log(res)
})

query1('select * from area_provinces where code=? limit ? ', [11, 1]).then(res => {
    console.log(res)
})