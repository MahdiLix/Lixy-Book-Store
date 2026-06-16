const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");

describe("LOGIN AUTHENTICATION", () => {
  let token;
  let adminId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST /api/admin/login", () => {
    it("should logged in as Admin or Superadmin", async () => {
      const res = await request(app).post("/api/admin/login").send({
        email: "super@admin.gmail.com",
        password: "SuperAdminSecret12345",
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();

      token = res.body.token;
    });
  });

  describe("POST /api/admin/register", () => {
    it("should add new admin by superadmin", async () => {
      const res = await request(app)
        .post("/api/admin/register")
        .set("Authorization", `Bearer ${token}`)
        .send({
          username: "admintest1",
          email: "admin@test1.com",
          password: "admin@test1",
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBeDefined();

      adminId = res.body.data._id;
    });
  });

  describe("PUT /api/admin/update/:id", () => {
    it("should update user data by _id with superadmin", async () => {
      const res = await request(app)
        .put(`/api/admin/update/${adminId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          email: "admin@test1@update.com",
          password: "admin@test1@passwordUpdated",
        });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe("DELETE /api/admin/delete/:id", () => {
    it("should delete admin by _id with superadmin", async () => {
      const res = await request(app)
        .delete(`/api/admin/delete/${adminId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
