const express = require("express");
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobControllers");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

router.get("/", getAllJobs);
router.get("/:jobId", getJobById);

router.use(requireAuth);

router.post("/", createJob);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);

module.exports = router;
