import "../../assets/css/index.css";
import Ticket from "../../components/ticket/Ticket";
import Navbar from "../../components/navbar/Navbar";
import { useQuery } from "react-query";
import { API, setAuthToken } from "../../config/api";
import formatDate from "../../utils/FormatDate";

const MyTicket = () => {
  setAuthToken(localStorage.token);
  const { data: tickets } = useQuery("myTicketCache", async () => {
    const response = await API.get("/ticket/my-ticket");
    return response.data.data;
  });

  const ticketPending = tickets?.filter((elements) => elements.status == "Pending");

  return (
    <>
      <Navbar />
      <section id="my-ticket" className="w-full pt-[44px] bg-white">
        <h1 className="font-avenir text-3xl mb-10 mt-20 ml-20 p-1">Tiket Saya</h1>
        <div className="grid grid-flow-row gap-8 pb-10">
          {ticketPending?.map((item, index) => {
            const [dayOfWeek, day, monthName, year] = formatDate(item?.ticket?.start_date);

            return (
              <Ticket
                key={item.id}
                id={item.id}
                ticketQrCode="TCK0101"
                brand={item?.ticket?.name_train}
                type={item?.ticket?.type_train}
                startTime={item?.ticket?.start_time}
                startDate={`${day} ${monthName} ${year}`}
                startCity="Jakarta (GMR)"
                startStation={item?.ticket?.start_station?.name}
                endTime={item?.ticket?.arrival_time}
                endDate={`${day} ${monthName} ${year}`}
                endCity="Surabaya (SBY)"
                endStation={item?.ticket?.destination_station?.name}
                ticketDay={dayOfWeek}
                ticketDate={`${day} ${monthName} ${year}`}
                NIK="31175033003970001"
                name={item?.user?.fullname}
                telp={item?.user?.no_hp}
                email={item?.user?.email}
                status={item?.status}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default MyTicket;
