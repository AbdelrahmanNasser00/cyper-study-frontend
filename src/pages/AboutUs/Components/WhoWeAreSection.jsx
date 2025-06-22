import logo from "/black-logo.png"; // Adjust the path as necessary
const WhoWeAreSection = () => {
  return (
    <section className="py-16 px-6 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold mb-4">Who We Are :</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            We are a dedicated team of educators, innovators, and learners
            passionate about transforming online education. Our platform was
            born from the belief that quality education should be accessible to
            everyone, no matter where they are. We combine deep industry
            expertise with creative technology to deliver courses that inspire
            growth and success.
            <br />
            <br />
            Our community thrives on collaboration, with instructors and
            students working together to share knowledge and spark innovation.
            We continuously evolve to meet the changing needs of modern
            learners.
          </p>
        </div>

        <div className="md:w-1/3 flex justify-center">
          <img src={logo} alt="Cyber Study Logo" className="w-40 md:w-52" />
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
