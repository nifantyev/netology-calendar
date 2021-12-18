import React from 'react';

const Week = ({ week, date }) => {
  return (
    <tr>
      {week.map((day) => {
        return day.getMonth() === date.getMonth() ? (
          day.getDate() === date.getDate() ? (
            <td className="ui-datepicker-today" key={day}>
              {day.getDate()}
            </td>
          ) : (
            <td key={day}>{day.getDate()}</td>
          )
        ) : (
          <td className="ui-datepicker-other-month" key={day}>
            {day.getDate()}
          </td>
        );
      })}
    </tr>
  );
};

export default Week;
