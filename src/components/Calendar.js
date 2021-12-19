import React from 'react';
import PropTypes from 'prop-types';
import {
  format,
  eachWeekOfInterval,
  startOfMonth,
  endOfMonth,
  addDays,
} from 'date-fns';
import { ru } from 'date-fns/locale';
import Week from './Week';

const propTypes = {
  date: PropTypes.instanceOf(Date),
};

const capitalize = (s) => s[0].toUpperCase() + s.substr(1);

const locale = ru;

const DAYS_IN_WEEK = 7;

const range = (n) => {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
};

const weekDays = range(DAYS_IN_WEEK).map((i) =>
  capitalize(
    locale.localize.day((i + locale.options.weekStartsOn) % DAYS_IN_WEEK, {
      width: 'wide',
    })
  )
);

const weekDaysShort = range(DAYS_IN_WEEK).map((i) =>
  capitalize(
    locale.localize.day((i + locale.options.weekStartsOn) % DAYS_IN_WEEK, {
      width: 'short',
    })
  )
);

const Calendar = ({ date }) => {
  const weeks = eachWeekOfInterval(
    { start: startOfMonth(date), end: endOfMonth(date) },
    { locale: locale }
  ).map((startOfWeek) => {
    return range(DAYS_IN_WEEK).map((key) => addDays(startOfWeek, key));
  });

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">
          {capitalize(format(date, 'cccc', { locale: locale }))}
        </div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{date.getDate()}</div>
          <div className="ui-datepicker-material-month">
            {format(date, 'MMMM', { locale: locale })}
          </div>
          <div className="ui-datepicker-material-year">
            {date.getFullYear()}
          </div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">
            {capitalize(format(date, 'LLLL', { locale: locale }))}
          </span>
          &nbsp;
          <span className="ui-datepicker-year">{date.getFullYear()}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            {weekDaysShort.map((val, index) => (
              <th scope="col" title={weekDays[index]} key={val}>
                {val}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <Week week={week} date={date} key={week} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

Calendar.propTypes = propTypes;

export default Calendar;
