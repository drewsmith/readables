import React from 'react'

import ArrowUp from 'material-ui-icons/ArrowDropUp'
import ArrowDown from 'material-ui-icons/ArrowDropDown'

const arrowColor = "#455A64"

const Vote = ({total}) => (
  <section className="vote">
    <ArrowUp color={arrowColor} />
    {total}
    <ArrowDown color={arrowColor} />
  </section>
)

export default Vote
