import React from 'react';
import styles from './Event.styles.scss';

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    //console.log("props", props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.stopPropagation();
    this.props.onClick();
  }

  render() {
    return (
      <div
        style={{ backgroundColor: this.props.color }}
        onClick={this.onClick}
        className={styles.dailyEventWrapper}
      >
        {/*<span className={styles.dailyEventTitle}>{this.props.title}</span>*/}
        <div style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          opacity: 0.15,
          backgroundColor: '#007AC2'
        }}></div>
        <div style={{
          color: "#151515",
          display: "flex",
          marginTop: 5,
          flexDirection: "column",

          gap: 10
        }}>
          <div className='eventTimeDailyTitleHeader'>{this.props.title}</div>
          <div className='eventTimeDailyTime'>{this.props.time + "-" + this.props.timeTo}</div>
        </div>
      </div>
    );
  }
}
