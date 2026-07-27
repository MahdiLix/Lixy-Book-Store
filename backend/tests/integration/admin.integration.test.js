const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");
const {
  SUPERADMIN_CREDENTIALS,
  uniqueSuffix,
} = require("../helpers/testConfig");

describe("ADMIN AUTH & CRUD", () => {
  let superAdBearerToken;
  let createdAdminId;
  let currentAdminPassword;

  const suffix = uniqueSuffix();
  const newAdminEmail = `admin_${suffix}@gemail.com`;
  const newAdminUsername = `admin_${suffix}`;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterAll(async () => {
    if (createdAdminId && superAdBearerToken) {
      try {
        await request(app)
          .delete(`/api/admin/delete/${createdAdminId}`)
          .set("Authorization", superAdBearerToken);
      } catch (error) {
        console.error(`Cleanup failed for admin ${createdAdminId}:`, error);
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

      superAdBearerToken = `Bearer ${res.body.token}`;
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
      // initial password
      currentAdminPassword = "admin2Password";

      const res = await request(app)
        .post("/api/admin/register")
        .set("Authorization", superAdBearerToken)
        .send({
          username: newAdminUsername,
          email: newAdminEmail,
          password: currentAdminPassword,
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBeDefined();

      createdAdminId = res.body.data._id;
    });

    it("should reject registering a duplicate email", async () => {
      const res = await request(app)
        .post("/api/admin/register")
        .set("Authorization", superAdBearerToken)
        .send({
          username: `${newAdminUsername}_dup`,
          email: newAdminEmail,
          password: "anotherPassword",
        });

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
    });
  });

  describe("GET /api/admin/admins", () => {
    it("should get a list of all admins as superadmin", async () => {
      const res = await request(app)
        .get("/api/admin/admins")
        .set("Authorization", superAdBearerToken);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  describe("GET /api/admin/:id", () => {
    it("should get admin data by id as superadmin", async () => {
      const res = await request(app)
        .get(`/api/admin/${createdAdminId}`)
        .set("Authorization", superAdBearerToken);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBe(createdAdminId);
    });

    it("should return 404 when getting a non-existent admin id", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/api/admin/${fakeId}`)
        .set("Authorization", superAdBearerToken);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe("PUT /api/admin/update/:id", () => {
    it("should update admin data by id as superadmin", async () => {
      const res = await request(app)
        .put(`/api/admin/update/${createdAdminId}`)
        .set("Authorization", superAdBearerToken)
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
        .set("Authorization", superAdBearerToken)
        .send({ username: "ghost" });

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe("PATCH /api/admin/password/:id", () => {
    it("should update admin password by id using current and new password", async () => {
      const res = await request(app)
        .patch(`/api/admin/password/${createdAdminId}`)
        .set("Authorization", superAdBearerToken)
        .send({
          currentPassword: currentAdminPassword,
          newPassword: "admin2Password_updated",
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Update the variable so future tests use the new password if needed
      currentAdminPassword = "admin2Password_updated";
    });
  });

  describe("DELETE /api/admin/delete/:id", () => {
    it("should delete admin by id as superadmin", async () => {
      const res = await request(app)
        .delete(`/api/admin/delete/${createdAdminId}`)
        .set("Authorization", superAdBearerToken);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      createdAdminId = null; // prevent afterAll cleanup from running again
    });

    it("should return 404 when deleting an already-deleted admin id", async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const res = await request(app)
        .delete(`/api/admin/delete/${fakeId}`)
        .set("Authorization", superAdBearerToken);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
