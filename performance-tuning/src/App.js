import React, { useState, useEffect } from "react";
// import { getVehicles } from "./api/vehicleApi";
import { getMockVehicles, getMockCscs } from "./api/mockData";
import Vehicles from "./Vehicles";
import CheckboxList from "./CheckboxList";
import Tooltip from "./Tooltip";
import { convertDateToLeadingYearFormat } from "./utils/dates";
import "./App.css";

const todaysDate = convertDateToLeadingYearFormat(new Date());

const App = () => {
  const [searchTimestamp, setSearchTimestamp] = useState(Date.now());
  const [bookingTypeColors] = useState({
    Conflict: "#D61919", // red
    Trip: "#0082C0", // blue
    Route: "#00B454", // green
    "Out of Service": "#A84FBE" // purple
  });
  const [tooltipVehicle, setTooltipVehicle] = useState();
  const [tooltipBooking, setTooltipBooking] = useState();
  const [tooltipX, setTooltipX] = useState();
  const [tooltipY, setTooltipY] = useState();
  const [vehicles, setVehicles] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [display, setDisplay] = useState("vehicle");
  const [startDate, setStartDate] = useState(todaysDate);
  const [startTime, setStartTime] = useState("00:00");
  const [endDate, setEndDate] = useState(todaysDate);
  const [endTime, setEndTime] = useState("23:59");
  const [cscs, setCscs] = useState([]);

  useEffect(() => {
    // const vehicles = getVehicles().then(vehicles => {
    const vehicles = getMockVehicles();
    setVehicles(vehicles);
    setVehicleTypes(
      vehicles.map(v => ({
        value: v.id,
        label: v.type,
        checked: true
      }))
    );
    setCscs(getMockCscs());
    setSearchTimestamp(Date.now());
  }, []);

  function handleDisplayChange(event) {
    setDisplay(event.target.value);
  }

  function handleCscChange(toggledOption) {
    const updated = cscs.map(c => {
      return c.id === toggledOption.value ? { ...c, checked: !c.checked } : c;
    });
    setCscs(updated);
  }

  function handleVehicleTypeChange(toggledOption) {
    const updated = vehicleTypes.map(v => {
      return v.value === toggledOption.value
        ? { ...v, checked: !v.checked }
        : v;
    });
    setVehicleTypes(updated);
  }

  function handleSelectAllCscs(event) {
    event.preventDefault();
    setCscs(cscs.map(c => ({ ...c, checked: true })));
  }

  function handleSelectNoCscs(event) {
    event.preventDefault();
    setCscs(cscs.map(c => ({ ...c, checked: false })));
  }

  function handleSelectAllVehicleTypes(event) {
    event.preventDefault();
    setVehicleTypes(vehicleTypes.map(c => ({ ...c, checked: true })));
  }

  function handleSelectNoVehicleTypes(event) {
    event.preventDefault();
    setVehicleTypes(vehicleTypes.map(c => ({ ...c, checked: false })));
  }

  // Set showTooltip to true for the booking and vehicle id combo passed on the event.
  // This is for performance reasons. If we show all tooltips on initial load it takes
  // a long time to render them all. So we do it one at a time upon mouseover.
  function showTooltip(event) {
    // Place tooltip near where the hover occurred
    setTooltipY(event.clientY + 5);
    setTooltipX(event.clientX + 5);
    const [vehicleId, bookingId] = event.target.id.split(","); // vehicleId, bookingId are sent, comma delimited, on event.
    const vehicle = vehicles.find(v => v.id === parseInt(vehicleId));
    setTooltipVehicle(vehicle);
    setTooltipBooking(vehicle.bookings.find(b => b.id === parseInt(bookingId)));
  }

  function hideTooltip() {
    setTooltipVehicle(null);
    setTooltipBooking(null);
  }

  return (
    <div className="App">
      <header className="App-header">
        <form className="filters">
          <div className="filter">
            <label className="filter-label" htmlFor="display">
              Display
            </label>
            <div>
              <input
                type="radio"
                name="display-vehicle"
                id="display-vehicle"
                checked={display === "vehicle"}
                value="vehicle"
                onChange={handleDisplayChange}
              />
              <label htmlFor="display-vehicle">Vehicle</label>
            </div>

            <div>
              <input
                type="radio"
                name="display-driver"
                id="display-driver"
                checked={display === "driver"}
                value="driver"
                onChange={handleDisplayChange}
              />
              <label htmlFor="display-driver">Driver</label>
            </div>
          </div>

          <div className="filter">
            <label className="filter-label" htmlFor="start">
              Start
            </label>
            <br />
            <input
              type="date"
              name="startDate"
              min={todaysDate}
              value={startDate}
              onChange={event => setStartDate(event.target.value)}
            />
            <input
              type="time"
              name="startTime"
              value={startTime}
              onChange={event => setStartTime(event.target.value)}
            />

            <div style={{ marginTop: 20 }}>
              <label className="filter-label" htmlFor="end">
                End
              </label>
              <br />
              <input
                type="date"
                name="endDate"
                min={todaysDate}
                value={endDate}
                onChange={event => setEndDate(event.target.value)}
              />
              <input
                type="time"
                name="endTime"
                value={endTime}
                onChange={event => setEndTime(event.target.value)}
              />
            </div>
          </div>

          <div className="filter">
            <CheckboxList
              label="CSCs"
              onChange={handleCscChange}
              selectAll={handleSelectAllCscs}
              selectNone={handleSelectNoCscs}
              options={cscs.map(c => ({
                value: c.id,
                label: c.name,
                checked: c.checked
              }))}
            />
          </div>

          {display === "vehicle" && (
            <div className="filter">
              <CheckboxList
                label="Vehicle Type"
                onChange={handleVehicleTypeChange}
                selectAll={handleSelectAllVehicleTypes}
                selectNone={handleSelectNoVehicleTypes}
                options={vehicleTypes}
              />
            </div>
          )}

          <button type="submit" className="filter save-button">
            Search
          </button>
          <div style={{ clear: "both" }} />
        </form>
      </header>

      <Tooltip
        vehicle={tooltipVehicle}
        booking={tooltipBooking}
        left={tooltipX}
        top={tooltipY}
      />

      {vehicles.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <Vehicles
          searchTimestamp={searchTimestamp}
          vehicles={vehicles}
          bookingTypeColors={bookingTypeColors}
          showTooltip={showTooltip}
          hideTooltip={hideTooltip}
          selectedDates={[
            new Date(2018, 11, 3),
            new Date(2018, 11, 4),
            new Date(2018, 11, 5),
            new Date(2018, 11, 6),
            new Date(2018, 11, 7)
          ]}
        />
      )}
    </div>
  );
};

export default App;
