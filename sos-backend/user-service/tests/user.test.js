import request from "supertest";

describe("User Service - Basic", () => {
  it("health check works", async () => {
    const res = await request("http://localhost:8002").get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
  });
});
