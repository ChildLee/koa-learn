import * as request from 'supertest'
import server from '../src/app'

it('should login', () => {
  request(server).post('/api/v1/login')
    .expect(200)
    .then(res => {
      console.log(res.body)
    })
})
