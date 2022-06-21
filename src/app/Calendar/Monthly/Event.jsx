import React from 'react';
import classnames from 'classnames';
import { middlePosition, startPosition } from '../constants';
import styles from './Event.styles.scss';

export default class Event extends React.PureComponent {
  returnEventsClassName(position) {
    const { inactive } = this.props;
    console.log("props", this.props);
    const className = [styles.dayCellEvent];
    if (position) {
      if (position === startPosition) {
        className.push(styles.eventStart);
      } else if (position === middlePosition) {
        className.push(styles.eventMiddle);
      } else {
        className.push(styles.eventEnd);
      }
    }
    if (inactive) {
      className.push(styles.eventInactive);
    }
    return classnames(className);
  }

  returnEventName(title, position) {
    let showTitle = false;
    console.log("styles", styles);
    if (position) {
      if (position === startPosition) {
        showTitle = true;
      }
    } else {
      showTitle = true;
    }
    if (showTitle) {
      return <span style={{ color: "#151515", display: "flex", flexDirection: "row", alignItems: "center", gap: 5 }} className={styles.eventTitle}><div className='dot'></div><span style={{ flexGrow: 1 }}>{title}</span> <span className='eventTime'>{this.props.time}</span></span>;
    }
  }

  render() {
    const { color, position, title, height } = this.props;
    return (
      <div
        style={{ backgroundColor: "#ffffff", color: "#151515", height }}
        className={this.returnEventsClassName(position)}
        onClick={this.props.onClick}
      >
        {this.returnEventName(title, position)}
      </div>
    );
  }
}
