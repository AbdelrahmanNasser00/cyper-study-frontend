import React, { useState } from "react";

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    level: "Beginner",
    category: "Web Development",
    thumbnailUrl: "",
    description: "",
    duration: "",
    isPublished: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Course Data:", formData);
    // Send formData to backend via Axios or fetch
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Course Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter course title"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="49.99"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience Level</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
            >
              <option>Web Development</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>AI & Data</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Course Image URL</label>
          <input
            type="text"
            name="thumbnailUrl"
            value={formData.thumbnailUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.png"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="e.g., 150"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          />
        </div>

        <div className="flex items-center">
          <input
            id="publishCourse"
            name="isPublished"
            type="checkbox"
            checked={formData.isPublished}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="publishCourse" className="ml-2 block text-sm text-gray-700">
            Publish this course
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Course Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a detailed description of your course"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md font-medium text-sm"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
