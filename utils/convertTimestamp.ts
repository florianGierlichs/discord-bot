const convertTimestamp = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "Europe/Brussels",
  });
};

export default convertTimestamp;
