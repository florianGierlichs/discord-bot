import convertTimestamp from "../utils/convertTimestamp";

jest.useFakeTimers().setSystemTime(new Date(2022, 0, 1, 12, 0, 0));

const timezoneMock = new Date().getTime();

describe("convert timestamp", () => {
  it("should convert the timestamp to a specific date string", () => {
    expect(convertTimestamp(timezoneMock)).toBe(
      "Samstag, 1. Januar 2022, 12:00"
    );
  });
});
