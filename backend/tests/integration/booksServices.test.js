const path = require("path");
const fs = require("fs");
const request = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const { getUserAuthToken } = require("../helper/userLoginAuth");
const { uniqueSuffix, UPLOAD_ROOT } = require("../helper/testConfig");

describe("BOOKS API TESTS", () => {
  let bearerToken;
  let bookId;
  let bookCleanedUp = false;
  let uploadFilePath;
  const bookTitle = `Clean Code ${uniqueSuffix()}`;
  const bookAuthor = "Robert C. Martin";

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    bearerToken = await getUserAuthToken();
  });

  afterAll(async () => {
    if (bookId && !bookCleanedUp) {
      try {
        const delRes = await request(app)
          .delete(`/api/books/delete/${bookId}`)
          .set("Authorization", bearerToken);

        if (delRes.status !== 200 && delRes.status !== 404) {
          console.error(
            `Unexpected cleanup status for book ${bookId}: ${delRes.status}`,
          );
        }
      } catch (error) {
        console.error(`Cleanup failed for book ${bookId}:`, error);
      }
    }

    if (uploadFilePath) {
      const fileName = path.basename(uploadFilePath);
      const fullPath = path.join(UPLOAD_ROOT, fileName);  
      console.log('uploadFilePath - use for base name', uploadFilePath)
      console.log('UPLOAD_ROOT',UPLOAD_ROOT)
      try {
        await fs.promises.unlink(fullPath);
        console.log(`File Cleanup: Removed ${fullPath}`);
      } catch (error) {
        if (error.code !== "ENOENT") {
          console.error(`Cleanup Error: ${error}`);
        }
      }
    }

    await mongoose.disconnect();
  });

  describe("POST /api/books/add", () => {
    const testUploadFilePath = path.join(
      __dirname,
      "..",
      "fixtures",
      "test-image.png",
    );

    it("should reject adding a book without an auth token", async () => {
      const res = await request(app)
        .post("/api/books/add")
        .field("title", bookTitle)
        .field("author", bookAuthor)
        .attach("bookImage", testUploadFilePath);

      expect(res.status).toBe(401);
    });

    it("should reject adding a book without a required field (title)", async () => {
      const res = await request(app)
        .post("/api/books/add")
        .set("Authorization", bearerToken)
        .field("author", bookAuthor)
        .attach("bookImage", testUploadFilePath);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should add a new book to the db", async () => {
      const res = await request(app)
        .post("/api/books/add")
        .set("Authorization", bearerToken)
        .field("title", bookTitle)
        .field("author", bookAuthor)
        .attach("bookImage", testUploadFilePath);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBeDefined();
      expect(res.body.data.bookImage).toBeDefined();
      expect(res.body.data.bookImage).toMatch(/\/uploads\//);

      bookId = res.body.data._id;
      uploadFilePath = res.body.data.bookImage;
      console.log("uploadFilePath", uploadFilePath);
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

  describe("GET /api/books?q=<title>", () => {
    it("should find the created book by query", async () => {
      const res = await request(app).get(
        `/api/books?q=${encodeURIComponent(bookTitle)}`,
      );

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("should return an empty list for a query that matches nothing", async () => {
      const res = await request(app).get(
        "/api/books?q=this-title-should-never-exist-zzz",
      );

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(0);
    });
  });

  describe("PUT /api/books/update/:id", () => {
    it("should update the selected book by id", async () => {
      const res = await request(app)
        .put(`/api/books/update/${bookId}`)
        .set("Authorization", bearerToken)
        .send({
          author: "Robert C.C.D. Martin",
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it("should return 404 when updating a non-existent book id", async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const res = await request(app)
        .put(`/api/books/update/${fakeId}`)
        .set("Authorization", bearerToken)
        .send({ author: "Nobody" });

      expect(res.status).toBe(404);
    });
  });

  describe("DELETE /api/books/delete/:id", () => {
    it("should delete the selected book by id", async () => {
      const res = await request(app)
        .delete(`/api/books/delete/${bookId}`)
        .set("Authorization", bearerToken);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      bookCleanedUp = true;
    });

    it("should return 404 when deleting an already-deleted book id", async () => {
      const res = await request(app)
        .delete(`/api/books/delete/${bookId}`)
        .set("Authorization", bearerToken);

      expect(res.status).toBe(404);
    });
  });
});
