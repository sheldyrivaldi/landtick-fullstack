import LandtickWhite from "../../assets/images/landtick-white.svg";
import QRCode from "../../assets/images/qr-code.svg";
import Pass from "../../assets/images/pass.svg";
import Clock from "../../assets/images/clock.svg";
import Warning from "../../assets/images/warning.svg";

const TicketDetail = ({ ticketQrInvoice, ticketDate, ticketDay, brand, type, startTime, startDate, startCity, startStation, endTime, endDate, endCity, endStation, ticketQrCode, NIK, name, telp, email, click }) => {
  const handleCLickDropModal = () => {
    click();
  };

  return (
    <div onClick={handleCLickDropModal} className="w-screen h-screen animate-fadeIn fixed inset-0 z-10 m-0 pt-5 flex justify-center items-center  bg-black bg-opacity-30 transition-all">
      <div className=" w-[55%] h-[86%] z-20 bg-white">
        <div className="w-full h-20 mt-4  bg-white flex justify-between overflow-hidden">
          <div className="pl-8">
            <h1 className="font-bold text-3xl pt-1">E-Ticket</h1>
            <h5 className="font-thin text-[10px]">Kode Invoice : {ticketQrInvoice}</h5>
          </div>
          <div>
            <div className="w-64 h-24  -mr-14 -mt-14 rounded-[120px] flex justify-start pb-1.5 pl-8 items-end bg-gradient-to-b from-strong-pink from-50% to-soft-pink">
              <h4 className="font-opticon -mb-3 text-2xl text-white">LandTick</h4>
              <img className="h-7 ml-2" src={LandtickWhite} alt="logo" />
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-row justify-between">
          <div>
            <div className="ml-8 flex flex-col items-start">
              <h4 className="font-avenir text-2xl font-semibold text-right">Kereta Api</h4>
              <h5 className=" text-xs font-normal text-[#878787]">
                <span className="text-xs font-extrabold">{ticketDay}</span>, {ticketDate}
              </h5>
            </div>
            <div className="ml-8 mt-5 flex flex-col items-start">
              <h4 className="text-lg font-semibold text-right">{brand}</h4>
              <h5 className="text-xs font-normal">{type}</h5>
            </div>
            <div className="ml-8 mt-5 flex items-center">
              <div className=" flex flex-col justify-center items-center">
                <div className=" w-4 h-4 p-0.5 rounded-full bg-gradient-to-b from-strong-pink  to-soft-pink">
                  <div className="w-full h-full rounded-full bg-white"></div>
                </div>
                <div className="h-24 border-2 border-transparent border-l-[#D0D0D0] "></div>
                <div className=" w-4 h-4 rounded-full bg-gradient-to-b from-strong-pink  to-soft-pink"></div>
              </div>
              <div className="flex flex-col">
                <div className="ml-5 flex flex-row">
                  <div>
                    <h4 className="font-semibold text-md">{startTime}</h4>
                    <h5 className="text-xs text-[#959595]">{startDate}</h5>
                  </div>
                  <div className="ml-5">
                    <h4 className="font-bold text-md">{startCity}</h4>
                    <h5 className=" text-xs text-[#959595]">{startStation}</h5>
                  </div>
                </div>
                <div className=" ml-5 mt-16 pt-1 flex flex-row">
                  <div>
                    <h4 className="font-semibold text-md">{endTime}</h4>
                    <h5 className="text-xs text-[#959595]">{endDate}</h5>
                  </div>
                  <div className="ml-5">
                    <h4 className="font-semibold text-md">{endCity}</h4>
                    <h5 className="text-xs text-[#959595]">{endStation}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mr-8 flex flex-col justify-center items-center">
            <img className="w-[200px] h-[200px]" src={QRCode} alt="qr-code" />
            <h2 className="mt-3 text-center text-lg">{ticketQrCode}</h2>
          </div>
        </div>
        <div className="flex justify-evenly items-center mx-2 mt-4 py-4 border-y border-black">
          <div className="px-4 flex items-center">
            <img className="h-10" src={Pass} alt="pass" />
            <h5 className="ml-3 text-xs ">Tunjukan e-ticket dan identitas para penumpang saat checkin</h5>
          </div>
          <div className="px-4 flex items-center">
            <img className="h-full" src={Clock} alt="pass" />
            <h5 className="ml-3 text-xs ">
              Check-in <span className="font-bold">paling lambat 90 menit</span> sebelum keberangkatan
            </h5>
          </div>
          <div className="px-4 flex items-center">
            <img className="h-full" src={Warning} alt="pass" />
            <h5 className="ml-3 text-xs ">Waktu tertera adalah waktu stasiun setempat</h5>
          </div>
        </div>
        <div className="flex">
          <div className="w-full pl-10">
            <div className=" grid grid-cols-4">
              <div className="text-sm py-1">No. Tanda Pengenal</div>
              <div className="text-sm pl-2 py-1">Nama Pemesan</div>
              <div className="text-sm py-1">No. Handphone</div>
              <div className="text-sm py-1">Email</div>
            </div>
            <div>
              <div className=" grid grid-cols-4">
                <div className="text-md text-soft py-1">{NIK}</div>
                <div className="text-md text-soft pl-2 py-1">{name}</div>
                <div className="text-md text-soft py-1">{telp}</div>
                <div className="text-md text-soft py-1">{email}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
