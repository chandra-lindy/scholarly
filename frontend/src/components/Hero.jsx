// HeroSection.jsx
import heroImage from "../assets/scholarly-hero.jpeg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative mt-[3.75rem]">
      <img className="w-full" src={heroImage} alt="Hero Image" />
      <div className="absolute inset-0 bg-black opacity-40" />
      <div className="absolute top-0 left-0 z-10 flex flex-col justify-center h-full w-1/2">
        <div className="flex flex-col justify-center items-center m-auto">
          <div className="text-white text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-5">
            The Future of Academics
          </div>
          <Link to="/dashboard">
            <button className="bg-brand-aux-1 hover:bg-brand-aux-2 text-white py-2 px-4 rounded m-auto transition duration-300">
              Sign Up Today
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
