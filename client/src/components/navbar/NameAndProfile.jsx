import { useContext, useState } from "react";
import { UserContext } from "../../context/Contex";

import DropdownAdmin from "./DropdownAdmin";
import Dropdown from "./Dropdown";
import Boy from "../../assets/images/boy.svg";

const NameAndProfile = () => {
  const [state] = useContext(UserContext);

  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowDropdown = () => {
    setShowDropdown(true);
  };

  const handleDropDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <div className="flex items-center md:order-2">
        <div className="flex items-center">
          <h4 className="font-avenir mr-3 font-semibold text-lg cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-strong-pink to-soft-pink">{state.user.fullname}</h4>
          <div onClick={handleShowDropdown} className=" h-8 w-8 p-0.5 mr-3 rounded-full flex justify-center bg-gradient-to-l from-strong-pink to-soft-pink cursor-pointer">
            <div className="flex justify-center items-end rounded-full w-full h-full overflow-hidden bg-white">
              <img className="w-6 h-6" src={Boy} alt="profile" />
            </div>
          </div>
        </div>
      </div>
      {state.user.role == "admin" ? (
        showDropdown ? (
          <div className="modal activate">
            <DropdownAdmin dropModal={handleDropDropdown} />
          </div>
        ) : (
          <div className="modal">
            <DropdownAdmin />
          </div>
        )
      ) : showDropdown ? (
        <div className="modal activate">
          <Dropdown dropModal={handleDropDropdown} />
        </div>
      ) : (
        <div className="modal">
          <Dropdown />
        </div>
      )}
    </>
  );
};

export default NameAndProfile;
