import React, { Component } from 'react'

class Timer extends Component {

  constructor(props) {
    super(props)

    this.tick = this.tick.bind(this)

    this.state = {
      startTime: Date.now(),
      time: 0,
    }

  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 50)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.props.keepTime(this.state.time)
  }

  tick() {
    let time = new Date() - this.state.startTime
    time = Math.round(time / 100)
    time = (time / 10).toFixed(1)

    this.setState({ time })
  }

  render() {
    return (
      <span>
        {this.state.time}
      </span>
    )
  }
}

export default Timer
