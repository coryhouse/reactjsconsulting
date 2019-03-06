import React, { useState, useEffect, useRef } from "react";
import { getBooking } from "./utils/dates";
import "./Vehicles.css";

const HOURS_PER_DAY = 24;

function formatTime(hour) {
  if (hour === 0) return "12a";
  if (hour === 12) return "12p";
  return hour < 12 ? hour + "a" : hour - 12 + "p";
}

const Vehicles = ({
  vehicles,
  selectedDates,
  bookingTypeColors,
  showTooltip,
  hideTooltip
}) => {
  const vehicleTableRef = useRef(null);
  const [
    vehicleTableRefDistanceFromTop,
    setvehicleTableRefDistanceFromTop
  ] = useState(0);
  const [windowInnerHeight, setWindowInnerHeight] = useState(
    window.innerHeight
  );

  const [gridContainerHeight, setGridContainerHeight] = useState(
    windowInnerHeight - vehicleTableRefDistanceFromTop
  );

  const [gridContainerWidth, setGridContainerWidth] = useState(
    window.innerWidth
  );

  function updateWindowDimensions() {
    setWindowInnerHeight(window.innerHeight);
    setGridContainerWidth(window.innerWidth);
  }

  // Runs once, after initial render, so we can watch for resize and get the vehicleTableRef's offset.
  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    const offset = vehicleTableRef.current.getBoundingClientRect();
    setvehicleTableRefDistanceFromTop(offset.top);

    // componentWillUnmount
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  useEffect(() => {
    setGridContainerHeight(windowInnerHeight - vehicleTableRefDistanceFromTop);
  }, [windowInnerHeight]);

  return (
    <>
      <div
        className="grid-container"
        style={{ height: gridContainerHeight, width: gridContainerWidth }}
      >
        <table className="vehicles" ref={vehicleTableRef}>
          <thead>
            {/* 
        The table-layout is "fixed" for rendering performance. 
        This means the widths of this first row are applied to all rows below */}
            <tr>
              <th width="100" className="sticky-header vehicle-type" />
              {selectedDates.map(date => {
                const cells = [];
                for (let i = 0; i < HOURS_PER_DAY; i++) {
                  cells.push(
                    <th key={i} className="timeslot sticky-header">
                      {i === 0 ? (
                        <>
                          <div className="date">{date.toDateString()}</div>
                          <div className="first-hour">{formatTime(i)}</div>
                        </>
                      ) : (
                        formatTime(i)
                      )}
                    </th>
                  );
                }
                return cells;
              })}
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, vehicleRowNumber) => {
              return (
                <tr key={vehicleRowNumber}>
                  <td className="vehicle-type">{vehicle.type}</td>
                  {selectedDates.map((selectedDate, dateIndex) => {
                    const cells = [];
                    for (let i = 0; i < HOURS_PER_DAY; i++) {
                      const dateTime = new Date(
                        selectedDate.getFullYear(),
                        selectedDate.getMonth(),
                        selectedDate.getDate(),
                        i
                      );

                      const booking = getBooking(dateTime, vehicle.bookings);

                      // Don't apply new-day style for first td on each row
                      const className =
                        dateIndex !== 0 && i === 0
                          ? "timeslot new-day"
                          : "timeslot";

                      // Color bookings based on booking type
                      const style = booking
                        ? { backgroundColor: bookingTypeColors[booking.type] }
                        : null;

                      cells.push(
                        <td
                          key={i}
                          className={className}
                          style={style}
                          id={booking ? vehicle.id + "," + booking.id : null}
                          onMouseOver={booking ? showTooltip : null}
                          onMouseOut={hideTooltip}
                        />
                      );
                    }
                    return cells;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

// For perf, only re-render this table when a new search is performed.
// function areEqual(prevProps, nextProps) {
//   return prevProps.searchTimestamp === nextProps.searchTimestamp;
// }

// To avoid needless renders, wrap in React.memo
// export default React.memo(Vehicles, areEqual);

export default Vehicles;
