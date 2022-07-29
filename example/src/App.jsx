import React from 'react';
import Calendar from 'react-awesome-calendar';
import styles from './themes/app.scss';

//calculate a new date that is tomorrow at  01:00 am
const tomorrow = new Date();
tomorrow.setDate(26);
tomorrow.setHours(0);
tomorrow.setMinutes(0);
tomorrow.setSeconds(0);
tomorrow.setMilliseconds(0);

const events = [

  {
    id: 1,
    color: '#fda256',
    from: tomorrow,
    to: '2022-07-25T01:00:00.000Z',
    title: 'Dinner',
  },
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.calendar = React.createRef();
  }

  componentDidMount() {
    const details = this.calendar.current.getDetails();
    // call get events endpoint

  }

  render() {
    return (
      <div className={styles.pageCalendar}>
        <Calendar
          style={{
            height: '600px',
          }}
          ref={this.calendar}
          onClickEvent={(event) => console.log('this is an event', event)}
          onChange={(dates) => console.log("kuku", dates)}
          currentMonth={6}
          mode="weeklyMode"
          currentYear={2022}
          onClickTimeLine={(date) => console.log(date)}
          events={events}
        />
      </div>
    );
  }
}

export default App;
