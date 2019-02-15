function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export function getMockCscs() {
  return [
    {
      id: 1,
      name: "csc 1",
      checked: true
    },
    { id: 2, name: "csc 2", checked: true }
  ];
}

const bookingTypes = ["Conflict", "Trip", "Route", "Out of Service"];

function randomBookingType() {
  return bookingTypes[Math.floor(Math.random() * bookingTypes.length)];
}

function randomString() {
  return Math.random()
    .toString(36)
    .substring(7);
}

export function getMockVehicles() {
  const urlParams = new URLSearchParams(window.location.search);
  const numResults = urlParams.get("numVehicles") || 10;
  const mockVehicles = [];
  let i = 1;
  while (i < numResults) {
    mockVehicles.push({
      id: i,
      csc: 1,
      type: randomString(),
      bookings: [
        {
          id: i,
          name: randomString(),
          start: randomDate(
            new Date(2018, 11, 2, 4),
            new Date(2018, 11, 2, 16)
          ),
          end: randomDate(new Date(2018, 11, 3, 4), new Date(2018, 11, 3, 16)),
          driver: randomString(),
          type: randomBookingType()
        },
        {
          id: i + 1,
          name: randomString(),
          start: randomDate(
            new Date(2018, 11, 4, 4),
            new Date(2018, 11, 4, 16)
          ),
          end: randomDate(new Date(2018, 11, 5, 4), new Date(2018, 11, 5, 16)),
          driver: randomString(),
          type: randomBookingType()
        }
      ]
    });
    i++;
  }
  return mockVehicles;
}
