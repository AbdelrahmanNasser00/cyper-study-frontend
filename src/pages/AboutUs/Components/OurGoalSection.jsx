
const OurGoalSection = () => {
  return (
    <section className="py-16 px-6 bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/3 flex justify-center order-2 md:order-1">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPHE7RsHeBun-5IsjiWWKj8ic1QK3ZDRX220pJOnauX3qa-gGmSXMWWwgKW19pSt6jbmg&usqp=CAU"
            alt="Our Goal"
            className="w-40 md:w-52 -scale-x-100"
          />
        </div>

        <div className="md:w-2/3 order-1 md:order-2">
          <h2 className="text-3xl font-bold mb-4">Our Goal :</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Our goal is to empower individuals by providing top-notch educational
            resources that unlock their true potential. We strive to bridge the gap
            between traditional education and the demands of today's industries with
            flexible, real-world courses.
            <br /><br />
            We aim to create a vibrant learning community where continuous development
            and creative thinking are encouraged. By partnering with industry experts,
            we offer a diverse range of courses that address current trends and
            challenges. Ultimately, we envision an inclusive platform that transforms
            lives and fuels lifelong learning.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurGoalSection;
