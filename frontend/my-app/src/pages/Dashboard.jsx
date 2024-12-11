import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import React, { useEffect, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify"; // Notifications
import "react-toastify/dist/ReactToastify.css"; // Toast styles
import "../assets/styles/VideoCard.css"; // Custom styles
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { fetchVideos, searchVideos } from "../services/videoService"; // API calls
import VideoCard from "../components/VideoCard";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState("");

  const loadVideos = async () => {
    try {
      const userId = user._id;
      const { data } = await fetchVideos({ userId, page, query, tags });

      setVideos(data.videos);
    } catch (error) {
      toast.error("Failed to fetch videos: " + error.message);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) {
      toast.error("Please enter a search query.");
      return;
    }

    try {
      const data = await searchVideos(query, user._id); // Pass userId and query
      setVideos(data); // Set the videos from the search result
    } catch (error) {
      toast.error("Failed to search videos: " + error.message);
    }
  };

  useEffect(() => {
    loadVideos(); // Load videos on component mount
  }, [page]);

  return (
    <div className="dashboard-container">
      <h1>Welcome!</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search videos"
          className="input-field"
        />
        <button type="submit" className="submit-button">
          Search
        </button>
      </form>

      <Container fluid>
        <Row>
          {videos.length > 0 ? (
            videos.map((video) => (
              <Col
                key={video._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4"
              >
                <VideoCard video={video} />
              </Col>
            ))
          ) : (
            <p>No videos found</p>
          )}
        </Row>
      </Container>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
