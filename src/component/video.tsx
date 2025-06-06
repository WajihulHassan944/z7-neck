import React from "react";

const video = () => {
  return (
    <div className="max-w-6xl mx-auto mb-32">
      <div>
        <video
          src="/images/provid.mp4"
          controls
          className="w-full rounded-lg shadow-lg"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default video;
