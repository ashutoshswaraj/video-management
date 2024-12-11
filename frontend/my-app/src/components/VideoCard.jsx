import React from "react";
import "../assets/styles/VideoCard.css";

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <div className="video-thumbnail">
        {/* Check if the video is from Google Drive */}
        <iframe
          src={`https://drive.google.com/file/d/${video.googleDriveFileId}/preview`}
          className="video-iframe"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={video.title}
        ></iframe>
        <div className="video-info">
          <h3 className="video-title">{video.title}</h3>
          <p className="video-description">{video.description}</p>
          <div className="video-meta"></div>
          <div className="video-tags">
            {video.tags.length > 0 ? (
              video.tags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                </span>
              ))
            ) : (
              <span className="no-tags">No tags available</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
