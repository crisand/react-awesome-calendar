import React from 'react';
import styles from './index.styles.scss';
import {getElementHeight} from '../util/getElementHeight';
import Event from './Event';
import {endPosition, middlePosition, startPosition} from '../constants';
import Weekly from "../Weekly";

export default class WeekDaily extends React.Component {
  
  hours = [
    
  ];
  constructor(props) {
    super(props);
    this.state = {};
    this.onClickTimeLine = this.onClickTimeLine.bind(this);
  }

  setBarTop(el) {
    ///console.log("el", el);
    if (!el || this.state.barTop || !this.props.date) {
      return;
    }
    const display = this.props.date.getDate() === new Date().getDate() && this.props.date.getMonth() === new Date().getMonth() && this.props.date.getFullYear() === new Date().getFullYear() ? 'inline-flex' : 'none';
    const newDate = new Date();
    //newDate.setHours(12, 0, 0, 0);
    let minutes = newDate.getHours() * 60 + newDate.getMinutes();
    //console.log("ellee", el.offsetHeight)
    let barTop = (minutes / (24 * 60)) * el.offsetHeight;
    this.setState({
      barTop: barTop - 0,
      display
    });
  }

  componentDidMount() {
    const hours = [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
    
    ];
    this.hours = hours.map((hour, i) => {
      let obj={};
      obj.hour=hour;
      obj.timestamp= new Date(this.props.date.getFullYear(), this.props.date.getMonth(), this.props.date.getDate(), i, 0, 0).getTime();
      obj.class=obj.timestamp < new Date().getTime()-30*60*1000 ? 'dailyHourWrapper2 hoverable' : 'dailyHourWrapper2';
      return obj;
    });
    this.getHourPosition();

  }

  componentDidUpdate() {
    this.getHourPosition();
  }

  returnHourWrapperHeight() {
    const hourWrappers = document.getElementsByClassName('dailyHourWrapper2');
    const wrapper = getElementHeight(hourWrappers[0]);
    return wrapper || 0;
  }

  returnHourHeaderHeight() {
    const hourHeader = document.getElementsByClassName('dailyHour2');
    const header = getElementHeight(hourHeader[0]);
    return header || 0;
  }

  getTimeLineEvents() {
    const { events } = this.props;
    if (Array.isArray(events) && events.length) {
      return events.filter(e => (
        e.position !== middlePosition &&
        !e.allDay &&
        !(e.position === endPosition && this.getTimeInHours(new Date(e.to)) === 0)
      ));
    }
    return [];
  }

  getAllDayEvents() {
    const { events } = this.props;
    //console.log("eventsmfk", events);
    if (Array.isArray(events) && events.length) {
      //console.log("matataga")
      return events.filter(e => (
        e.position === middlePosition ||
        e.allDay ||
        (e.position === endPosition && this.getTimeInHours(new Date(e.to)) === 0)
      ));
    }
    return [];
  }
  getHoursClass(timestamp){
    console.log("class",styles.dailyHourWrapper2)
    return styles.dailyHourWrapper2+this.getIsHoverable(timestamp);
  };
  getIsHoverable(timestamp) {
    //return the class hoverable only to hours that are past current time
  
    if (timestamp > new Date().getTime()) {
      return ' hoverable';
    }
    /* if(this.props.date.getDate() === new Date().getDate() && this.props.date.getMonth() === new Date().getMonth() && this.props.date.getFullYear() === new Date().getFullYear()){
      const newDate= new Date();
      const hourParts = hour.split(':');
      const hourNumber = parseInt(hourParts[0]);
      const minuteNumber = parseInt(hourParts[1]);
      newDate.setHours(hourNumber);
      newDate.setMinutes(minuteNumber);
      if (newDate.getTime() > new Date().getTime()) {
        return ' hoverable';
      }
    } */
  }

  getHourPosition() {
    const { events } = this.props;
    if (Array.isArray(events) && events.length) {
      const dayEvents = this.getTimeLineEvents();
      const hourWrapperHeight = this.returnHourWrapperHeight();
      const hourHeaderHeight = this.returnHourHeaderHeight() / 2;

      // const eventWidthHandled = [];
      dayEvents.forEach((event, index) => {
        //event.position === startPosition
        const id = `dailyEvent-${event.id}-${event.date.getDate()}`;
        let fromDate = new Date(event.from);
        let toDate = new Date(event.to);
        let fromHour = this.getTimeInHours(fromDate);
        let toHour = this.getTimeInHours(toDate);
        //console.log('toHour', toHour);
        if (event.position === endPosition) {
          fromHour = 0;
          if (toHour === 0) {
            toHour = 24;
          }
        }
        if (event.position === startPosition || (event.span === 1 && toHour === 0)) {
          toHour = 24;
        }
        const timeDiff = toHour - fromHour;
        //console.log('timeDiff', event.title, timeDiff, toHour, fromHour);
        const eventHeight = timeDiff * hourWrapperHeight;
        const eventPosition = fromHour * hourWrapperHeight + hourHeaderHeight;

        // eventWidthHandled.push(event.id);
        // this.handleEventWidth(
        //   eventWidthHandled,
        //   dayEvents,
        //   fromHour,
        //   toHour,
        //   event.id,
        // );

        document.getElementById(id).style.top = `${eventPosition}px`;
        document.getElementById(id).style.height = `${eventHeight}px`;
        document.getElementById(id).style.width = `'100%'`;
        document.getElementById(id).style.left = 0
        //`calc((100% / ${dayEvents.length}) * ${index})`;
      });
    }
  }

