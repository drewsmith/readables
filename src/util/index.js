export const toDateString = (timestamp) => (
  timestamp
    ? new Date(timestamp).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }) : ''
)

export const sortByVoteScore = (first, second) => second.voteScore - first.voteScore

export const sortByTimestamp = (first, second) => second.timestamp - first.timestamp
