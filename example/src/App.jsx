import React from 'react';
import Calendar from 'react-awesome-calendar';
import styles from './themes/app.scss';

const events = [

  {
    id: 1,
    color: '#fda256',
    from: '2022-06-23T09:00:00.000Z',
    to: "2022-06-23T10:00:00.000Z",
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
          ref={this.calendar}
          onClickEvent={(event) => console.log('this is an event', event)}
          onChange={(dates) => console.log("kuku", dates)}
          currentMonth={5}
          currentYear={2022}
          onClickTimeLine={(date) => console.log(date)}
          events={events}
        />
      </div>
    );
  }
}

export default App;
