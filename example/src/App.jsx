import React from 'react';
import Calendar from 'react-awesome-calendar';
import styles from './themes/app.scss';

//calculate a new date that is tomorrow at  01:00 am
const tomorrow = new Date();
tomorrow.setDate(29);
tomorrow.setHours(12);
tomorrow.setMinutes(0);
tomorrow.setSeconds(0);
tomorrow.setMilliseconds(0);

const tomorrow2 = new Date();
tomorrow2.setDate(29);
tomorrow2.setHours(14);
tomorrow2.setMinutes(0);
tomorrow2.setSeconds(0);
tomorrow2.setMilliseconds(0);

const yes = new Date();
yes.setDate(28);
yes.setHours(13);
yes.setMinutes(0);
yes.setSeconds(0);
yes.setMilliseconds(0);

const events = [
  {
    id: 1,
    color: '#fda256',
    from: tomorrow,
    to: tomorrow.setHours(tomorrow.getHours() + 1),
    title: 'Dinner',
  },
  {
    id: 3,
    color: '#fda256',
    from: tomorrow2,
    to: tomorrow2.setHours(tomorrow.getHours() + 1),
    title: 'Lunch',
  },
  {
    id: 2,
    color: '#fda256',
    from: yes,
    to: yes.setHours(yes.getHours() + 1),
    title: 'key',
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
          currentWeek={5}
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
