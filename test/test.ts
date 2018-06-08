import query from '../src/config/mysql'

query('select * from area_provinces where ?', [{code: 11}]).then(res => {
    console.log(res[0])
})
