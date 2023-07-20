import QRCode from "../../assets/images/qr-code.svg";

const DetailCardPayment = ({ ticketDay, ticketDate, ticketQrInvoice, brand, type, startTime, startDate, startCity, startStation, endTime, endDate, endCity, endStation }) => {
  return (
    <div className="mt-16 mx-5 flex flex-row justify-between bg-[#F5F5F5]">
      <div className="w-full">
        <div className="w-full flex justify-between items-center py-5 px-6 bg-[#D0D0D0]">
          <div className="flex flex-col items-start">
            <h4 className="font-avenir text-4xl font-semibold text-right">Kereta Api</h4>
            <h5 className=" text-md font-normal text-[#878787]">
              <span className="text-md font-bold">{ticketDay}</span>, {ticketDate}
            </h5>
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="w-12 h-12">
              <img className="w-full h-full object-cover" src={QRCode} alt="qr-code" />
            </div>
            <h2 className="mt-1 text-center text-xs">{ticketQrInvoice}</h2>
          </div>
        </div>
        <div className="flex flex-col items-start px-6 pt-5">
          <h4 className="text-2xl font-semibold text-right">{brand}</h4>
          <h5 className="text-md font-normal">{type}</h5>
        </div>
        <div className="mt-5 flex items-center px-6">
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
                <h4 className="font-semibold text-xl">{startTime}</h4>
                <h5 className="text-md text-[#959595]">{startDate}</h5>
              </div>
              <div className="ml-12">
                <h4 className="font-semibold text-xl">{startCity}</h4>
                <h5 className=" text-md text-[#959595]">{startStation}</h5>
              </div>
            </div>
            <div className=" ml-5 mt-16 pt-1 flex flex-row">
              <div>
                <h4 className="font-semibold text-xl">{endTime}</h4>
                <h5 className="text-md text-[#959595]">{endDate}</h5>
              </div>
              <div className="ml-12">
                <h4 className="font-semibold text-xl">{endCity}</h4>
                <h5 className="text-md text-[#959595]">{endStation}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCardPayment;
