import { vehicleIsScheduled } from "./dates";
describe("vehicleIsScheduled", () => {
  it("should return false when passed an empty array of scheduled dates", () => {
    const date = new Date(2019, 3, 2, 9);
    const result = vehicleIsScheduled(date, []);
    expect(result).toBe(false);
  });

  it("should return false when passed an array of scheduled dates that doesn't include the date passed", () => {
    // 4/2/2019 at 9am
    const date = new Date(2019, 3, 2, 7);
    const scheduledDates = [
      {
        // 4/2/2019 at 8am
        start: new Date(2019, 3, 2, 8),

        // 4/2/2019 at 12:30pm
        end: new Date(2019, 3, 2, 12, 30)
      }
    ];
    const result = vehicleIsScheduled(date, scheduledDates);
    expect(result).toBe(false);
  });

  it("should return true when passed an array of scheduled dates that includes the date passed", () => {
    // 4/2/2019 at 9am
    const date = new Date(2019, 3, 2, 9);
    const scheduledDates = [
      {
        // 4/2/2019 at 8am
        start: new Date(2019, 3, 2, 8),

        // 4/2/2019 at 12:30pm
        end: new Date(2019, 3, 2, 12, 30)
      }
    ];
    const result = vehicleIsScheduled(date, scheduledDates);
    expect(result).toBe(true);
  });
});
