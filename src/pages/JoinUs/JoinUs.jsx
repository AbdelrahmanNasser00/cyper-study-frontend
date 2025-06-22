import { useState } from "react";

function JoinUs() {
  const [form, setForm] = useState({ fullName: "", email: "", subject: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:abdoa7med.1248@gmail.com?subject=Join Us Form Submission&body=Full Name: ${encodeURIComponent(
      form.fullName
    )}%0AEmail: ${encodeURIComponent(
      form.email
    )}%0ASubject: ${encodeURIComponent(form.subject)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-dvh container flex justify-between">
      <div className="first-half w-1/2">
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col max-w-md px-10 py-12 mt-10 gap-5 rounded-4xl shadow-2xl ;\n]"
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="rounded-2xl border p-3 px-5 bg-gray-100 focus:border-blue-400"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="rounded-2xl border p-3 px-5 bg-gray-100 focus:border-blue-400"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="subject"
            id="subject"
            placeholder="Subject"
            className="resize-none rounded-2xl border p-3 px-5 bg-gray-100 h-70 focus:border-blue-400"
            value={form.subject}
            onChange={handleChange}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-2xl py-3 px-6 mt-2 hover:bg-blue-600 transition"
          >
            Send
          </button>
        </form>
      </div>

      <div className="second-half w-120 text-center flex flex-col justify-center  gap-5">
        <h3 className=" font-bold text-3xl">
          Join Our Expert Instructor Community
        </h3>
        <div className="px-15 ">
          <p className="text-2xl">
            Share your passion and expertise by teaching with us. Fill out the
            form below and start inspiring learners worldwide today!
          </p>
        </div>
      </div>
    </div>
  );
}

export default JoinUs;
