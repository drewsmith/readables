import React from 'react'

import PropTypes from 'prop-types'

import ArrowUp from 'material-ui-icons/ArrowDropUp'
import ArrowDown from 'material-ui-icons/ArrowDropDown'

const arrowColor = '#455A64'

const pointer = { cursor: 'pointer' }

const Vote = ({total, voteId, onVote}) => (
  <section className="vote">
    <ArrowUp style={pointer} color={arrowColor} onClick={() => onVote(voteId, 'up')} />
    {total}
    <ArrowDown style={pointer} color={arrowColor} onClick={() => onVote(voteId, 'down')} />
  </section>
)

Vote.propTypes = {
  total: PropTypes.number,
  onVote: PropTypes.func.isRequired,
  voteId: PropTypes.string.isRequired
}

Vote.defaultProps = {
  total: 0
}

export default Vote
