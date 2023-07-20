import FormatDate from "../../utils/FormatDate";
import convertRupiah from "rupiah-format";
import LandtickWhite from "../../assets/images/landtick-white.svg";
import QRCode from "../../assets/images/qr-code.svg";

const TicketDetailAdmin = ({ drop, name_train, type_train, start_date, start_time, start_station, arrival_time, destination_station, fullname, no_hp, email, price }) => {
  console.log(start_date);
  const [dayOfWeek, day, monthName, year] = FormatDate(start_date);

  return (
    <div className="p-20">
      <div onClick={drop} className="w-screen h-screen inset-0 absolute m-0 p-0 flex justify-center bg-transparent"></div>
      <div className="w-8/12 mx-auto relative z-10 bg-white rounded shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
        <div className="w-full h-16 bg-white flex justify-between overflow-hidden">
          <div className="w-56 h-full -ml-16 -mt-9 rounded-full flex justify-end pb-1.5 pr-8 items-end bg-gradient-to-b from-strong-pink from-50% to-soft-pink">
            <h4 className="font-opticon -mb-2.5 text-white">LandTick</h4>
            <img className="h-5 ml-2" src={LandtickWhite} alt="logo" />
          </div>
        </div>
        <div className="px-8">
          <h2 className="font-bold text-4xl">INVOICE</h2>
          <h5 className="text-[.8rem] text-soft">Kode Invoice : INV0101</h5>
        </div>
        <div className="flex px-8 mt-5">
          <div className="w-[60%]">
            <div>
              <h3 className="text-2xl font-medium">Kereta Api</h3>
              <h5 className="text-sm text-soft">
                <span className="font-bold">{dayOfWeek}</span>
                {`, ${day} ${monthName} ${year}`}
              </h5>
            </div>
            <div className="mt-5">
              <h4 className="font-semibold text-xl">{name_train}</h4>
              <h5 className="text-xs">{type_train}</h5>
            </div>
            <div className="mt-5 flex items-center">
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
                    <h4 className="font-medium text-md">{start_time}</h4>
                    <h5 className="text-xs text-[#959595]">{`${dayOfWeek}, ${day} ${monthName} ${year}`}</h5>
                  </div>
                  <div className="ml-5">
                    <h4 className="font-medium text-md">{"Jakarta (GMR)"}</h4>
                    <h5 className=" text-xs text-[#959595]">{start_station}</h5>
                  </div>
                </div>
                <div className=" ml-5 mt-16 pt-1 flex flex-row">
                  <div>
                    <h4 className="font-medium text-md">{arrival_time}</h4>
                    <h5 className="text-xs text-[#959595]">{`${dayOfWeek}, ${day} ${monthName} ${year}`}</h5>
                  </div>
                  <div class="ml-5">
                    <h4 className="font-medium text-md">{"Surabaya (SBY)"}</h4>
                    <h5 className="text-xs text-[#959595]">{destination_station}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[40%] px-8 flex flex-col items-center">
            <img src={QRCode} alt="qr-code" />
            <h6 className="mt-2">TCK0101</h6>
          </div>
        </div>
        <div className="flex mt-5 py-2 px-8 border-y-2 border-black">
          <div className="w-full">
            <div className=" grid grid-cols-4">
              <div className="text-sm py-1">No. Tanda Pengenal</div>
              <div className="text-sm pl-2 py-1">Nama Pemesan</div>
              <div className="text-sm py-1">No. Handphone</div>
              <div className="text-sm py-1">Email</div>
            </div>
            <div className="mt-5">
              <div className=" grid grid-cols-4">
                <div className="text-md text-soft py-1">{"3329171704990003"}</div>
                <div className="text-md text-soft pl-2 py-1">{fullname}</div>
                <div className="text-md text-soft py-1">{no_hp}</div>
                <div className="text-md text-soft py-1">{email}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-8 py-2 mt-5 bg-[#E6E6E6]">
          <h2 className="font-bold text-3xl text-black">Total</h2>
          <h2 className="font-bold text-3xl text-[#FF0742]">{convertRupiah.convert(price)}</h2>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailAdmin;
