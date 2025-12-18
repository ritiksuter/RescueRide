import request from "supertest";
import app from "../src/app.js"; // if app is started directly, you can refactor to export app separately

describe("Auth Service - Basic", () => {
  it("health check works", async () => {
    const res = await request("http://localhost:8001").get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});
