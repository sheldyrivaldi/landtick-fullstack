import TicketDetailAdmin from "../ticket/TicketDetailAdmin";
import EditStatus from "../../pages/admin/EditStatus";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { API } from "../../config/api";
import Search from "../../assets/images/search.svg";
import Edit from "../../assets/images/edit.svg";
import Trash from "../../assets/images/trash.svg";

const TransactionItem = (props) => {
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [showEditTicket, setShowEditTicket] = useState(false);

  const handleShowTicketDetail = () => {
    setShowEditTicket(false);
    setShowTicketDetail(true);
  };

  const handleDropTicketDetail = () => {
    setShowEditTicket(false);
    setShowTicketDetail(false);
  };

  const handleShowEditTicket = () => {
    setShowTicketDetail(false);
    setShowEditTicket(true);
  };

  const handleDropEditTicket = () => {
    setShowTicketDetail(false);
    setShowEditTicket(false);
  };

  const statusColor = (status) => {
    let color = "";
    const statusValue = status.toLowerCase();
    if (statusValue === "pending") {
      color = "text-sm px-1 font-medium text-[#F7941E]";
    } else if (statusValue === "cancel") {
      color = "text-sm px-1 font-medium text-[#FF0742]";
    } else if (statusValue === "approved") {
      color = "text-sm px-1 font-medium text-[#0ACF83]";
    }
    return color;
  };

  const id = parseInt(props.id);

  const { data: transaction } = useQuery(["transactionByIDCache", id], async () => {
    const response = await API.get(`/transaction/${id}`);
    return response.data.data.transaction;
  });

  return (
    <>
      <div className="w-full grid grid-cols-6 py-5 border-b border-black">
        <div className="text-sm px-1">{props.no}</div>
        <div className="text-sm px-1">{props.user}</div>
        <div className="text-sm px-1">{props.ticket}</div>
        <div className="text-sm px-1">{props.proof}</div>
        <div className={statusColor(props.status)}>{props.status}</div>
        <div className="text-sm px-1 flex justify-start items-center">
          <img onClick={handleShowTicketDetail} className="w-6 h-6 mr-6 cursor-pointer hover:w-7 hover:h-7 transition-transform" src={Search} alt="search" />
          <img onClick={handleShowEditTicket} className="w-6 h-6 mr-6 cursor-pointer hover:w-7 hover:h-7 transition-transform" src={Edit} alt="edit" />
          <img onClick={props.delete} className="w-6 h-6 mr-6 cursor-pointer hover:w-7 hover:h-7 transition-transform" src={Trash} alt="trash" />
        </div>
      </div>

      {showTicketDetail && (
        <div className="modal activate">
          <TicketDetailAdmin
            drop={handleDropTicketDetail}
            name_train={transaction?.ticket?.name_train}
            type_train={transaction?.ticket?.type_train}
            start_date={transaction?.ticket?.start_date}
            start_time={transaction?.ticket?.start_time}
            start_station={transaction?.ticket?.start_station?.name}
            arrival_time={transaction?.ticket?.arrival_time}
            destination_station={transaction?.ticket?.destination_station?.name}
            price={transaction?.ticket?.price}
            fullname={transaction?.user?.fullname}
            no_hp={transaction?.user?.no_hp}
            email={transaction?.user?.email}
          />
        </div>
      )}

      {showEditTicket && (
        <div className="modal activate">
          <EditStatus drop={handleDropEditTicket} id={id} />
        </div>
      )}
    </>
  );
};

export default TransactionItem;
