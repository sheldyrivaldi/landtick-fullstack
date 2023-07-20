import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import ScheduleItem from "./ScheduleItem";
import ScheduleTitle from "./ScheduleTitle";
import { API } from "../../config/api";
import convertRupiah from "rupiah-format";
import { GetDuration } from "../../utils/GetDuration";
import SearchTicket from "../home/SearchTicket";

const Schedule = () => {
  const [form, setForm] = useState({
    start_station: "",
    destination_station: "",
    date: "",
    adult: 0,
    child: 0,
  });
  const [isSearch, setIsSearch] = useState(false);

  const handleSubmitSearchTicket = (data) => {
    setForm(data);
    setIsSearch(true);
  };

  const handleSubmitEmpty = (data) => {
    setForm(data);
    setIsSearch(false);
  };

  let { data: tickets, refetch } = isSearch
    ? useQuery("ticketsCache", async () => {
        const response = await API.get(`/ticket?date=${form.date}&startStation=${form.start_station}&destinationStation=${form.destination_station}&qty=${parseInt(form.adult) + parseInt(form.child)}`);
        return response.data.data;
      })
    : useQuery("ticketsCache", async () => {
        const response = await API.get("/tickets");
        return response.data.data;
      });

  useEffect(() => {
    refetch();
  }, [isSearch, form]);

  return (
    <>
      <SearchTicket submitData={handleSubmitSearchTicket} submitEmpty={handleSubmitEmpty} />
      <div className="w-full mt-0 mb-10">
        <ScheduleTitle brandTitle="Nama Kereta" startTitle={"Berangkat"} endTitle={"Tiba"} durationTitle={"Durasi"} priceTitle={"Harga Per Orang"} />
        {tickets?.map((item, index) => {
          return (
            <ScheduleItem
              key={item.id}
              id={item.id}
              brand={item.name_train}
              type={item.type_train}
              startTime={item.start_time}
              startStation={item.start_station.name}
              endTime={item.arrival_time}
              endStation={item.destination_station.name}
              duration={GetDuration(item.start_time, item.arrival_time)}
              price={convertRupiah.convert(item.price)}
            />
          );
        })}
      </div>
    </>
  );
};

export default Schedule;
