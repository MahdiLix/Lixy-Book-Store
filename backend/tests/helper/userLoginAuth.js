const request = require("supertest");
const app = require("../../app");
const { SUPERADMIN_CREDENTIALS } = require("./testConfig");

async function getUserAuthToken() {
  const res = await request(app)
    .post("/api/admin/login")
    .send(SUPERADMIN_CREDENTIALS);

  if (res.status !== 200 || !res.body.token) {
    throw new Error(
      `Login failed while getting test auth token. Status: ${res.status}, Body: ${JSON.parse(res.body)}`,
    );
  }
  return `Bearer ${res.body.token}`
}

module.exports = { getUserAuthToken };
