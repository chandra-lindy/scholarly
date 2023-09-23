import logo from "../assets/logo.png";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-brand-paper z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-brand-aux-1 font-bold text-4xl">
          <img className="h-[4.75rem] w-auto inline-block" src={logo} alt="" />
          Scholarly
        </div>
        <div>
          <button className="mr-14 text-brand-aux-1 text-xl">Register</button>
          <button className="text-brand-aux-1 text-xl">Login</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
