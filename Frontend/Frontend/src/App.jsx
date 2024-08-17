import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [detectedActions, setDetectedActions] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:8888/detected_actions"
    );

    eventSource.onmessage = function (event) {
      console.log("New action received:", event.data);
      const newAction = event.data;
      setDetectedActions((prevActions) => [...prevActions, newAction]);
    };

    eventSource.onerror = function (error) {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close(); // Clean up when component unmounts
    };
  }, []);

  console.log(detectedActions);
  return (
    <div className="App">
      <h1>Action Detection</h1>

      {/* Video Feed */}
      <div className="video-container">
        <img src="http://localhost:8888/video_feed" alt="Video Feed" />
      </div>

      {/* Detected Actions */}
      <div className="chat-container">
        {detectedActions.map((action, index) => (
          <div key={index} className="chat-message">
            {action}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
