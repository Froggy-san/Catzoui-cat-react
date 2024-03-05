import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="absolute left-1/2 translate-x-[-50%]">
      <div className="relative   text-center tracking-[.2rem]  sm:tracking-[.25rem] text-xl sm:text-2xl font-light">
        Catzoui
        <img
          src="../../public/assets/img/logo-2.png"
          alt="image"
          className="w-8 h-8 absolute left-[-1.5rem] top-1 sm:top-2"
        />
      </div>
    </Link>
  );
};

export default Logo;
