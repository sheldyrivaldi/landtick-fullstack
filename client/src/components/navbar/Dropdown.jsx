import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/Contex";
import Ticket from "../../assets/images/ticket.svg";
import Bill from "../../assets/images/bill.svg";
import Logout from "../../assets/images/logout.svg";

const Dropdown = ({ dropModal }) => {
  const navigate = useNavigate();
  const [_, dispatch] = useContext(UserContext);

  const handleDropModal = () => {
    dropModal();
  };

  const handleNavigateTicket = () => {
    navigate("/user/ticket");
  };

  const handleNavigatePayment = () => {
    navigate("/user/payment");
  };

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <div className="flex justify-end items-start">
      <div onClick={handleDropModal} className="w-screen h-screen inset-0 absolute m-0 p-0 flex justify-center bg-transparent"></div>
      <div className="mt-16 mr-[4.15rem] z-10 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] rounded-lg">
        <div className="w-48 flex relative flex-col justify-center ">
          <div className="w-0 h-0 absolute -top-5 right-0 border-solid border-b-[50px] border-r-[25px] border-l-[25px] cursor-pointer border-b-white  border-l-transparent border-r-transparent"></div>
          <div onClick={handleNavigateTicket} className="py-2 px-3 flex justify-start items-center cursor-pointer">
            <img className="h-9" src={Ticket} alt="ticket" />
            <h2 className="ml-3 font-avenir font-semibold text-md text-soft">Tiket Saya</h2>
          </div>
          <div onClick={handleNavigatePayment} className="py-2 px-3 flex justify-start items-center cursor-pointer">
            <img className="h-8 ml-1" src={Bill} alt="bill" />
            <h2 className=" ml-3 font-avenir font-semibold text-md text-soft">Payment</h2>
          </div>
          <div className="h-1 w-full my-3 bg-gradient-to-r from-strong-pink to-soft-pink"></div>
          <div onClick={handleLogout} className="py-2 px-3 flex justify-start items-center cursor-pointer">
            <img className="h-8 ml-1" src={Logout} alt="bill" />
            <h2 className=" ml-3 font-avenir font-semibold text-md text-soft">Logout</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
