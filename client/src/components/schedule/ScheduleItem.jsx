import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/Contex";
import SuccessMessage from "./SuccessMessage";
import FailedMessage from "./FailedMessage";
import { useMutation } from "react-query";
import { API, setAuthToken } from "../../config/api";
import Arrow from "../../assets/images/arrow.svg";

const ScheduleItem = (props) => {
  const [state] = useContext(UserContext);
  const [successMessage, setSuccessMessage] = useState(false);
  const [failedMessage, setFailedMessage] = useState(false);
  const form = {
    ticket_id: props.id,
  };

  const showModalSuccess = () => {
    setSuccessMessage(true);
  };

  const showModalFailed = () => {
    setFailedMessage(true);
  };

  const dropModal = () => {
    setSuccessMessage(false);
    setFailedMessage(false);
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: "application/json",
      };

      setAuthToken(localStorage.token);

      const response = await API.post("/transaction", form, config);

      showModalSuccess();
    } catch (err) {
      console.log("Create transaction failed");
    }
  });

  return (
    <>
      <div onClick={state.isLogin ? (e) => handleSubmit.mutate(e) : showModalFailed} className="flex mb-10 mt-2 justify-evenly h-24 border cursor-pointer border-soft rounded">
        <div className="flex flex-col w-[16%] justify-center items-center">
          <h5 className="block text-[18px] font-avenir font-extrabold">{props.brand}</h5>
          <h6 className="block text-[14px] font-avenir text-soft">{props.type}</h6>
        </div>
        <div className="flex w-[32%]">
          <div className=" flex flex-col w-1/2 justify-center items-center">
            <h5 className="block text-[18px] font-avenir font-extrabold">{props.startTime}</h5>
            <h6 className="block text-[14px] font-avenir text-soft">{props.startStation}</h6>
          </div>
          <div className="flex justify-center items-center">
            <img src={Arrow} alt="arrow" />
          </div>
          <div className="flex flex-col w-1/2 justify-center items-center">
            <h5 className="block text-[18px] font-avenir font-extrabold">{props.endTime}</h5>
            <h6 className="block text-[14px] font-avenir text-soft">{props.endStation}</h6>
          </div>
        </div>
        <div className="flex flex-col w-[16%] mt-6 items-center">
          <h5 className="block text-[18px] font-avenir font-extrabold">{props.duration}</h5>
        </div>
        <div className="flex flex-col w-[36%] mt-6 items-center">
          <h5 className="block text-[18px] font-avenir font-extrabold text-pink-400">{props.price}</h5>
        </div>
      </div>
      {successMessage ? (
        <div className="modal activate">
          <SuccessMessage dropModal={dropModal} />
        </div>
      ) : (
        <div className="modal">
          <SuccessMessage />
        </div>
      )}
      {failedMessage ? (
        <div className="modal activate">
          <FailedMessage dropModal={dropModal} />
        </div>
      ) : (
        <div className="modal">
          <FailedMessage />
        </div>
      )}
    </>
  );
};

export default ScheduleItem;
