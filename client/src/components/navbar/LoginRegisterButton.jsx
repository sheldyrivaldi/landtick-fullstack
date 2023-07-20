import { useState } from "react";

import Login from "../../pages/Login";
import Register from "../../pages/Register";

const LoginRegisterButton = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const handleClickShowLoginModal = () => {
    setLoginModal(true);
    setRegisterModal(false);
  };
  const handleClickDropLoginModal = () => {
    setLoginModal(false);
    setRegisterModal(false);
  };
  const handleClickShowRegisterModal = () => {
    setLoginModal(false);
    setRegisterModal(true);
  };
  const handleClickDropRegisterModal = () => {
    setLoginModal(false);
    setRegisterModal(false);
  };
  return (
    <>
      <div className="flex md:order-2">
        <div
          onClick={handleClickShowRegisterModal}
          className="w-24 h-8 p-0.5 flex justify-center bg-gradient-to-l from-strong-pink to-soft-pink hover:bg-gradient-to-l hover:from-[#ec7a7aaf] hover:to-[#ec7ab7c0] focus:ring-4 focus:outline-none focus:ring-[#EC7AB7] rounded  mr-3 md:mr-0"
        >
          <button type="button" className="bg-white w-full h-full rounded">
            <span className="font-avenir font-semibold text-[18px] text-center bg-clip-text text-transparent bg-gradient-to-t from-strong-pink to-soft-pink">Daftar</span>
          </button>
        </div>
        <div
          onClick={handleClickShowLoginModal}
          className="ml-4 mr-3 md:mr-0 w-24 h-8 bg-gradient-to-l from-strong-pink to-soft-pink hover:bg-gradient-to-l hover:from-[#ec7a7aaf] hover:to-[#ec7ab7c0] focus:ring-4 focus:outline-none focus:ring-[#EC7AB7] rounded "
        >
          <button type="button" className="text-[18px] text-center w-full h-full text-white font-avenir font-semibold ">
            Login
          </button>
        </div>
      </div>
      {loginModal ? (
        <div className="modal activate">
          <Login dropLogin={handleClickDropLoginModal} showRegister={handleClickShowRegisterModal} />
        </div>
      ) : (
        <div className="modal">
          <Login />
        </div>
      )}
      {registerModal ? (
        <div className="modal activate">
          <Register dropRegister={handleClickDropRegisterModal} />
        </div>
      ) : (
        <div className="modal">
          <Register />
        </div>
      )}
    </>
  );
};

export default LoginRegisterButton;
