import { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import LandtickWhite from "../../assets/images/landtick-white.svg";

const EditStatus = ({ drop, id }) => {
  const [form, setForm] = useState({
    status: "Approved",
  });

  const handleChange = (e) => {
    setForm({
      status: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      const config = {
        headers: "application/json",
      };

      const response = await API.patch(`/transaction/${id}`, form, config);

      setForm({
        status: "",
      });

      drop();
    } catch (err) {
      console.log("Update transaction failed", err);
    }
  });

  return (
    <section id="edit-status" className="pt-36">
      <div onClick={drop} className="w-screen h-screen inset-0 absolute m-0 p-0 flex justify-center bg-transparent"></div>
      <div className="container relative mx-auto block w-96 h-[490px] z-10 bg-white rounded shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
        <div className="flex justify-between overflow-hidden">
          <div className="w-64 h-24 rounded-[120px] -ml-12 -mt-16 flex justify-center pb-1.5 items-end bg-gradient-to-b from-strong-pink from-50% to-soft-pink">
            <h4 className="font-opticon -mb-3 text-xl text-white">LandTick</h4>
            <img className="h-6 ml-2" src={LandtickWhite} alt="logo" />
          </div>
          <button onClick={drop} type="button" className="text-red-500 text-3xl pr-2 font-bold hover:text-red-600">
            X
          </button>
        </div>
        <form onSubmit={(e) => handleSubmit.mutate(e)} className="pt-14">
          <input id="number" name="number" value={1} type="text" className="block mx-auto w-80  mb-6 p-1.5 text-xl border-2 bg-opacity-50 text-soft border-soft bg-[#C4C4C4] placeholder-soft rounded" placeholder={1} readOnly />
          <input id="user" name="user" value={"Anto"} type="text" className="block mx-auto w-80  my-6 p-1.5 text-xl border-2 bg-opacity-50 text-soft border-soft bg-[#C4C4C4] placeholder-soft rounded" placeholder={"Anto"} readOnly />
          <input
            id="ticket"
            name="ticket"
            value={"Surabaya - Jakarta"}
            type="text"
            className="block mx-auto w-80 my-6 p-1.5 text-xl border-2 bg-opacity-50 text-soft border-soft bg-[#C4C4C4] placeholder-soft rounded"
            placeholder={"Surabaya - Jakarta"}
            readOnly
          />
          <input id="proof" name="proof" value={"bca.jpg"} type="text" className="block mx-auto w-80 my-6 p-1.5 text-xl border-2 bg-opacity-50 text-soft border-soft bg-[#C4C4C4] placeholder-soft rounded" placeholder={"bca.jpg"} readOnly />
          <select onChange={handleChange} id="status-edit" value={form.status} className="block mx-auto w-80 my-6 p-1.5 text-xl border-2 text-black border-soft bg-white placeholder-black rounded">
            <option value="" className="text-xl text-black rounded" hidden>
              Approved
            </option>
            <option value="Approved" className="text-xl text-black rounded">
              Approved
            </option>
            <option value="Canceled" className="text-xl text-black rounded">
              Canceled
            </option>
            <option value="Pending" className="text-xl text-black rounded-md">
              Pending
            </option>
          </select>
          <div className="w-1/2 h-[30] flex mx-auto my-6">
            <button type="submit" className="w-full h-full p-1.5 text-lg rounded text-white bg-[#21db94] hover:bg-[#19b67a]">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditStatus;
