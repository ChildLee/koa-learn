import {query} from './mysql'

query('select * from provinces limit ?', 1, function (err,results,) {
    console.log(err)
    console.log(results)
})