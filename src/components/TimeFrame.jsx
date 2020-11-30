import React, { Component } from "react";
import "../style/TimeFrame.css";

class TimeFrame extends Component {
  constructor(props) {
    super(props)
    this.currentTime = this.props.time;
    this.copy = this.props.copy[0];
    this.copyPlural = this.props.copy[1];
    this.prevTime = null;
    this.updateTime = false;
  }

  componentDidMount() {
    this.currentTime = this.props.time;
    this.prevTime = this.props.time + 1;
  }

  componentDidUpdate() {
    if (this.currentTime !== this.props.time) {
      this.updateTime = this.props.time === 0 ? false : true;
      this.prevTime = this.currentTime;
      this.currentTime = this.props.time;
    } else {
      this.updateTime = false;
    }
  }

  render() {
    const copy = this.currentTime > 1 && this.copyPlural ? this.copyPlural : this.copy;

    return (
      <div className="TimeFrame">
        <div className="time-wrapper">
          <div key={this.currentTime} className={`time ${this.updateTime ? "up" : ""}`}>
            {this.currentTime}
          </div>
          {this.prevTime !== null && (
            <div key={this.prevTime} className={`time ${!this.updateTime ? "down" : ""}`}>
              {this.prevTime}
            </div>
          )}
        </div>
        <p className="time-copy">{copy}</p>
      </div>
    );
  }
}

TimeFrame.defaultProps = {
  time: 0
}

export default TimeFrame;
