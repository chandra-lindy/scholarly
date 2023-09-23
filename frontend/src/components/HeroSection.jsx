import heroImage from "../assets/scholarly-hero.jpeg";

// styles
const heroContainer = "relative mt-[4.75rem]";
const heroImageStyle = "w-full";
const darkOverlay = "absolute inset-0 bg-black opacity-40";
const verticalContainer =
  "absolute top-0 left-0 z-10 flex flex-col justify-center h-full w-1/2";
const callToActionContainer =
  "flex flex-col justify-center items-center m-auto";
const callToActionText =
  "text-white text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-5";
const callToActionButton =
  "bg-brand-aux-1 hover:bg-brand-aux-2 text-white py-2 px-4 rounded m-auto";

const HeroNew = () => {
  return (
    <div className={heroContainer}>
      <img className={heroImageStyle} src={heroImage} />
      <div className={darkOverlay}></div>
      <div className={verticalContainer}>
        <div className={callToActionContainer}>
          <div className={callToActionText}>The Future of Academics</div>
          <button className={callToActionButton}>Sign Up Today</button>
        </div>
      </div>
    </div>
  );
};

export default HeroNew;
