import React, { Component } from 'react';
import TimeFrame from './TimeFrame.jsx'
import "../style/Countdown.css";

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.timeLeft = null;
    this.style = {};
    this.state = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    };
  }

  componentDidMount() {
    this.timeLeft = this.calculateCountdown(this.props.date);

    if (this.timeLeft > 0) {
      this.interval = setInterval(() => {
        this.timeLeft = this.calculateCountdown(this.props.date);
      }, 100);
    }
  }

  componentDidUpdate() {
    if (this.timeLeft === 0) {
      this.stop();
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  stop() {
    clearInterval(this.interval);
  }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;
    let timeLeft = diff;
    let newState = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    };

    this.updateStyle(timeLeft);

    if (!diff) {
      this.setState(newState);
      return 0;
    }

    // calculate time difference between now and expected date
    if (diff >= 365.25 * 86400) {
      newState.years = Math.floor(diff / (365.25 * 86400));
      diff -= newState.years * 365.25 * 86400;
    }

    if (diff >= 86400) {
      newState.days = Math.floor(diff / 86400);
      diff -= newState.days * 86400;
    }

    if (diff >= 3600) {
      newState.hours = Math.floor(diff / 3600);
      diff -= newState.hours * 3600;
    }

    if (diff >= 60) {
      newState.min = Math.floor(diff / 60);
      diff -= newState.min * 60;
    }

    newState.sec = diff
    this.setState(newState);
    return timeLeft;
  }

  updateStyle(timeLeft) {
    let pulseTimer = Math.ceil((timeLeft / 86400) * 10);
    pulseTimer = timeLeft < 585 ? 0.25 : timeLeft < 900 ? 0.5 : pulseTimer;
    this.style = timeLeft <= 0 ? {} : { animation: `pulse ${pulseTimer}s infinite` };
  }

  render() {
    const timeFrames = this.props.timeFrames.map((frame) => {
      const time = this.state[frame.type];

      if (frame.type !== 'years' || time > 0) {
        return <TimeFrame key={frame.type} time={time} copy={frame.copy} />;
      }
    });

    return (
      <div className="Countdown" style={this.style}>
        <div className="countdown-container">
          {timeFrames}
        </div>
        <h1 className="countdown-title">{this.props.title}</h1>
      </div>
    );
  }
}

Countdown.defaultProps = {
  date: "2020-12-24T00:00:00",
  timeFrames: [
    {
      'type': 'years',
      'copy': ['Year', 'Years']
    },
    {
      'type': 'days',
      'copy': ['Day', 'Days']
    },
    {
      'type': 'hours',
      'copy': ['Hour', 'Hours']
    },
    {
      'type': 'min',
      'copy': ['Min']
    },
    {
      'type': 'sec',
      'copy': ['Sec']
    }
  ]
};

export default Countdown;