  getTimeInHours(date) {
    return date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600000;
  }

  // handleEventWidth(eventWidthHandled, events, fromHour, toHour, currentId) {
  //   // const changedEvents = events.filter(
  //   //   e => !eventWidthHandled.find(id => id === e.id),
  //   // );
  //   const changedEvents = events;
  //   if (Array.isArray(changedEvents) && changedEvents.length) {
  //     const dayEventMultiple = ' dayEventMultiple';
  //     const numberOfEvents = changedEvents.length + 1;
  //     const width = `${100 / numberOfEvents}%`;
  //     console.log('changedEvents',changedEvents);
  //     changedEvents.forEach((e, i) => {
  //       eventWidthHandled.push(e.id);
  //       const eventId = `dailyEvent-${e.id}-${e.date.getDate()}`;
  //       console.log(eventId, document.getElementById(eventId))
  //       document.getElementById(eventId).style.width = width;
  //       document.getElementById(eventId).style.left = `${(100 /
  //         numberOfEvents) *
  //       (i + 1)}%`;
  //       document.getElementById(eventId).className += dayEventMultiple;
  //     });
  //   }
  // }

  

  returnHoursLine() {
   
    return this.hours.map((hour, i) => {
      return (
        <div key={i} className={hour.class}>
          <div className={styles.dailyHour2}>
            <div className={styles.dailyHourLine2}/>
          </div>
        </div>
      );
    });
  }

  returnEvents() {
    const dayEvents = this.getTimeLineEvents();
    if (Array.isArray(dayEvents) && dayEvents.length) {
      return dayEvents.map(event => {
        return (
          <div
            key={event.id}
            id={`dailyEvent-${event.id}-${event.date.getDate()}`}
            className={styles.dayEvent2}
          >
            <Event
              color={'#fff'}
              title={event.title}
              time={event.time}
              timeTo={event.timeTo}
              onClick={() => this.onClickEvent(event.id)}
            />
          </div>
        );
      });
    }
  }

  onClickEvent(id) {
    if (this.props.onClickEvent) {
      this.props.onClickEvent(id);
    }
  }

  onClickTimeLine(event) {
    if (this.props.onClickTimeLine) {
      const scrollTop = document.getElementById('dailyTimeLine').scrollTop;
      const clientY = event.clientY;
      let rect = document.getElementById('dailyTimeLine').getBoundingClientRect();
      const positionY = clientY + scrollTop - rect.top - (this.returnHourHeaderHeight() / 2);

      let hourPosition = positionY / this.returnHourWrapperHeight();
      let hour = Math.round(hourPosition * 2) / 2;
      if (hour <= 0) {
        hour = 0;
      }
      if (hour > 24) {
        hour = 24;
      }
      //console.log('clientY', clientY, hour);
      const newDate = new Date(this.props.date);
      newDate.setHours(hour);
      newDate.setMinutes((hour - Math.floor(hour)) * 60);
      if (newDate.getTime() >= (new Date).getTime()) this.props.onClickTimeLine(newDate);
      //this.props.onClickTimeLine(this.props.date + ' ' + hour + ':00:00');
    }
  }

  returnTimeLine() {
    return (
      <div id='dailyTimeLine' className={styles.dailyTimeLineWrapper2} onClick={this.onClickTimeLine}>
        {/*  <div className={styles.dailyHourTextWrapper}>{this.returnHours()}</div>*/}
        <div ref={ref => {
          this.setBarTop(ref)
        }} className={styles.dailyTimeLine2}>
          <div>
            {this.returnEvents()}
          </div>
          {this.returnHoursLine()}
        </div>
        <div className='time-bar-container2' style={{
          top: this.state?.barTop,
          display: this.state?.display
        }}>
          <div className='time-bar-circle2'></div>
          <div className='time-bar2'></div>
        </div>
      </div>
    );
  }

  returnAllDayEvents() {
    const dailyEvents = this.getAllDayEvents();
    //console.log("dailyEvents", dailyEvents);
    //console.log('dailyEvents', dailyEvents);
    if (Array.isArray(dailyEvents) && dailyEvents.length) {
      return dailyEvents.map(event => {
        return (
          <div key={event.id} className={styles.allDayEvent2}>
            <Event
              color={event.color}
              time={event.time}
              title={event.title}
              onClick={() => this.onClickEvent(event.id)}
            />
          </div>
        );
      });
    }
  }

  returnDayOfWeekHeader() {
    //console.log("kaka", this.props.date)
    return this.props.date ? <span className={this.props.date.getDate() === new Date().getDate() ? 'day-header' +
      ' selected' : 'day-header'}>{this.props.daysOfWeek[this.props.index] + " " + this.props.date.getDate()}</span> : null;
    /*return this.props.daysOfWeek.map((day, i) => {
      return <span className={i === new Date().getDay() ? 'day-header selected' : 'day-header'} key={i}>{this.getDate(day, i)}</span>;
    });*/
  }

  render() {
    return (
      <div className={styles.dailyWrapper2}>
        {/*<div className={styles.calendarDayOfWeek}>
          {this.returnDayOfWeekHeader()}
        </div>*/}
        {this.returnAllDayEvents()}
        {this.returnTimeLine()}

      </div>
    );
  }
}
WeekDaily.defaultProps = {
  daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

