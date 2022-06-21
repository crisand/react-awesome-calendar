import React from 'react';
import Calendar from 'react-awesome-calendar';
import styles from './themes/app.scss';

const events = [
  {
    id: 4,
    color: '#fda256',
    from: '2022-06-21T12:16:15+0000',
    to: '2022-06-21T12:17:15+0000',
    title: 'Dinner',
  },
  {
    id: 4,
    color: '#fda256',
    from: '2022-06-21T12:17:15+0000',
    to: '2022-06-21T12:18:15+0000',
    title: 'Dinner',
  },
  {
    id: 4,
    color: '#fda256',
    from: '2022-06-21T12:18:15+0000',
    to: '2022-06-21T12:19:15+0000',
    title: 'Dinner',
  },
  {
    id: 4,
    color: '#fda256',
    from: '2022-06-21T12:19:15+0000',
    to: '2022-06-21T12:20:15+0000',
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
          onChange={(dates) => console.log(dates)}
          onClickTimeLine={(date) => console.log(date)}
          events={events}
        />
      </div>
    );
  }
}

export default App;
