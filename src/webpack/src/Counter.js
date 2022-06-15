import React from 'react'

class Counter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      clicks: 0
    }
  }

  handleClick = () => {
    const { clicks } = this.state
    this.setState({ clicks: clicks + 1 })
  }

  render() {
    const { clicks } = this.state
    return (
      <div>
        <div>
        {clicks} clicks
        <button onClick={this.handleClick}>press</button>
      </div>
      </div>
    )
  }
}

export default Counter