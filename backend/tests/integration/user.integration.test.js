const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const {
  SUPERADMIN_CREDENTIALS,
  uniqueSuffix,
} = require("../helper/testConfig");

describe("USER AUTH & CRUD", () => {
  let superAdBearerToken;
  let userBearerToken;
  let createdUserId;
  let currentUserPassword;

  const suffix = uniqueSuffix();
  const newUserEmail = `user_${suffix}@gemail.com`;
  const newUserUsername = `user_${suffix}`;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Log in as superadmin to perform admin-level actions (like GET /users)
    const adminLoginRes = await request(app)
      .post("/api/admin/login")
      .send(SUPERADMIN_CREDENTIALS);

    superAdBearerToken = `Bearer ${adminLoginRes.body.token}`;
  });

  afterAll(async () => {
    if (createdUserId && superAdBearerToken) {
      try {
        // Force cleanup using admin token in case the user didn't delete themselves
        await request(app)
          .delete(`/api/users/delete/${createdUserId}`)
          .set("Authorization", superAdBearerToken);
      } catch (error) {
        console.error(`Cleanup failed for user ${createdUserId}:`, error);
      }
    }
    await mongoose.disconnect();
  });

  describe("POST /api/users/register", () => {
    it("should register a new normal user without an auth token", async () => {
      currentUserPassword = "userPassword123";

      const res = await request(app).post("/api/users/register").send({
        username: newUserUsername,
        email: newUserEmail,
        password: currentUserPassword,
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBeDefined();

      createdUserId = res.body.data._id;
    });

    it("should reject registering a duplicate email", async () => {
      const res = await request(app)
        .post("/api/users/register")
        .send({
          username: `${newUserUsername}_dup`,
          email: newUserEmail,
          password: "anotherPassword",
        });

      expect(res.status).toBe(409);
      expect(res.body.success).toBe(false);
    });
  });

  describe("POST /api/users/login", () => {
    it("should log in as a normal user with valid credentials", async () => {
      const res = await request(app).post("/api/users/login").send({
        email: newUserEmail,
        password: currentUserPassword,
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();

      userBearerToken = `Bearer ${res.body.token}`;
    });

    it("should reject login with an incorrect password", async () => {
      const res = await request(app).post("/api/users/login").send({
        email: newUserEmail,
        password: "wrong-password-123",
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe("GET /api/users/users", () => {
    it("should reject getting all users if logged in as a normal user", async () => {
      const res = await request(app)
        .get("/api/users/users")
        .set("Authorization", userBearerToken);

      expect(res.status).toBe(403);  
      expect(res.body.success).toBe(false);
    });

    it("should get a list of all users as superadmin", async () => {
      const res = await request(app)
        .get("/api/users/users")
        .set("Authorization", superAdBearerToken);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  describe("GET /api/users/:id", () => {
    it("should get user data by id with user token", async () => {
      const res = await request(app)
        .get(`/api/users/${createdUserId}`)
        .set("Authorization", userBearerToken);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBe(createdUserId);
    });

    it("should return 404 when getting a non-existent user id", async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .get(`/api/users/${fakeId}`)
        .set("Authorization", userBearerToken);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe("PUT /api/users/update/:id", () => {
    it("should update user data by id and ignore role injection", async () => {
      const res = await request(app)
        .put(`/api/users/update/${createdUserId}`)
        .set("Authorization", userBearerToken)
        .send({
          username: `${newUserUsername}_updated`,
          email: `updated_${newUserEmail}`,
          role: "admin",  
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      // Ensure the role NOT changed to admin
      expect(res.body.data.role).toBe("user");
    });

    it("should return 404 when updating a non-existent user id", async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const res = await request(app)
        .put(`/api/users/update/${fakeId}`)
        .set("Authorization", superAdBearerToken)
        .send({ username: "ghost" });

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe("PATCH /api/users/password/:id", () => {
    it("should update user password by id using current and new password", async () => {
      const res = await request(app)
        .patch(`/api/users/password/${createdUserId}`)
        .set("Authorization", userBearerToken)
        .send({
          currentPassword: currentUserPassword,
          newPassword: "userPassword_updated",
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      // Update variable for any future tests
      currentUserPassword = "userPassword_updated";
    });
  });

  describe("DELETE /api/users/delete/:id", () => {
    it("should delete user by id with user token", async () => {
      const res = await request(app)
        .delete(`/api/users/delete/${createdUserId}`)
        .set("Authorization", userBearerToken);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      createdUserId = null; // prevent afterAll cleanup from running again
    });

    it("should return 404 when deleting an already-deleted user id", async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const res = await request(app)
        .delete(`/api/users/delete/${fakeId}`)
        .set("Authorization", superAdBearerToken);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
