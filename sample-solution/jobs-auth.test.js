const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app"); // Your Express app
const api = supertest(app);
const Job = require("../models/jobModel");
const User = require("../models/userModel");

const jobs = [
  {
    title: "Software Engineer",
    type: "Full-time",
    description: "Develop and maintain web applications.",
    company: {
      name: "Tech Corp",
      contactEmail: "hr@techcorp.com",
      contactPhone: "123-456-7890",
    },
  },
  {
    title: "Product Manager",
    type: "Full-time",
    description: "Oversee product development from ideation to launch.",
    company: {
      name: "Innovate Ltd",
      contactEmail: "jobs@innovateltd.com",
      contactPhone: "098-765-4321",
    },
  },
];

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api.post("/api/users/signup").send({
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    phone_number: "1234567890",
    gender: "Male",
    date_of_birth: "1990-01-01",
    membership_status: "Inactive",
  });
  token = result.body.token;
});

describe("Given there are initially some jobs saved", () => {
  beforeEach(async () => {
    await Job.deleteMany({});
    await Promise.all([
      api
        .post("/api/jobs")
        .set("Authorization", "bearer " + token)
        .send(jobs[0]),
      api
        .post("/api/jobs")
        .set("Authorization", "bearer " + token)
        .send(jobs[1]),
    ]);
  });

  it("should return all jobs as JSON when GET /api/jobs is called", async () => {
    await api
      .get("/api/jobs")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should create one job when POST /api/jobs is called", async () => {
    const newJob = {
      title: "Data Scientist",
      type: "Full-time",
      description: "Analyze and interpret complex data.",
      company: {
        name: "Data Insights",
        contactEmail: "careers@datainsights.com",
        contactPhone: "555-123-4567",
      },
    };
    await api
      .post("/api/jobs")
      .set("Authorization", "bearer " + token)
      .send(newJob)
      .expect(201);
  });

  it("should return one job by ID when GET /api/jobs/:id is called", async () => {
    const job = await Job.findOne();
    await api
      .get("/api/jobs/" + job._id)
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("should delete one job by ID when DELETE /api/jobs/:id is called", async () => {
    const job = await Job.findOne();
    await api
      .delete("/api/jobs/" + job._id)
      .set("Authorization", "bearer " + token)
      .expect(204);
    const jobCheck = await Job.findById(job._id);
    expect(jobCheck).toBeNull();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
