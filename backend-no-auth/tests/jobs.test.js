const supertest = require("supertest");
const mongoose = require("mongoose");
const User = require("../models/jobModel");
const app = require("../app");
const Job = require("../models/jobModel");
const api = supertest(app);

//test GET
describe("GET /api/jobs for all jobs", () => {
  it("must returns all jobs saved", async () => {
    const allJobs = await api
      .get("/api/jobs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

//test POST
describe("POST /api/jobs", () => {
  describe("Create a job", () => {
    it("must save a new job to the systeym with code 201", async () => {
      const newJob = await api
        .post("/api/jobs")
        .send({
          title: "Job title 1",
          type: "Job type 1",
          description: "Job description 1",
          company: {
            name: "Company 1",
            contactEmail: "email1@yahoo.com",
            contactPhone: "012345678",
          },
        })
        .expect(201)
        .expect("Content-Type", /application\/json/);
    });

    it("must fill all the required fields otherwise code 400", async () => {
      const newJob = await api
        .post("/api/jobs")
        .send({
          title: "Job title 1",
          type: "Job type 1",
          description: "Job description 1",
        })
        .expect(400);
    });
  });
});

//test GET BY ID
describe("DELETE /api/jobs", () => {
  describe("Get a specific job by id", () => {
    it("must return that specific job with code 200", async () => {
      const job = await Job.findOne();
      const jobToFind = await api
        .get(`/api/jobs/${job.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);
    });

    it("must return error 400 if job id is invalid", async () => {
      const id = "123";
      const jobToFind = await api.get(`/api/jobs/${id}`).expect(400);
    });    
    
    it("must return error 404 if valid job id but not found", async () => {
      const id = "66fa5dff5da0804da2c91d5a";
      const jobToFind = await api.get(`/api/jobs/${id}`).expect(404);
    });
  });
});

//test PUT BY ID
describe("PUT /api/jobs", () => {
    describe("Edit a specific job", () => {
        it("must return the job with edited information with status 200", async () => {
            const job = await Job.findOne();
            const newJob = {title: "Changed Titled"}
            const jobUpdate = await api
            .put(`/api/jobs/${job.id}`)
            .send(newJob)
            .expect(200)
            .expect("Content-Type", /application\/json/);

            const updateJobCheck = await Job.findById(job.id);

            expect(updateJobCheck.title)
              .toBe(newJob.title);
        } )
    })
})

//test DELETE
describe("DELETE /api/jobs", () => {
  describe("Delete a job", () => {
    it("must delete a job from the system with code 204", async () => {
      const job = await Job.findOne();
      const jobDeleted = await api.delete(`/api/jobs/${job.id}`).expect(204);
    });
  });
});
