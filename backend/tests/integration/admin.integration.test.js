const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const {
  SUPERADMIN_CREDENTIALS,
  uniqueSuffix,
} = require("../helper/testConfig");



describe("ADMIN AUTH & CRUD", () => {
  let bearerToken;
  let createdAdminId;
  const suffix = uniqueSuffix();
  const newAdminEmail = `admin_${suffix}@gemail.com`;
  const newAdminUsername = `admin_${suffix}`;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    if (createdAdminId && bearerToken) {
      try {
        await request(app)
          .delete(`/api/admin/delete/${createdAdminId}`)
          .set("Authorization", bearerToken);
      } catch (error) {
        console.error(`Cleanup failed for book ${createdAdminId}:`, error);
      }
    }
    await mongoose.disconnect();
  });

  describe("POST /api/admin/login", () => {
    it("should log in as Admin or Superadmin with valid credentials", async () => {
      const res = await request(app)
        .post("/api/admin/login")
        .send(SUPERADMIN_CREDENTIALS);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();

      bearerToken = `Bearer ${res.body.token}`;
    });

    it("should reject login with an incorrect password", async () => {
      const res = await request(app).post("/api/admin/login").send({
        email: SUPERADMIN_CREDENTIALS.email,
        password: "wrong-password-123",
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it("should reject login with a non-existent email", async () => {
      const res = await request(app).post("/api/admin/login").send({
        email: "does-not-exist@gemail.com",
        password: "whatever",
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe("POST /api/admin/register", () => {
    it("should reject registration without an auth token", async () => {
      const res = await request(app).post("/api/admin/register").send({
        username: "no_auth_admin",
        email: "no_auth_admin@gemail.com",
        password: "incorrectPassword",
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it("should register a new admin when authenticated as superadmin", async () => {
      const res = await request(app)
        .post("/api/admin/register")
        .set("Authorization", bearerToken)
        .send({
          username: newAdminUsername,
          email: newAdminEmail,
          password: "admin2Password",
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBeDefined();

      createdAdminId = res.body.data._id;
       
    });

    it("should reject registering a duplicate email", async () => {
      const res = await request(app)
        .post("/api/admin/register")
        .set("Authorization", bearerToken)
        .send({
          username: `${newAdminUsername}_dup`,
          email: newAdminEmail, // same email as above, on purpose
          password: "anotherPassword",
        });

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
    });
  });

  describe("PUT /api/admin/update/:id", () => {
    it("should update admin data by id as superadmin", async () => {
      const res = await request(app)
        .put(`/api/admin/update/${createdAdminId}`)
        .set("Authorization", bearerToken)
        .send({
          username: `${newAdminUsername}_updated`,
          email: `updated_${newAdminEmail}`,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it("should return 404 when updating a non-existent admin id", async () => {
      const fakeId = new mongoose.Types.ObjectId();
   
      const res = await request(app)
        .put(`/api/admin/update/${fakeId}`)
        .set("Authorization", bearerToken)
        .send({ username: "ghost" });

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe("PATCH /api/admin/password/:id", () => {
    it("should update admin password by id", async () => {
      const res = await request(app)
        .patch(`/api/admin/password/${createdAdminId}`)
        .set("Authorization", bearerToken)
        .send({
          password: "admin2Password.updated",
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe("DELETE /api/admin/delete/:id", () => {
    it("should delete admin by id as superadmin", async () => {
      const res = await request(app)
        .delete(`/api/admin/delete/${createdAdminId}`)
        .set("Authorization", bearerToken);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      createdAdminId = null;
    });

    it("should return 404 when deleting an already-deleted admin id", async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const res = await request(app)
        .delete(`/api/admin/delete/${fakeId}`)
        .set("Authorization", bearerToken);

      expect(res.status).toBe(404);
    });
  });
});
