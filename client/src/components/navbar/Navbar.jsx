import { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../context/Contex";
import LoginRegisterButton from "./LoginRegisterButton";
import NameAndProfile from "./NameAndProfile";
import Landtick from "../../assets/images/landtick.svg";

const Navbar = () => {
  const [state] = useContext(UserContext);

  return (
    <nav className="bg-white  fixed w-full z-20 top-0 left-0 pl-20 pr-16 border-b border-gray-200 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-0">
        <Link to="/" className="flex justify-start items-center">
          <span className="font-opticon p-1 relative top-3 text-[24px] mr-0.5 font-normal bg-clip-text text-transparent bg-gradient-to-l from-strong-pink to-soft-pink">LandTick</span>
          <img src={Landtick} className="w-[60px] mr-3" alt="LandTick Logo" />
        </Link>
        {state.isLogin ? <NameAndProfile /> : <LoginRegisterButton />}
      </div>
    </nav>
  );
};

export default Navbar;
