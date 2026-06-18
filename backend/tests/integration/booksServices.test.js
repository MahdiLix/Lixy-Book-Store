const path = require("path");
const fs = require("fs");
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const { getUserAuthToken } = require("../helper/userLoginAuth");

describe("BOOKS API TESTS", () => {
  let token;
  let bookId;
  let uploadFilePath = null;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    token = await getUserAuthToken();
  });

  afterAll(async () => {
    await mongoose.disconnect();

    try {
      if (uploadFilePath) {
        const fullPath = path.join("/app", uploadFilePath);
        await fs.unlinkSync(fullPath);

        console.log(`File Cleanup: Removed ${fullPath}`);
      }
    } catch (error) {
      if (error.code !== "ENOENT") {
        console.error(`Cleanup Error: ${error}`);
      }
    }
  });

  describe("POST /api/books/add", () => {
    it("should add a new book to db", async () => {
      const testUploadFilePath = path.join(
        __dirname,
        "..",
        "fixtures",
        "test-image.png",
      );

      const res = await request(app)
        .post("/api/books/add")
        .set("Authorization", `Bearer ${token}`)
        .field("title", "Clean Code")
        .field("author", "Robert C. Martin")
        .attach("bookImage", testUploadFilePath); // attach for send file

      console.log("res.body from bookServices.test.js", res.body);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBeDefined();
      bookId = res.body.data._id;

      expect(res.body.data.bookImage).toBeDefined();
      expect(res.body.data.bookImage).toMatch(/\/uploads\//);

      // use this path to remove test file uploaded
      uploadFilePath = res.body.data.bookImage;
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
          author: "Robert C.C.D. Martin",
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
