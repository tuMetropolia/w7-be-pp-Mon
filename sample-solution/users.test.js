const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");

beforeAll(async () => {
  await User.deleteMany({});
});

describe("User Routes", () => {
  describe("POST /api/users/signup", () => {
    it("should signup a new user with valid credentials", async () => {
      // Arrange
      const userData1 = {
        name: "Rami",
        email: "test@example.com",
        password: "R3g5T7#gh",
        phone_number: "09-123-47890",
        gender: "Male",
        date_of_birth: "1999-01-01",
        membership_status: "Active",
      };

      const userData = {
        name: "Rami",
        email: "test@example.com",
        password: "R3g5T7#gh",
        phone_number: "09-123-47890",
        gender: "Male",
        date_of_birth: "1999-01-01",
        membership_status: "Active",
      };

      // Act
      const result = await api.post("/api/users/signup").send(userData);

      console.log(result.body.token);

      // Assert
      expect(result.status).toBe(201);
      expect(result.body).toHaveProperty("token");
    });
  });

  describe("POST /api/users/login", () => {
    it("should login a user with valid credentials", async () => {
      // Arrange
      const userData = {
        email: "test@example.com",
        password: "R3g5T7#gh",
      };

      // Act
      const result = await api.post("/api/users/login").send(userData);

      // Assert
      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty("token");
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
