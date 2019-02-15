import React from "react";
import { convertToDateTimeString } from "./utils/dates";
import "./Tooltip.css";

function Tooltip({ vehicle, booking, left, top }) {
  if (!vehicle || !booking) return null;
  return (
    <div className="tip" style={{ position: "absolute", left, top }}>
      <strong>{booking.type}</strong>
      <br />
      Trip ID: {booking.id} <br />
      Trip Name: {booking.name}
      <br />
      Vehicle: {vehicle.id}, {vehicle.type}
      <br />
      Driver: {booking.driver}
      <br />
      Time: {convertToDateTimeString(booking.start)} to{" "}
      {convertToDateTimeString(booking.end)}
      <br />
    </div>
  );
}

export default Tooltip;
