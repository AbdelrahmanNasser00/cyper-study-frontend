import { Link } from "react-router-dom";

const JoinOurTeamSection = () => {
  return (
    <section className=" text-white py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 rounded-3xl bg-[#1e293b] p-10 shadow-xl">
        <div className="md:w-1/2 space-y-6">
          <span className="bg-gray-700 px-3 py-1 rounded-full text-sm font-medium inline-block w-max">
            Join Our Team
          </span>
          <h2 className="text-4xl font-bold">Become an Instructor Today</h2>
          <p className="text-gray-300">
            Share your knowledge and expertise with thousands of students around the world.
            Join our instructor community and make a difference.
          </p>
          <div className="flex gap-4">
            <Link to="/join">
              <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
                Start Teaching Today
              </button>
            </Link>
            <Link to="/learn-more">
              <button className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-blue-700 transition">
                Learn More
              </button>
            </Link>
          </div>
          <div className="flex items-center mt-4 gap-3">
            <div className="flex -space-x-3">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36" className="w-10 h-10 rounded-full border-2 border-white" />
            </div>
            <p className="text-sm text-gray-300">Join 75,000+ instructors</p>
          </div>
        </div>

        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc"
            alt="Teaching Session"
            className="rounded-2xl w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default JoinOurTeamSection;
