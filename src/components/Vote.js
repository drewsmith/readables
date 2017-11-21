import React, { Component } from 'react'

import ArrowUp from 'material-ui-icons/ArrowDropUp'
import ArrowDown from 'material-ui-icons/ArrowDropDown'

import { connect } from 'react-redux'
import { votePost, voteComment } from '../actions/posts'

const arrowColor = '#455A64'

const pointer = { cursor: 'pointer' }

class Vote extends Component {
  state = {
    total: this.props.total
  }

  handleVote(direction) {
    let { isPost, votePost, voteComment } = this.props
    let vote = isPost ? votePost : voteComment
    let id = isPost ? this.props.postId : this.props.commentId

    vote(id, direction).then(() => {
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

const mapDispatchToProps = (dispatch) => ({
  votePost: (postId, direction) => dispatch(votePost(postId, direction)),
  voteComment: (commentId, direction) => dispatch(voteComment(commentId, direction))
})

export default connect(
  (state) => ({}),
  mapDispatchToProps
)(Vote)
