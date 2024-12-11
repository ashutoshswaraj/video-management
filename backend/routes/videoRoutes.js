const express = require("express");
const {
  uploadVideo,
  searchVideos,
  getVideos,
} = require("../controllers/videoController");

const router = express.Router();

// Protected route: Upload a video
router.post("/upload", uploadVideo);

// Protected route: Search videos
router.get("/search", searchVideos);

// Protected route: Get all videos (e.g., pagination, filtering)
router.get("/allvideos", getVideos);

module.exports = router;
