// Returns the corresponding booking for a given dateTime, if one exists.
export function getBooking(dateTime, bookings) {
  if (bookings.length === 0) return false;
  let booking = null;
  bookings.forEach(b => {
    if (dateTime >= Date.parse(b.start) && dateTime <= Date.parse(b.end)) {
      booking = b;
    }
  });
  return booking;
}

// Convert date to YYYY-MM-DD format
export function convertDateToLeadingYearFormat(date) {
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth() + 1).toString();
  var dd = date.getDate().toString();

  var mmChars = mm.split("");
  var ddChars = dd.split("");

  return (
    yyyy +
    "-" +
    (mmChars[1] ? mm : "0" + mmChars[0]) +
    "-" +
    (ddChars[1] ? dd : "0" + ddChars[0])
  );
}

// Convert JS date to MM/DD/YYYY format
export function convertDateToLeadingMonthFormat(date) {
  return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
}

// Convert JS date object to a US time.
export function convertDateToTime(date) {
  return date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });
}

export function convertToDateTimeString(date) {
  return convertDateToLeadingMonthFormat(date) + " " + convertDateToTime(date);
}
