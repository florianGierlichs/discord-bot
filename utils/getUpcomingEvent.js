const getUpcomingLeanCoffeeEvent = (events) => {
  const leanCoffeeEvents = [...events]
    .filter((event) => {
      return event[1].channelId === process.env.CHANNEL_ID;
    })
    .map((event) => event[1]);

  const now = new Date();
  let closest = Infinity;

  leanCoffeeEvents.forEach((event) => {
    const date = new Date(event.scheduledStartTimestamp);

    if (date >= now && (date < new Date(closest) || date < closest)) {
      closest = event.scheduledStartTimestamp;
    }
  });

  const upcomingLeanCoffeeEvent = leanCoffeeEvents.find(
    (event) => event.scheduledStartTimestamp === closest
  );
  return upcomingLeanCoffeeEvent;
};

module.exports = getUpcomingLeanCoffeeEvent;
