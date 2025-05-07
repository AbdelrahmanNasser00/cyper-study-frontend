import { Button } from "@/components/ui/button";


function BecomeInstructorSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571260899304-425eee4c7efc')] bg-cover bg-center opacity-20"></div>
          <div className="bg-gradient-to-r from-brand-blue/80 to-transparent absolute inset-0"></div>
          <div className="p-12 md:p-16 flex flex-col md:flex-row items-center relative z-10">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <span className="bg-white/20 text-white px-4 py-1 rounded-full text-sm mb-4 inline-block backdrop-blur-sm">
                Join Our Team
              </span>
              <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
                Become an Instructor Today
              </h2>
              <p className="text-white/90 mb-6 text-lg">
                Share your knowledge and expertise with thousands of students
                around the world. Join our instructor community and make a
                difference.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  className="bg-white text-[#3a57e8] hover:bg-white/90"
                  size="lg"
                >
                  Start Teaching Today
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36"
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                </div>
                <span className="text-white/80 text-sm">
                  Join 75,000+ instructors
                </span>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655"
                alt="Instructor teaching"
                className="rounded-lg w-full shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BecomeInstructorSection;
