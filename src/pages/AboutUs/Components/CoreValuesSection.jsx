
import {FaLightbulb,FaUsers,FaShieldAlt,FaBookOpen,FaGlobe,FaBolt,} from "react-icons/fa";

const coreValues = [
  {
    icon: <FaGlobe className="text-3xl text-blue-600" />,
    title: "Accessibility",
    description: "Education should be available to everyone, everywhere.",
  },
  {
    icon: <FaLightbulb className="text-3xl text-yellow-500" />,
    title: "Innovation",
    description: "We use creative technology to inspire learning.",
  },
  {
    icon: <FaUsers className="text-3xl text-green-600" />,
    title: "Collaboration",
    description: "Students and instructors grow stronger together.",
  },
  {
    icon: <FaShieldAlt className="text-3xl text-indigo-600" />,
    title: "Quality",
    description: "Expert-reviewed content for real-world skills.",
  },
  {
    icon: <FaBookOpen className="text-3xl text-pink-500" />,
    title: "Lifelong Learning",
    description: "We foster continuous learning at every stage of life.",
  },
  {
    icon: <FaBolt className="text-3xl text-red-500" />,
    title: "Flexibility",
    description: "Learn at your own pace, any time, anywhere.",
  },
];

const CoreValuesSection = () => {
  return (
    <section className="py-20 px-6 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl p-6 shadow hover:shadow-lg transition duration-300"
            >
              <div className="mb-4 flex justify-center">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
