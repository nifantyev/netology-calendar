import React from 'react';
import PropTypes from 'prop-types';
import Week from './Week';
import { weekDays, weekDaysShort, months, monthsGen } from './constants';

const propTypes = {
  date: PropTypes.instanceOf(Date),
};

const getRussianWeekDay = (date) => {
  return date.getDay() === 0 ? 6 : date.getDay() - 1;
};

const addDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
};

const DAYS_IN_WEEK = 7;

const Calendar = ({ date }) => {
  // у нас неделя начинается с понедельника, а не с воскресенья
  const weekDay = getRussianWeekDay(date);
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const monthStartWeekDay = getRussianWeekDay(monthStart);
  let weekStart = addDays(monthStart, -monthStartWeekDay);
  const weeks = [];
  while (weekStart <= monthEnd) {
    const week = [];
    for (let i = 0; i < DAYS_IN_WEEK; i++) {
      week.push(addDays(weekStart, i));
    }
    weeks.push(week);
    weekStart = addDays(weekStart, DAYS_IN_WEEK);
  }
  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{weekDays[weekDay]}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{date.getDate()}</div>
          <div className="ui-datepicker-material-month">
            {monthsGen[date.getMonth()]}
          </div>
          <div className="ui-datepicker-material-year">
            {date.getFullYear()}
          </div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{months[date.getMonth()]}</span>
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
