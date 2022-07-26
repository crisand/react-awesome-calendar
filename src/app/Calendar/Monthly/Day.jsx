import React from 'react';
import styles from './Day.styles.scss';
import classnames from 'classnames';
import Event from './Event';
import {getElementHeight} from '../util/getElementHeight';
import {getDate} from '../util/date';

export default class Day extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false,
      eventNumber: 1,
    };
  }

  componentDidMount() {
    this.shouldShowRemainder();
  }

  componentDidUpdate() {
    if (this.props.date.getDate() < new Date().getDate()) {
      this.setState({ isDisabled: true })
    }
    this.shouldShowRemainder();
  }

  isCurrentDate() {
    const date = this.props.date.getTime();
    const currentDate = getDate(new Date()).getTime();
    return date === currentDate;
  }

  returnDayClassStyle() {
    let className = [styles.dayDate];
    if (!this.props.current) {
      className.push(styles.inactiveDay);
    }
    //if date day is less than today day add the disable style
    if (this.props.date.getDate() < new Date().getDate()) {
      className.push(styles.disabled);
    }
    /*if (this.props.date.getTime() < new Date().getTime()) {
      className.push(styles.disabled);
    }*/
    return classnames(className);
  }

  shouldShowRemainder() {
    const { events } = this.props;
    if (Array.isArray(events) && events.length) {
      const dayCell = document.getElementById('dayCell');
      const dayCellHeight = getElementHeight(dayCell);

      const dayHeader = document.getElementById('dayHeader');
      const dayHeaderHeight = getElementHeight(dayHeader);

      const eventsList = document.getElementsByClassName('dayCellEvent');
      const singleEvent = eventsList[0];
      const singleEventHeight = getElementHeight(singleEvent);

      const remainingTextHeight = 16;

      const eventGroupHeight =
        dayCellHeight - dayHeaderHeight - remainingTextHeight;

      const numberOfEventsToDisplay = Math.floor(
        eventGroupHeight / singleEventHeight
      );

      this.setState({
        eventNumber: numberOfEventsToDisplay,
      });
    }
  }

  returnEventList() {
    const { events } = this.props;
    if (Array.isArray(events) && events.length) {
      let displayEvents = events.slice(0, this.state.eventNumber);
      displayEvents = displayEvents.map(event => {
        //console.log("event.from", event.from, typeof event.from.getHours)
        const startTime = typeof event.from.getHours === 'function' ? event.from : new Date(event.from);
        //display hours and minutes in format 2:30am based on date string
        event.time = startTime.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });
        /*//hours with timezone offset
        const hours = startTime.getHours();
        const minutes = startTime.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        const hour = hours % 12;
        const minute = minutes < 10 ? `0${minutes}` : minutes;
        const time = `${hour}:${minute}${ampm}`;
        event.time = time;*/
        return event;
      })
      //console.log("displayEvents", displayEvents);
      return (
        <div className={styles.dayCellEventWrapper}>
          {this.returnEvents(displayEvents)}
        </div>
      );
    }
  }

  returnEvents(events) {
    return events.map(event => {
      return (
        <Event
          height={16}
          time={event.time}
          inactive={!this.props.current}
          key={event.id}
          color={event.color}
          title={event.title}
          position={event.position}
          // onClick={() => this.props.onClickEvent && this.props.onClickEvent(event)}
        />
      );
    });
  }

  returnEventRemainder() {
    const { events } = this.props;
    const { eventNumber } = this.state;
    if (Array.isArray(events) && events.length > eventNumber) {
      const remainder = events.length - eventNumber;
      return (
        <span className={styles.dayEventsRemaining}>
          {`${remainder} more...`}
        </span>
      );
    }
  }

  returnDayTextClass() {
    let className = [styles.dayText];
    if (this.isCurrentDate()) {
      className.push(styles.currentDay);
    }
    return classnames(className);
  }

  render() {
    return (
      <div
        id="dayCell"
        className={styles.dayCell}
        onClick={() => {
          if (!this.state.isDisabled) this.props.onClickDay()
        }}
      >
        <div id="dayHeader" className={this.returnDayClassStyle()}>
          <div className={this.returnDayTextClass()}>
            <span>{this.props.date.getDate()}</span>
          </div>
        </div>
        {this.returnEventList()}
        {this.returnEventRemainder()}
      </div>
    );
  }
}
