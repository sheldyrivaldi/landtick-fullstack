const ScheduleTitle = ({ brandTitle, startTitle, endTitle, durationTitle, priceTitle }) => {
  return (
    <div className="flex justify-evenly h-16 ">
      <div className="flex w-[16%] justify-center self-center">
        <h5 className="block text-[18px] font-avenir">{brandTitle}</h5>
      </div>
      <div className="flex w-[16%] justify-center self-center">
        <h5 className="block text-[18px] font-avenir">{startTitle}</h5>
      </div>
      <div className="flex w-[16%] justify-center self-center">
        <h5 className="block text-[18px] font-avenir">{endTitle}</h5>
      </div>
      <div className="flex w-[16%] justify-center self-center">
        <h5 className="block text-[18px] font-avenir">{durationTitle}</h5>
      </div>
      <div className="flex w-[36%] justify-center self-center">
        <h5 className="block text-[18px] font-avenir">{priceTitle}</h5>
      </div>
    </div>
  );
};

export default ScheduleTitle;
