// const mongoose = require("mongoose");

// // Define the Video schema
// const videoSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Title is required"],
//       trim: true,
//     },
//     description: {
//       type: String,
//       default: "",
//       trim: true,
//     },
//     tags: {
//       type: [String], // Array of tags for filtering or searching
//       default: [],
//     },
//     fileSize: {
//       type: Number,
//       required: [true, "File size is required"],
//     },
//     videoUrl: {
//       type: String, // URL where the video file is stored
//       required: [true, "Video URL is required"],
//     },
//     duration: {
//       type: Number, // Duration of the video in seconds
//       default: 0,
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId, // Reference to the User model
//       ref: "User",
//       required: true,
//     },
//   },
//   {
//     timestamps: true, // Automatically add createdAt and updatedAt fields
//   }
// );

// // Create the Video model
// const Video = mongoose.model("Video", videoSchema);

// module.exports = Video;

const mongoose = require("mongoose");

// Define the Video schema
const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    tags: {
      type: [String], // Array of tags for filtering or searching
      default: [],
    },

    duration: {
      type: Number, // Duration of the video in seconds
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: "User",
      required: true,
    },
    googleDriveFileId: {
      type: String, // Google Drive file ID if uploaded from Google Drive
      default: null,
    },
    embedUrl: {
      type: String, // Google Drive video embed URL if uploaded from Google Drive
      default: null,
    },
    isGoogleDrive: {
      type: Boolean, // Flag to indicate if the video is from Google Drive
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the Video model
const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
