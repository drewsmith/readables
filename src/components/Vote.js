import React, { Component } from 'react'

import ArrowUp from 'material-ui-icons/ArrowDropUp'
import ArrowDown from 'material-ui-icons/ArrowDropDown'

import { connect } from 'react-redux'
import { vote } from '../actions/posts'

const arrowColor = '#455A64'

const pointer = { cursor: 'pointer' }

class Vote extends Component {
  state = {
    total: this.props.total
  }
  handleVote(direction) {
    this.props.vote(this.props.postId, direction)
    this.setState((state) => ({
      total: direction === 'up' ? state.total += 1 : state.total -= 1
    }))
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

const mapDispatchToProps = (dispatch) => ({
  vote: (postId, direction) => dispatch(vote(postId, direction))
})

export default connect(
  (state) => ({}),
  mapDispatchToProps
)(Vote)
