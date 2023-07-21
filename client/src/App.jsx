import { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/Contex";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./pages/user/Home";
import MyTicket from "./pages/user/MyTicket";
import Payment from "./pages/user/Payment";
import PaymentPending from "./pages/user/PaymentPending";
import Transactions from "./components/transactions/transactions";
import CreateTicket from "./pages/admin/CreateTicket";
import { PrivateRouteUser, PrivateRouteAdmin, PrivateRouteLogin } from "./components/private_routes/PrivateRoutes";
import { API, setAuthToken } from "./config/api";

const App = () => {
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      let payload = response.data.data.users;
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (err) {
      console.log("Check user failed : ", err);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !state.isLogin) {
      navigate("/");
    }
  }, [isLoading, state.isLogin, navigate]);

  return (
    <>
      {isLoading ? null : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRouteLogin />}>
            <Route element={<PrivateRouteUser />}>
              <Route path="/user/ticket" element={<MyTicket />} />
              <Route path="/user/payment" element={<PaymentPending />} />
              <Route path="/user/payment/:id" element={<Payment />} />
            </Route>
            <Route element={<PrivateRouteAdmin />}>
              <Route path="/admin" element={<Transactions />} />
              <Route path="/admin/ticket" element={<CreateTicket />} />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
};

export default App;
