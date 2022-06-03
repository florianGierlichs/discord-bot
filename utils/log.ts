export const log = <T>(message: string, event?: T) => {
  const dateAndTime = new Date().toLocaleString("de-DE", {
    timeZone: "Europe/Berlin",
  });

  if (event === undefined) {
    console.log(dateAndTime, ": ", message);
  } else {
    console.log(dateAndTime, ": ", message, event);
  }
};
