import { expect } from "chai";
import request from "supertest";
import app from "../src/index";

describe("Chat API", () => {
  let token: string;

  before(async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testuser", password: "password123" });

    token = res.body.token;
  });

  describe("POST /api/chats", () => {
    it("should create a new chat", async () => {
      const res = await request(app)
        .post("/api/chats")
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "New Chat" });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property("data");
      expect(res.body.data).to.have.property(
        "message",
        "Chat created successfully."
      );
    });

    it("should return 400 if title is missing", async () => {
      const res = await request(app)
        .post("/api/chats")
        .set("Authorization", `Bearer ${token}`)
        .send({});

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        "message",
        "Title and creator ID are required."
      );
    });
  });

  describe("GET /api/chats", () => {
    it("should get user chats", async () => {
      const res = await request(app)
        .get("/api/chats")
        .set("Authorization", `Bearer ${token}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("data");
      expect(res.body.data).to.have.property("chats");
      expect(res.body.data.chats).to.be.an("array");
    });
  });
});
