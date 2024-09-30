const mongoose = require("mongoose");
const Job = require("../models/jobModel");

// Get all jobs
const getAllJobs = async (req, res) => {

  try {
    const jobs = await Job.find({ }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Create a new job
const createJob = async (req, res) => {

  try {
    const user_id = req.user._id;
    const newJob = new Job({
      ...req.body,
      user_id,
    });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(404).json({ error: "No such job" });
  }

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      console.log("Job not found");
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Update job by ID
const updateJob = async (req, res) => {
  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(404).json({ error: "No such job" });
  }

  try {
    // const user_id = req.user._id;
    const job = await Job.findOneAndUpdate(
      { _id: jobId },
      { ...req.body },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// Delete job by ID
const deleteJob = async (req, res) => {
  const { jobId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(404).json({ error: "No such job" });
  }

  try {
    // const user_id = req.user._id;
    const job = await Job.findOneAndDelete({ _id: jobId });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getAllJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
};
