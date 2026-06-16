const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const { getUserAuthToken } = require("../helper/userLoginAuth");

describe("BOOKS API TESTS", () => {
  let token;
  let bookId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    token = await getUserAuthToken();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe("POST /api/books/add", () => {
    it("should add a new book to db", async () => {
      const res = await request(app)
        .post("/api/books/add")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Clean Code",
          author: "Robert C Martin",
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBeDefined();

      bookId = res.body.data._id;
    });
  });

  describe("GET /api/books", () => {
    it("should return all books from db", async () => {
      const res = await request(app).get("/api/books");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  describe("GET /api/books?q=clean code", () => {
    it("should find books by query", async () => {
      const res = await request(app).get("/api/books?q=clean code");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });
  });

  describe("PUT /api/books/update", () => {
    it("should update selected book by id", async () => {
      const res = await request(app)
        .put(`/api/books/update/${bookId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          author: "Robert C.C.C Martin",
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

  describe("DELETE /api/books/delete", () => {
    it("should delete selected book by id", async () => {
      const res = await request(app)
        .delete(`/api/books/delete/${bookId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
