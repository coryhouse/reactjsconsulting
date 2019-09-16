import React from "react";
import "./Table.scss";

const Table = props => {
  return (
    <table>
      <thead>
        <tr>
          <th>Account</th>
          <th>Due Date</th>
          <th>Amount</th>
          <th>Period</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Visa - 3412</td>
          <td>04/01/2016</td>
          <td>$1,190</td>
          <td>03/01/2016 - 03/31/2016</td>
        </tr>
        <tr>
          <td>Visa - 6076</td>
          <td>03/01/2016</td>
          <td>$2,443</td>
          <td>02/01/2016 - 02/29/2016</td>
        </tr>
        <tr>
          <td>Corporate AMEX</td>
          <td>03/01/2016</td>
          <td>$1,181</td>
          <td>02/01/2016 - 02/29/2016</td>
        </tr>
        <tr>
          <td>Visa - 3412</td>
          <td>02/01/2016</td>
          <td>$842</td>
          <td>01/01/2016 - 01/31/2016</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
