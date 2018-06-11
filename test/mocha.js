const assert = require('assert')
const req = require('supertest')
const app = require('../dist/src/app').default

describe('moduleName', function () {

    describe('moduleName1', function () {
        it('info', function () {
            assert.notStrictEqual({a: 1}, {a: '1'})
        })
    })

    describe('moduleName2', function () {
        it('info', function () {
            req(app.listen()).post('/login').end((err, res) => {
                console.log(res.body)
            })
        })
    })
}) 