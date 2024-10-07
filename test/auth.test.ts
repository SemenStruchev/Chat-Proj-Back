import { expect } from "chai";
import request from "supertest";
import app from "../src/index.ts"; // Adjust path based on your project structure

describe("Auth API", () => {
  describe("POST /api/auth/login", () => {
    it("should login a user", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ username: "testuser", password: "password123" });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("token");
    });

    it("should return 401 for invalid credentials", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ username: "wronguser", password: "wrongpassword" });

      expect(res.status).to.equal(401);
      expect(res.body).to.have.property("message", "Invalid credentials.");
    });
  });

  // Add more tests for registration and other auth-related endpoints if needed
});
