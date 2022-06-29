import convertTimestamp from "../utils/convertTimestamp";

jest.useFakeTimers().setSystemTime(new Date(2022, 0, 1, 12, 0, 0));

const timestampMock = new Date().getTime();

describe("convert timestamp", () => {
  it("should convert the timestamp to a specific date string", () => {
    expect(convertTimestamp(timestampMock)).toBe(
      "Samstag, 1. Januar 2022, 12:00"
    );
  });
});
