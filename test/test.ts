import query from '../src/config/mysql'

query('select * from area_provinces where code=? limit ? ', [11, 1]).then(res => {
    console.log(res)
})
