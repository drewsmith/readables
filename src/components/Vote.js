import React from 'react'

import ArrowUp from 'material-ui-icons/ArrowDropUp'
import ArrowDown from 'material-ui-icons/ArrowDropDown'

const arrowColor = "#455A64"

const Vote = () => (
  <section className="vote">
    <ArrowUp color={arrowColor} />
    0
    <ArrowDown color={arrowColor} />
  </section>
)

export default Vote
