import React from 'react';
import styles from './index.styles.scss';
import {getCalendarMonth, getCalendarWeek, getEventsForCalendar} from '../util/calendar';
import Week from './Week';
import Daily from "../Daily";
import WeekDaily from "../WeekDaily";

export default class Weekly extends React.Component {
  constructor(props) {
    super(props);
    this.onClickDay = this.onClickDay.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
  }

  onClickDay(date) {
    if (this.props.onClickDay) {
      this.props.onClickDay(date);
    }
  }

  onClickPrev() {
    if (this.props.onClickPrev) {
      this.props.onClickPrev();
    }
  }

  onClickNext() {
    if (this.props.onClickNext) {
      this.props.onClickNext();
    }
  }

  returnCalendar() {
    /* let calendar = getCalendarMonth(this.props.month, this.props.year);
     calendar = getEventsForCalendar(this.props.events, calendar);*/
    //console.log("calendar", calendar)
    /*if (Array.isArray(calendar) && calendar.length) {
      return calendar.map((week, i) => {
        return (
          <Week
            key={i}
            week={week}
            current={{
              month: this.props.month,
              year: this.props.year,
            }}
            onClickDay={this.onClickDay}
            // onClickEvent={this.props.onClickEvent}
            onClickPrev={this.onClickPrev}
            onClickNext={this.onClickNext}
          />
        );
      });
    }*/
    /* this.props.daysOfWeek.forEach((day, i) => {
       return (
         <Daily

           onClickEvent={this.props.onClickEvent}
           onClickTimeLine={this.onClickTimeLine}
         />
       );
     })*/
    let calendar = getCalendarWeek(this.props.month, this.props.year, this.props.week);
    //calendar = getEventsForCalendar(this.props.events, calendar);
    console.log("calendar", this.props.week, calendar)
    if (Array.isArray(calendar) && calendar.length) {
      return calendar.map((date, i) => {
        return (
          <WeekDaily
            key={i}
            index={i}
            date={date.date}
            onClickPrev={this.onClickPrev}
            onClickNext={this.onClickNext}
          />
        );
      });
    }
  }

  getDate(day, index) {
    let date = new Date();
    let currentDate = date.getDate();
    console.log("currentDate", currentDate, date.getDay());
    date.setDate(date.getDate() + index - date.getDay());
    return day + " " + date.getDate();

  }

  returnDayOfWeekHeader() {
    return this.props.daysOfWeek.map((day, i) => {
      return <span className={i === new Date().getDay() ? 'day-header selected' : 'day-header'} key={i}>{this.getDate(day, i)}</span>;
    });
  }

  render() {
    return (
      <div className={styles.weeklyCalendar}>
        {/* <div className={styles.calendarDayOfWeek}>
          {this.returnDayOfWeekHeader()}
        </div>*/}
        <div style={{
          overflowY: 'scroll',
          height: 'calc(100% - 50px)',
          display: 'inline-flex',
          width: '100%'
        }}>
          {this.returnCalendar()}
        </div>

      </div>
    );
  }
}

Weekly.defaultProps = {
  daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
