import { useState } from "react";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import Train from "../../assets/images/train.svg";
import RoundTrip from "../../assets/images/round-trip.svg";

const SearchTicket = ({ submitData, submitEmpty }) => {
  const { data: stations } = useQuery("stationsSearchCache", async () => {
    const response = await API.get("/stations");
    return response.data.data.station;
  });

  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [form, setForm] = useState({
    start_station: "",
    destination_station: "",
    date: "",
    adult: 0,
    child: 0,
  });

  const handleSubmit = () => {
    if ((form.start_station != "" && form.destination_station != "" && form.date != "") || form.adult != 0 || form.child != 0) {
      submitData(form);
    } else {
      submitEmpty(form);
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div id="search-ticket" className="container relative -top-8 shadow-xl w-full grid grid-cols-12 gap-0 bg-white rounded-md overflow-hidden border-slate-400">
      <div className="col-span-3 bg-[#F2F2F2]">
        <div className="flex items-center self-start mt-3 bg-white">
          <div className="w-[8px] h-12 bg-[#E67E22]"></div>
          <img className="h-10" src={Train} alt="train" />
          <h4 className="">Tiket Kereta Api</h4>
        </div>
      </div>
      <div className="col-span-4 mt-3 mb-10">
        <h4 className="text-2xl font-avenir font-medium">Tiket Kereta Api</h4>
        <h5 className="text-[18px] font-avenir font-extrabold mt-1">Asal</h5>
        <select onChange={handleChange} name="start_station" className="text-md w-full border-2 border-soft mt-2 px-2 py-1.5 placeholder-soft rounded-md appearance-none">
          <option value="" hidden>
            Stasiun Keberangkatan
          </option>
          {stations?.map((item) => {
            return (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
        <div className="flex mt-5">
          <div className="w-7/12">
            <h5 className="text-[18px] font-avenir font-extrabold">Tanggal Berangkat</h5>
            <input type="date" onChange={handleChange} className="w-7/12 py-0.5 px-2 border-2 border-soft text-soft rounded-md appearance-none" placeholder="DD/MM/YYYY" name="date" id="date" />
          </div>
          <div className="flex items-center self-start">
            <input type="checkbox" name="round-trip" id="round-trip" />
            <h5 className="text-[18px] font-avenir font-extrabold ml-2">Pulang Pergi</h5>
          </div>
        </div>
      </div>
      <div className="flex justify-center relative top-16 col-span-1">
        <div className="w-12 h-12 flex  left-3.5 cursor-pointer justify-center bg-gradient-to-l from-strong-pink to-soft-pink hover:bg-gradient-to-l hover:from-[#ec7a7aaf] hover:to-[#ec7ab7c0] rounded-full">
          <img className="w-6" src={RoundTrip} alt="round-trip" />
        </div>
      </div>
      <div className="col-span-4 mpl-0 pr-3 mt-11">
        <h5 className="text-[18px] font-avenir font-extrabold mt-1">Tujuan</h5>
        <select onChange={handleChange} name="destination_station" className="text-md w-full border-2 border-soft mt-2 px-2 py-1.5 placeholder-soft rounded-md appearance-none">
          <option value="" hidden>
            Stasiun Tujuan
          </option>
          {stations?.map((item) => {
            return (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
        <div className="flex justify-between mt-4">
          <div className="w-1/3 pr-2">
            <h5 className="text-[18px] font-avenir font-extrabold mt-1">Dewasa</h5>
            <select name="adult" id="adult" onChange={handleChange} className="w-full border-2 border-soft p-1 text-soft bg-white rounded-md">
              <option value="0" hidden>
                0
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          <div className="w-1/3 px-1">
            <h5 className="text-[18px] font-avenir font-extrabold mt-1">Bayi</h5>
            <select name="child" id="child" onChange={handleChange} className="w-full border-2 border-soft p-1 text-soft bg-white rounded-md">
              <option value="0" hidden>
                0
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          <div className="w-1/3 flex justify-center self-end px-1">
            <button
              type="button"
              onClick={handleSubmit}
              className="text-[18px] text-center w-full py-0.5 text-white font-avenir font-semibold bg-gradient-to-l from-strong-pink to-soft-pink hover:bg-gradient-to-l hover:from-[#ec7a7aaf] hover:to-[#ec7ab7c0] focus:ring-4 focus:outline-none focus:ring-[#EC7AB7] rounded"
            >
              Cari Tiket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTicket;
