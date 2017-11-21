import React, { Component } from 'react'

import ArrowUp from 'material-ui-icons/ArrowDropUp'
import ArrowDown from 'material-ui-icons/ArrowDropDown'

const arrowColor = '#455A64'

const pointer = { cursor: 'pointer' }

class Vote extends Component {
  state = {
    total: this.props.total
  }

  handleVote(direction) {
    let { onVote, voteId } = this.props
    onVote(voteId, direction).then(() => {
      this.setState((state) => ({
        total: direction === 'up' ? state.total += 1 : state.total -= 1
      }))
    })

  }

  render() {
    return (
      <section className="vote">
        <ArrowUp style={pointer} color={arrowColor} onClick={() => this.handleVote('up')} />
        {this.state.total}
        <ArrowDown style={pointer} color={arrowColor} onClick={() => this.handleVote('down')} />
      </section>
    )
  }
}

export default Vote
