import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { API, setAuthToken } from "../../config/api";

import { useState } from "react";

const CreateTicket = () => {
  const navigate = useNavigate();
  let { data: stations } = useQuery("stationsCache", async () => {
    const response = await API.get("/stations");

    return response.data.data.station;
  });

  setAuthToken(localStorage.token);
  const [form, setForm] = useState({
    name_train: "",
    type_train: "",
    start_date: "",
    start_station_id: 0,
    start_time: "",
    arrival_time: "",
    destination_station_id: 0,
    price: 0,
    qty: 0,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: "application/json",
      };

      const response = await API.post("/ticket", form, config);

      setForm({
        name_train: "",
        type_train: "",
        start_date: "",
        start_station_id: 0,
        start_time: "",
        arrival_time: "",
        destination_station_id: 0,
        price: 0,
        qty: 0,
      });

      navigate("/admin");
    } catch (err) {
      console.log("Create ticket failed : ", err);
    }
  });

  return (
    <>
      <Navbar />
      <div className="pt-14">
        <div className="px-24 py-12">
          <h1 className="text-3xl font-medium">Tambah Tiket</h1>
          <div className="mt-12">
            <form onSubmit={(e) => handleSubmit.mutate(e)} className="flex flex-col">
              <input onChange={handleChange} className="text-lg my-3.5 py-1 px-2 border-2 rounded-md shadow-md bg-white placeholder-black" type="text" name="name_train" placeholder="Nama Kereta" />
              <select onChange={handleChange} className="text-lg my-3.5 py-2 px-1 border-2 rounded-md shadow-md bg-white placeholder-black" name="type_train" id="type_train">
                <option value="" hidden>
                  Jenis Kereta
                </option>
                <option value="Eksekutif">Eksekutif</option>
                <option value="Ekonomi">Ekonomi</option>
              </select>
              <input
                onChange={handleChange}
                type="text"
                className="text-lg my-3.5 py-1 px-2 border-2 text-black rounded-md shadow-md bg-white placeholder-black"
                onFocus={(e) => {
                  e.currentTarget.type = "date";
                  e.currentTarget.focus();
                }}
                onBlur={(e) => {
                  e.currentTarget.type = "text";
                  e.currentTarget.placeholder = "Tanggal Keberangkatan";
                  e.currentTarget.blur();
                }}
                placeholder="Tanggal Keberangkatan"
                name="start_date"
                id="start_date"
              />
              <select onChange={handleChange} className="text-lg my-3.5 py-1 px-2 border-2 rounded-md shadow-md appearance-none bg-white placeholder-black" name="start_station_id">
                <option value="" hidden>
                  Stasiun Keberakatan
                </option>
                {stations?.map((item, index) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <input
                onChange={handleChange}
                type="text"
                className="text-lg my-3.5 py-1 px-2 border-2 text-black rounded-md shadow-md bg-white placeholder-black"
                onFocus={(e) => {
                  e.currentTarget.type = "time";
                  e.currentTarget.focus();
                }}
                onBlur={(e) => {
                  e.currentTarget.type = "text";
                  e.currentTarget.placeholder = "Jam Keberangkatan";
                  e.currentTarget.blur();
                }}
                placeholder="Jam Keberangkatan"
                name="start_time"
                id="start_time"
              />
              <select onChange={handleChange} className="text-lg my-3.5 py-1 px-2 border-2 rounded-md shadow-md appearance-none bg-white placeholder-black" name="destination_station_id">
                <option value="" hidden>
                  Stasiun Tujuan
                </option>
                {stations?.map((item, index) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
              <input
                onChange={handleChange}
                type="text"
                className="text-lg my-3.5 py-1 px-2 border-2 text-black rounded-md shadow-md bg-white placeholder-black"
                onFocus={(e) => {
                  e.currentTarget.type = "time";
                  e.currentTarget.focus();
                }}
                onBlur={(e) => {
                  e.currentTarget.type = "text";
                  e.currentTarget.placeholder = "Jam Tiba";
                  e.currentTarget.blur();
                }}
                placeholder="Jam Tiba"
                name="arrival_time"
                id="arrival_time"
              />
              <input onChange={handleChange} className="text-lg my-3.5 py-1 px-2 border-2 rounded-md shadow-md bg-white placeholder-black" type="number" name="price" placeholder="Harga Tiket" />
              <input onChange={handleChange} className="text-lg my-3.5 py-1 px-2 border-2 rounded-md shadow-md bg-white placeholder-black" type="number" name="qty" placeholder="Qty" />

              <button className="w-5/12 py-2 mt-32 mb-14 mx-auto font-lg font-medium text-white rounded shadow-sm bg-[#0ACF83]" type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTicket;
