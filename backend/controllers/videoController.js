const Video = require("../models/videoModel");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const uploadVideo = async (req, res) => {
  const { title, description, googleDriveFileId, embedUrl, userId } = req.body;

  try {
    const video = new Video({
      title,
      description,
      googleDriveFileId,
      embedUrl,
      userId: userId, // User ID from session or JWT
    });

    await video.save();
    res.status(200).json({ message: "Video uploaded successfully", video });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload video", error });
  }
};
const searchVideos = async (req, res) => {
  const { query, tags, userId } = req.query; // Get query, tags, and userId from query params

  try {
    // Create the aggregation pipeline for the query
    const pipeline = [
      // Match the userId to ensure only the logged-in user's videos are returned
      { $match: { userId: new mongoose.Types.ObjectId(userId) } },

      // If there's a query, search by title and description
      ...(query
        ? [
            {
              $match: {
                $or: [
                  { title: { $regex: query, $options: "i" } }, // Case-insensitive search for title
                  { description: { $regex: query, $options: "i" } }, // Case-insensitive search for description
                ],
              },
            },
          ]
        : []),

      // If tags are provided, match videos that contain the specified tags
      ...(tags
        ? [{ $match: { tags: { $in: tags.split(",") } } }] // Match tags if provided
        : []),

      // Project the desired fields to return from the video collection
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          tags: 1,
          videoUrl: 1,
          duration: 1,
          createdAt: 1,
          updatedAt: 1,
          googleDriveFileId: 1, // Include Google Drive file ID if applicable
          embedUrl: 1, // Include the embed URL for Google Drive videos
          isGoogleDrive: 1, // Whether the video is from Google Drive
        },
      },

      // Optionally, sort results if you want to return them in a particular order
      {
        $sort: { createdAt: -1 }, // Sort by creation date (descending order)
      },
    ];

    // Execute the aggregation pipeline
    const videos = await Video.aggregate(pipeline);

    // Send the video data in the response
    res.status(200).json(videos); // Return the matched video data
  } catch (error) {
    // Handle any errors
    res.status(500).json({
      error: "Failed to search videos",
      details: error.message,
    });
  }
};

const getVideos = async (req, res) => {
  const {
    userId,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "desc",
    tags,
  } = req.query;

  try {
    const pipeline = [
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) }, // Match the logged-in user's videos
      },
      ...(tags ? [{ $match: { tags: { $in: tags.split(",") } } }] : []), // Filter by tags if provided
      { $sort: { [sortBy]: order === "desc" ? -1 : 1 } }, // Sort results
      { $skip: (parseInt(page) - 1) * parseInt(limit) }, // Skip for pagination
      { $limit: parseInt(limit) }, // Limit results
      {
        $project: {
          title: 1,
          description: 1,
          tags: 1,
          duration: 1,
          videoUrl: 1,
          googleDriveFileId: 1,
          embedUrl: 1,
          isGoogleDrive: 1, // Added to check if video is from Google Drive
          createdAt: 1,
          updatedAt: 1,
          userId: 1, // User ID to match the video to the correct user
        },
      },
    ];

    // Execute the aggregation pipeline
    const videos = await Video.aggregate(pipeline);

    // Count total videos for pagination metadata
    const totalVideos = await Video.countDocuments({
      userId: userId,
      ...(tags && { tags: { $in: tags.split(",") } }),
    });

    res.status(200).json({
      videos,
      totalVideos,
      totalPages: Math.ceil(totalVideos / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error("Error in fetching videos:", error); // Log the error
    res
      .status(500)
      .json({ error: "Failed to fetch videos", details: error.message });
  }
};

module.exports = { uploadVideo, searchVideos, getVideos };
