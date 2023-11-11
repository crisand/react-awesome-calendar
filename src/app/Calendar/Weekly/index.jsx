import React from 'react';
import styles from './index.styles.scss';
import {
  formatEvents,
  formatWeekEvents,
  getCalendarMonth,
  getCalendarWeek,
  getEventsForCalendar
} from '../util/calendar';
import Week from './Week';
import Daily from "../Daily";
import WeekDaily from "../WeekDaily";

export default class Weekly extends React.Component {
  constructor(props) {
    super(props);
    this.state = { barTop: 0 }
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

  onClickTimeLine(event) {
    // console.log("event", event)
    this.props.onClickTimeLine(event);
  }

  onClickEvent(event) {
    //console.log("click event", event)
  }

  setBarTop(top) {

    if (this.container && !this.state.barTop&&this.container.firstChild?.firstChild?.firstChild) {
      //console.log("calendar", this.container.firstChild.firstChild.firstChild.offsetHeight,
      // this.container.offsetHeight);
      //calculate minutes since today at 00:00
      const newDate = new Date();
      //newDate.setHours(12, 0, 0, 0);
      let minutes = newDate.getHours() * 60 + newDate.getMinutes();
      let barTop = (minutes / (24 * 60)) * this.container.firstChild.firstChild.firstChild.offsetHeight;
      this.setState({ barTop: barTop - 0 });
      //this.setState({ barTop: 10 });
      //this.setBarTop = true;
    }
  }

  returnCalendar() {

    let calendar = getCalendarWeek(this.props.month, this.props.year, this.props.week);
    //calendar = getEventsForCalendar(this.props.events, calendar);
    ///console.log("calendar", this.props.week, calendar)
    if (Array.isArray(calendar) && calendar.length) {
      return calendar.map((date, i) => {
        return (
          <WeekDaily
            key={i + "_" + date.date.getDate()}
            index={i}
            events={this.returnDailyEvents(date.date)}
            date={date.date}
            onClickEvent={this.onClickEvent}
            onClickTimeLine={this.onClickTimeLine.bind(this)}
            onClickPrev={this.onClickPrev}
            onClickNext={this.onClickNext}
          />
        );
      });
    }
  }

  returnCalendarHeader() {

    let calendar = getCalendarWeek(this.props.month, this.props.year, this.props.week);
    //calendar = getEventsForCalendar(this.props.events, calendar);
    //console.log("calendar", this.props.week, calendar)
    if (Array.isArray(calendar) && calendar.length) {
      return calendar.map((date, i) => {
        return <span className={date.date.getDate() === new Date().getDate() && date.date.getMonth() === new Date().getMonth() && date.date.getFullYear() === new Date().getFullYear() ? 'day-header' +
          ' selected' : 'day-header'}>{this.props.daysOfWeek[i] + " " + date.date.getDate()}</span>;
      });
    }
  }

  returnDailyEvents(date) {
    let events = [];
    let i = 1;
    //console.log("kaka", events)
    for (let p in this.props.events) {
      const dateu = new Date(parseFloat(p));
      //console.log("p", new Date(parseFloat(p)).getDate(), date.getDate())
      if (dateu.getDate() === date.getDate() && dateu.getMonth() === date.getMonth() && dateu.getFullYear() === date.getFullYear()) {
        const event = this.props.events[p];
        if (event) {
          for (let l in event) {
            event[l].time = event[l].from.toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            });
            event[l].timeTo = event[l].to.toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            });
            events.push(event[l])
          }
        }
        /* events.push({
           color: "#fda256",
           date: new Date(parseFloat(p)).getDate(),
           id: i,
           title: this.props.events[p].title,
           from: new Date(parseFloat(p)).getDate(),
           to: new Date(parseFloat(p)).getDate()
         });
 */
        /*events[date.getTime()] = formatWeekEvents(this.props.events[p])
        console.log("YAYAYAY", formatWeekEvents(this.props.events[p]))*/
        //console.log("kaka", this.props.events[p])
        i++
      }
      //console.log("p", events[p], formatWeekEvents(events[p]))
      //events[p] = formatWeekEvents(events[p])

      // events.push(this.props.events[p])
      //events = events.concat(this.props.events[p])

    }
    /*for (let p in events) {
      //events[p] = formatWeekEvents(events[p])
      /!* if (new Date(parseFloat(p)).getDate() === date.getDate()) {
         // events.push(this.props.events[p])
         //events = events.concat(this.props.events[p])

       }*!/
    }
    //console.log("eventsu", events)
    /!* return this.props.events.filter(event => {
       return event.from.getDate() === date.getDate() && event.from.getMonth() === date.getMonth() && event.from.getFullYear() === date.getFullYear();
     })*!/
    // const eventsByDay = formatEvents(events);)*/

    //const dateu = new Date(date.getFul, date.getMonth(), date.getDate());
    // console.log("mata", date, events[date.getTime()])

    return events;
    //return formatWeekEvents(events);
  }

  getDate(day, index) {
    let date = new Date();
    let currentDate = date.getDate();
    //console.log("currentDate", currentDate, date.getDay());
    date.setDate(date.getDate() + index - date.getDay());
    return day + " " + date.getDate();

  }

  returnDayOfWeekHeader() {
    return this.props.daysOfWeek.map((day, i) => {
      return <span className={i === new Date().getDay() ? 'day-header selected' : 'day-header'} key={i}>{this.getDate(day, i)}</span>;
    });
  }

  returnHoursLine() {
    const hours = [
      '00:00 am',
      '01:00 am',
      '02:00 am',
      '03:00 am',
      '04:00 am',
      '05:00 am',
      '06:00 am',
      '07:00 am',
      '08:00 am',
      '09:00 am',
      '10:00 am',
      '11:00 am',
      '12:00 pm',
      '01:00 pm',
      '02:00 pm',
      '03:00 pm',
      '04:00 pm',
      '05:00 pm',
      '06:00 pm',
      '07:00 pm',
      '08:00 pm',
      '09:00 pm',
      '10:00 pm',
      '11:00 pm',

    ];
    return <div style={{ width: 55 }}>
      {
        hours.map((hour, i) => {
          return (
            <div key={i} style={{
              width: '100%',
              backgroundColor: '#ffffff',
              height: 61
            }}>

              <div className='hour-time'>{hour}</div>

            </div>
          );
        })
      }
    </div>

  }

  render() {
    /*let barTop, scrollTop=0;
    const time = () => {
      barTop = this.context.state.hoursElapsed * 181 + 20 || 0;
      scrollTop = barTop - window.innerHeight / 2;
      //if (this.timeList) this.timeList.scrollTop = scrollTop;
      return <div></div>
    }*/
    return (
      <div className={styles.weeklyCalendar}>
        <div className={styles.calendarDayOfWeekWeekly}>
          {this.returnCalendarHeader()}
        </div>
        <div ref={(ref)=>{
          if(ref&&! ref.scrollTop){
            ref.scrollTop =61*8;
          }
        }} style={{
          overflowY: 'scroll',
          height: 'calc(100% - 30px)',
          display: 'inline-flex',
          width: '100%'
        }}>
          {this.returnHoursLine()}
          <div ref={(ref) => {
            this.container = ref;
            this.setBarTop()
          }} style={{
            flexGrow: 1,
            position: 'relative',
            display: 'inline-flex'
          }}>
            {this.returnCalendar()}

            {/*<div className='time-bar-container2' style={{ top: this.state.barTop }}>
              <div className='time-bar-circle2'></div>
              <div className='time-bar2'></div>
            </div>*/}

          </div>


        </div>

      </div>
    );
  }
}

Weekly.defaultProps = {
  daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
