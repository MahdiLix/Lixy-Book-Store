const request = require('supertest');
const app = require('../../app');

async function getUserAuthToken() {
  const res = await request(app)
    .post('/api/admin/login')
    .send({
      email: 'super@admin.gmail.com',
      password: 'SuperAdminSecret12345',
    })
    if (!res) {
      throw new Error(`Invalid Token ${res.status}`)
    }
 
  return res.body.token;
}

module.exports = { getUserAuthToken }