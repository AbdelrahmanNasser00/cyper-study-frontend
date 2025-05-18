import React, { useState } from "react";
import { useParams } from "react-router-dom";

const AddVideo = () => {
  const { id: courseId } = useParams(); 
  const [videoData, setVideoData] = useState({
    title: "",
    videoUrl: "",
    content: "",
    order: 1,
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData({ ...videoData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...videoData,
      courseId: parseInt(courseId),
    };
    console.log(" Video Data to Submit:", payload);

  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Add Lesson to Course #{courseId}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Video Title</label>
          <input
            type="text"
            name="title"
            value={videoData.title}
            onChange={handleChange}
            placeholder="e.g. Introduction to JavaScript"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Video URL</label>
          <input
            type="url"
            name="videoUrl"
            value={videoData.videoUrl}
            onChange={handleChange}
            placeholder="https://example.com/video.mp4"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Lesson Content</label>
          <textarea
            name="content"
            value={videoData.content}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the lesson content"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Order</label>
            <input
              type="number"
              name="order"
              value={videoData.order}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Duration (min)</label>
            <input
              type="number"
              name="duration"
              value={videoData.duration}
              onChange={handleChange}
              placeholder="e.g. 15"
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Add Video
        </button>
      </form>
    </div>
  );
};

export default AddVideo;
