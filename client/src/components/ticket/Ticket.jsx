import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TicketDetail from "./TicketDetail";
import LandtickWhite from "../../assets/images/landtick-white.svg";
import QRCode from "../../assets/images/qr-code.svg";

const Ticket = ({ id, type, brand, startTime, startDate, startCity, startStation, endTime, endDate, endCity, endStation, ticketDay, ticketDate, NIK, name, telp, email, ticketQrCode, status }) => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleClickPayment = () => {
    navigate(`/user/payment/${id}`);
  };

  const handleClickShowModal = () => {
    setShowModal(true);
  };
  const handleClickDropModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section onClick={handleClickShowModal} className="max-w-full max-h-full flex justify-center">
        <div className="w-9/12 h-[300px] bg-white border-[1px] border-soft flex cursor-pointer">
          <div className="w-[80%]">
            <div className="w-full h-16 bg-white flex justify-between overflow-hidden">
              <div className="w-56 h-full  -ml-16 -mt-9 rounded-full flex justify-end pb-1.5 pr-8 items-end bg-gradient-to-b from-strong-pink from-50% to-soft-pink">
                <h4 className="font-opticon -mb-2.5 text-white">LandTick</h4>
                <img className="h-5 ml-2" src={LandtickWhite} alt="logo" />
              </div>
            </div>

            <div className="w-full h-40 pl-10 flex justify-start items-start bg-white">
              <div>
                <h2 className=" font-bold text-2xl">{brand}</h2>
                <h4 className=" text-sm mt-2"> {type}</h4>
                {status == "Approved" || status == "approved" ? (
                  <div className="mt-4 p-1 w-16 text-center bg-[#3CF71E] z-1 bg-opacity-20">
                    <h4 className=" z-10 text-xs bg-clip-text text-transparent bg-gradient-to-t from-[#3CF71E] to-[#0BDC5F]">Aproved</h4>
                  </div>
                ) : (
                  <div className="mt-4 p-1 w-16 text-center bg-yellow-300 z-1 bg-opacity-20">
                    <h4 className=" z-10 text-xs bg-clip-text text-transparent bg-gradient-to-t from-[#DC7D0B] to-[#F7941E]">Pending</h4>
                  </div>
                )}
              </div>
              <div className="ml-10 mt-5 flex flex-col justify-center items-center">
                <div className=" w-4 h-4 p-0.5 rounded-full bg-gradient-to-b from-strong-pink  to-soft-pink">
                  <div className="w-full h-full rounded-full bg-white"></div>
                </div>
                <div className="h-12 border-2 border-transparent border-l-[#D0D0D0] "></div>
                <div className=" w-4 h-4 rounded-full bg-gradient-to-b from-strong-pink  to-soft-pink"></div>
              </div>
              <div className="flex flex-col">
                <div className="ml-5 flex flex-row">
                  <div>
                    <h4 className=" font-medium text-lg">{startTime}</h4>
                    <h5 className=" text-sm text-[#959595]">{startDate}</h5>
                  </div>
                  <div className="ml-5">
                    <h4 className=" font-medium text-lg">{startCity}</h4>
                    <h5 className=" text-sm text-[#959595]">{startStation}</h5>
                  </div>
                </div>
                <div className=" ml-5 mt-5 flex flex-row">
                  <div>
                    <h4 className=" font-medium text-lg">{endTime}</h4>
                    <h5 className=" text-sm text-[#959595]">{endDate}</h5>
                  </div>
                  <div className="ml-5">
                    <h4 className=" font-medium text-lg">{endCity}</h4>
                    <h5 className=" text-sm text-[#959595]">{endStation}</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className=" pl-10">
              <div className="border-b-2">
                <div className=" grid grid-cols-4">
                  <div className=" font-normal text-md py-1">No. Tanda Pengenal</div>
                  <div className=" font-normal text-md pl-2 py-1">Nama Pemesan</div>
                  <div className=" font-normal text-md py-1">No. Handphone</div>
                  <div className=" font-normal text-md py-1">Email</div>
                </div>
              </div>
              <div>
                <div className=" grid grid-cols-4">
                  <div className=" font-normal text-md text-soft py-1">{NIK}</div>
                  <div className=" font-normal text-md text-soft pl-2 py-1">{name}</div>
                  <div className=" font-normal text-md text-soft py-1">{telp}</div>
                  <div className=" font-normal text-md text-soft py-1">{email}</div>
                </div>
              </div>
            </div>
          </div>
          {status == "Approved" ? (
            <div className="w-[20%] h-full p-2 flex flex-col justify-start items-center ">
              <div className="flex flex-col justify-center items-end">
                <h4 className=" text-3xl font-semibold text-right">Kereta Api</h4>
                <h5 className=" text-sm font-normal text-[#878787]">
                  <span className="font-bold">{ticketDay}</span>, {ticketDate}
                </h5>
              </div>
              <div>
                <div className="w-[100px] h-[100px] mt-8">
                  <img className="w-full h-full object-cover" src={QRCode} alt="qr-code" />
                </div>
                <h4 className="font-normal text-xl text-center">{ticketQrCode}</h4>
              </div>
            </div>
          ) : (
            <div className="w-[20%] h-full p-2 flex flex-col justify-between items-center ">
              <div className="flex flex-col justify-center items-end">
                <h4 className=" text-3xl font-semibold text-right">Kereta Api</h4>
                <h5 className=" text-sm font-normal text-[#878787]">
                  <span className="font-bold">{ticketDay}</span>, {ticketDate}
                </h5>
              </div>

              <div className="w-full" onClick={handleClickPayment}>
                <button type="button" className="w-full p-2 rounded  font-bold text-sm text-white bg-gradient-to-l from-strong-pink to-soft-pink">
                  Bayar Sekarang
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      {showModal && status == "Approved" ? (
        <TicketDetail
          ticketQrInvoice="INV0101"
          ticketQrCode={ticketQrCode}
          ticketDate={ticketDate}
          ticketDay={ticketDay}
          brand={brand}
          type={type}
          startTime={startTime}
          startDate={startDate}
          startCity={startCity}
          startStation={startStation}
          endTime={endTime}
          endCity={endCity}
          endDate={endDate}
          endStation={endStation}
          NIK={NIK}
          name={name}
          telp={telp}
          email={email}
          click={handleClickDropModal}
        />
      ) : null}
    </>
  );
};

export default Ticket;
