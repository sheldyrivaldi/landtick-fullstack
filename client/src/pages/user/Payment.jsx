import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { API, setAuthToken } from "../../config/api";
import convertRupiah from "rupiah-format";
import formatDate from "../../utils/FormatDate";

import InvoicePayment from "../../components/payment/InvoicePayment";
import DetailTicketPayment from "../../components/payment/DetailTicketPayment";
import DetailCardPayment from "../../components/payment/DetailCardPayment";
import Navbar from "../../components/navbar/Navbar";
import LandtickWhite from "../../assets/images/landtick-white.svg";

const Payment = () => {
  const navigate = useNavigate();
  setAuthToken(localStorage.token);

  const param = useParams();

  const { data: tickets } = useQuery("myTicketPaymentCache", async () => {
    try {
      const response = await API.get(`/transaction/${param.id}`);
      return response.data.data.transaction;
    } catch (error) {
      console.log("Fetching transaction failed!", error);
      throw error;
    }
  });

  const handleBuy = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const form = {
        id: tickets?.id,
        fullname: tickets?.user?.fullname,
        email: tickets?.user?.email,
        price: tickets?.ticket?.price,
      };

      const response = await API.post("/transaction/midtrans", form, config);

      const token = response.data.data.token;
      window.snap.pay(token, {
        onSuccess: function (result) {
          navigate("/user/ticket");
        },
        onPending: function (result) {
          navigate("/user/ticket");
        },
        onError: function (result) {
          console.log(result);
          navigate("/user/ticket");
        },
        onClose: function () {
          alert("You closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log("transaction failed:", error);
    }
  });

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

    const scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const [dayOfWeek, day, monthName, year] = formatDate(tickets?.ticket?.start_date || "");

  return (
    <>
      <Navbar />
      <section id="payment">
        <div className="px-20 pb-20 pt-24 flex justify-between bg-white">
          <div className="w-[60%]">
            <div>
              <h2 className="text-4xl">Invoice</h2>
              <div className="w-full mt-5 bg-white overflow-hidden border border-[#B7B7B7] rounded-md">
                <div className="w-56 h-16  -ml-16 -mt-9 rounded-full flex justify-end pb-1.5 pr-8 items-end bg-gradient-to-b from-strong-pink from-50% to-soft-pink">
                  <h4 className="font-opticon -mb-2.5 text-white">LandTick</h4>
                  <img className="h-5 ml-2" src={LandtickWhite} alt="logo" />
                </div>

                <div className="mt-12 flex">
                  <div className="w-full">
                    <div>
                      <div className="pl-8 grid grid-cols-4 border-b border-[#B7B7B7]">
                        <div className="text-md py-1">No. Tanda Pengenal</div>
                        <div className="text-md pl-5 py-1">Nama Pemesan</div>
                        <div className="text-md py-1">No. Handphone</div>
                        <div className="text-md py-1">Email</div>
                      </div>
                    </div>
                    <InvoicePayment NIK="31175033003970001" name={tickets?.user?.fullname} telp={tickets?.user?.no_hp} email={tickets?.user?.email} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-end">
              <div className="w-[60%]">
                <h2 className="text-4xl mt-6">Rincian Harga</h2>
                <div className=" mt-5 border border-[#B7B7B7] rounded-md bg-white">
                  <DetailTicketPayment brand={tickets?.ticket?.name_train} typePerson="Dewasa" numberOfTicket="1" price={convertRupiah.convert(tickets?.ticket?.price)} />
                  <div className="w-full px-4 py-0.5 flex border-t border-[#B7B7B7] bg-[#E6E6E6]">
                    <h4 className="w-[60%] text-lg">Total</h4>
                    <h4 className="w-[40%] text-lg font-bold">{convertRupiah.convert(tickets?.ticket?.price)}</h4>
                  </div>
                </div>
                <div className="w-full mt-5 flex items-end">
                  <button type="button" onClick={handleBuy.mutate} className="w-full p-2 rounded font-avenir font-bold text-sm text-white bg-gradient-to-l from-strong-pink to-soft-pink">
                    Bayar Sekarang
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[40%]">
            <DetailCardPayment
              ticketDay={dayOfWeek}
              ticketDate={`${day} ${monthName} ${year}`}
              ticketQrInvoice="INV0101"
              brand={tickets?.ticket?.name_train}
              type={tickets?.ticket?.type_train}
              startTime={tickets?.ticket?.start_time}
              startDate={`${day} ${monthName} ${year}`}
              startCity="Jakarta (GMR)"
              startStation={tickets?.ticket?.start_station?.name}
              endTime={tickets?.ticket?.arrival_time}
              endDate={`${day} ${monthName} ${year}`}
              endCity="Surabaya (SBY)"
              endStation={tickets?.ticket?.destination_station?.name}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Payment;
