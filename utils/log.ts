export const log = <T>(message: string, event?: T) => {
  const dateAndTime = new Date().toLocaleString();

  if (event === undefined) {
    console.log(dateAndTime, ": ", message);
  } else {
    console.log(dateAndTime, ": ", message, event);
  }
};
