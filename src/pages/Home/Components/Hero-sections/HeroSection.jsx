import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Search from "@/components/Search";

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-[#3c59e8] to-[#01c0d3] py-24 text-white relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#3c59e8] to-[#01c0d3] opacity-90"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl mb-6 animate-fade-in">
            Expand Your Career{" "}
            <span className="text-[#f9b15e]">Opportunities</span>
          </h1>
          <p
            className="text-lg md:text-xl mb-8 text-white/90 animate-fade-in"
            style={{ animationDelay: "0.2s" }}>
            Learn the most in-demand skills from expert instructors. Thousands
            of courses starting at just $12.99.
          </p>

          <Search />

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              100,000+ Courses
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              Expert Instructors
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              Lifetime Access
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              Money Back Guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
