const express = require("express");
const request = require("supertest");

const signup = require("./signup");

const app = express();

app.post("/api/auth", signup);

describe("test signup controller", () => {
  test("signup status-200", async () => {
    const response = await request(app).post("/api/auth");
    expect(response.status).toBe(200);
  });
  test("signup return users email string", async () => {
    const response = await request(app).post("/api/auth");

    const [user] = response.body;
    expect(typeof user.email).toBe("string");
  });
  test("signup return users subscription string", async () => {
    const response = await request(app).post("/api/auth");
    const [user] = response.body;
    expect(typeof user.subscription).toBe("string");
  });
  test("signup return users token string", async () => {
    const response = await request(app).post("/api/auth");
    const [user] = response.body;
    expect(typeof user.token).toBe("string");
  });
});
