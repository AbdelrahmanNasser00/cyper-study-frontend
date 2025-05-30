import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetLessonByIdQuery, useUpdateLessonMutation } from "../../../services/lessonApi";
import LoadingSpinner from "@/components/common/loadingSpinner";

const EditVideo = () => {
  const { id,lessonId } = useParams(); 
  const navigate = useNavigate();
  const { data: lesson, isLoading } = useGetLessonByIdQuery(lessonId);
  const [updateLesson, { isLoading: isUpdating }] = useUpdateLessonMutation();

  const [videoData, setVideoData] = useState({
    title: "",
    videoUrl: "",
    content: "",
    order: 1,
    duration: "",
  });

  // Load lesson data when fetched
  useEffect(() => {
    if (lesson) {
      setVideoData({
        title: lesson.title || "",
        videoUrl: lesson.videoUrl || "",
        content: lesson.content || "",
        order: lesson.order || 1,
        duration: lesson.duration || "",
      });
    }
  }, [lesson]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData({ ...videoData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateLesson({ lessonId, ...videoData })
      .unwrap()
      .then(() => {
        alert("Video updated successfully!");
        navigate(-1); 
      })
      .catch((error) => {
        console.error("Failed to update video:", error);
        alert("Failed to update video. Please try again.");
      });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Lesson</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Video Title</label>
          <input
            type="text"
            name="title"
            value={videoData.title}
            onChange={handleChange}
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
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Video"}
        </button>
      </form>
    </div>
  );
};

export default EditVideo;