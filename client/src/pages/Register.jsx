import "../assets/css/index.css";
import { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";

const Register = ({ dropRegister }) => {
  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    gender: "",
    no_hp: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleClickDropRegister = () => {
    dropRegister();
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await API.post("/register", form, config);

      dropRegister();

      setForm({
        fullname: "",
        username: "",
        email: "",
        password: "",
        gender: "",
        no_hp: "",
        address: "",
      });

      navigate("/");
    } catch (err) {
      console.log("Register Failed : ", err);
      dropRegister();
    }
  });

  return (
    <section id="login" className="pt-36">
      <div onClick={handleClickDropRegister} className="w-screen h-screen inset-0 absolute m-0 p-0 flex justify-center bg-transparent"></div>
      <div className="w-[416px] h-[490px] mx-auto flex items-center justify-center relative z-10 bg-white rounded shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
        <div className="w-[416px] static mt-0 h-[490px] overflow-y-scroll pt-[50px]">
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <h1 className="text-center text-4xl font-semibold tracking-wider mb-16 bg-clip-text text-transparent bg-gradient-to-t from-strong-pink to-soft-pink">Daftar</h1>
            <input
              onChange={handleChange}
              value={form.fullname}
              type="text"
              id="fullname"
              name="fullname"
              className="block mx-auto w-[350px] h-[50] mb-8 text-2xl text-slate-600 border-2 border-soft p-2 placeholder-soft rounded-md"
              placeholder="Nama Lengkap"
            />
            <input
              onChange={handleChange}
              value={form.username}
              type="text"
              name="username"
              className="block mx-auto w-[350px] h-[50] mb-8 text-2xl text-slate-600 border-2 border-soft p-2 placeholder-soft rounded-md"
              placeholder="Username"
            />
            <input
              onChange={handleChange}
              value={form.email}
              type="email"
              id="email"
              name="email"
              className="block mx-auto w-[350px] h-[50] mb-8 text-2xl text-slate-600 border-2 border-soft p-2 placeholder-soft rounded-md"
              placeholder="Email"
            />
            <input
              onChange={handleChange}
              value={form.password}
              type="password"
              name="password"
              className="block mx-auto w-[350px] h-[50] mb-8 text-2xl text-slate-600 border-2 border-soft p-2 placeholder-soft rounded-md"
              placeholder="Password"
            />
            <select onChange={handleChange} value={form.gender} name="gender" className="block mx-auto w-[350px] h-[50] mb-8 text-2xl border-2 border-soft p-2 text-soft bg-white rounded-md">
              <option value="" className="text-2xl text-soft rounded-md" hidden>
                Jenis Kelamin
              </option>
              <option value="Pria" className="text-2xl text-slate-600 rounded-md">
                Pria
              </option>
              <option value="Wanita" className="text-2xl text-slate-600 rounded-md">
                Wanita
              </option>
            </select>
            <input
              onChange={handleChange}
              value={form.no_hp}
              type="number"
              id="no_hp"
              name="no_hp"
              className="block mx-auto w-[350px] h-[50] mb-8 text-2xl text-slate-600 border-2 border-soft p-2 placeholder-soft rounded-md"
              placeholder="Telp"
            />
            <textarea
              onChange={handleChange}
              value={form.address}
              id="address"
              name="address"
              className="block resize-none mx-auto w-[350px] h-[200px] mb-16 text-2xl text-slate-600 border-2 border-soft p-2 placeholder-soft rounded-md"
              placeholder="Alamat"
            ></textarea>
            <button type="submit" className="font-bold block text-white mx-auto w-[350px] h-[50] p-2 mb-0 text-[24px] bg-gradient-to-t from-strong-pink to-soft-pink rounded-full">
              Daftar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
