import query from './mysql'

query('select * from provinces where code=? limit ? ', [11, 1]).then(res => {
    console.log(res)
})