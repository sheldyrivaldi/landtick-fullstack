import { useMutation } from "react-query";
import "../assets/css/index.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/Contex";
import { API, setAuthToken } from "../config/api";

const Login = ({ dropLogin, showRegister }) => {
  const [_, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/login", form, config);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.users,
      });

      setAuthToken(localStorage.token);

      if (response.data.data.users?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      dropLogin();

      setForm({
        email: "",
        password: "",
      });
    } catch (err) {
      console.log("login failed : ", err);
    }
  });
  const handleClickDropLoginModal = () => {
    dropLogin();
  };
  function handleNavigateClick() {
    dropLogin();
    showRegister();
  }

  return (
    <section id="login" className="pt-16">
      <div onClick={handleClickDropLoginModal} className="w-screen h-screen inset-0 absolute m-0 p-0 flex justify-center bg-transparent"></div>
      <div className="w-[416px] h-[490px] mx-auto flex items-center justify-center relative z-10 bg-white rounded shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
        <form onSubmit={(e) => handleSubmit.mutate(e)}>
          <h1 className="text-center text-4xl font-semibold uppercase mb-16 bg-clip-text text-transparent bg-gradient-to-t from-strong-pink to-soft-pink">Login</h1>
          <input name="email" value={form.username} type="email" onChange={handleChange} className="block mx-auto w-[350px] h-[50] mb-8 text-2xl border-2 border-soft p-2 placeholder-soft rounded-md" placeholder="Email" />
          <input name="password" value={form.password} type="password" onChange={handleChange} className="block mx-auto w-[350px] h-[50] mb-16 text-2xl border-2 border-soft p-2 placeholder-soft rounded-md" placeholder="Password" />
          <button type="submit" className="font-bold block text-white mx-auto w-[350px] h-[50] p-2 mb-4 text-[24px] bg-gradient-to-t from-strong-pink to-soft-pink rounded-full">
            Login
          </button>
          <p className=" text-center text-[18px] text-soft opacity-90">
            Belum Punya Akun ? Klik
            <button className="text-soft font-bold" type="button" onClick={handleNavigateClick}>
              disini
            </button>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
