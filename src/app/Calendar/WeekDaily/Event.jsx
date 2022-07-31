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
        <span style={{
          color: "#151515",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 5
        }} className={styles.dailyEventTitle}><div className='dot'></div><span style={{ flexGrow: 1 }}>{this.props.title}</span> <span className='eventTime'>{this.props.time}</span></span>
      </div>
    );
  }
}
