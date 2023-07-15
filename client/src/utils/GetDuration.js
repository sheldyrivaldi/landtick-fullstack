export function GetDuration(startTime, endTime) {
  const startHours = parseInt(startTime.split(":")[0], 10);
  const startMinutes = parseInt(startTime.split(":")[1], 10);
  const endHours = parseInt(endTime.split(":")[0], 10);
  const endMinutes = parseInt(endTime.split(":")[1], 10);

  const startTimeInMinutes = startHours * 60 + startMinutes;
  const endTimeInMinutes = endHours * 60 + endMinutes;

  const durationInMinutes = endTimeInMinutes - startTimeInMinutes;

  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  return `${hours}j ${minutes}m`;
}
