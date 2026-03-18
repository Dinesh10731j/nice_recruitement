import request from "supertest";
import createApp from "../configs/app";

describe("Routes", () => {
  it("GET /not-found returns 404", async () => {
    const app = createApp();
    const res = await request(app).get("/not-found");
    expect(res.status).toBe(404);
  });
});
