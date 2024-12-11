import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { uploadVideo } from "../services/videoService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDrivePicker from "react-google-drive-picker";
import { AuthContext } from "../context/AuthContext";
import "../assets/styles/Upload.css";

const Upload = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [googleDriveFile, setGoogleDriveFile] = useState(null);
  const navigate = useNavigate();
  const [openPicker] = useDrivePicker();

  const handleOpenPicker = () => {
    openPicker({
      clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID, // Replace with your Client ID
      developerKey: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
      viewId: "DOCS_VIDEOS",
      showUploadView: false,
      showUploadFolders: false,
      supportDrives: true,
      query: "mimeType='video/mp4'",
      multiselect: false,
      callbackFunction: (data) => {
        if (data.action === "picked" && data.docs && data.docs.length > 0) {
          const file = data.docs[0]; // Safely access the first selected file

          setGoogleDriveFile(file);
        } else if (data.action === "cancel") {
        } else {
          console.error("Unexpected data structure:", data);
        }
      },
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !googleDriveFile) {
      toast.error("Please fill all fields and select a video.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("userId", user._id);
    formData.append("googleDriveFileId", googleDriveFile.id);
    formData.append("embedUrl", googleDriveFile.url);

    try {
      await uploadVideo(formData);
      toast.success("Video uploaded successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to upload video: " + error.message);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Your Video</h2>
      <form onSubmit={handleUpload} className="upload-form">
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input-field"
            placeholder="Enter video title"
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="input-field"
            placeholder="Enter video description"
          />
        </div>
        <div className="input-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="input-field"
            placeholder="Enter tags"
          />
        </div>
        <div className="input-group">
          <button
            type="button"
            onClick={handleOpenPicker}
            className="google-drive-button"
          >
            Select Video from Google Drive
          </button>
          {googleDriveFile && (
            <p>
              Selected Video: <strong>{googleDriveFile.name}</strong>
            </p>
          )}
        </div>
        <button type="submit" className="submit-button">
          Upload Video
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Upload;
