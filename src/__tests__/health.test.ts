import request from "supertest";
import createApp from "../configs/app";

describe("Health endpoint", () => {
  it("GET /health returns 200 and status", async () => {
    const app = createApp();
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("status");
  });
});
