export const toDateString = (timestamp) => (
  timestamp 
    ? new Date(timestamp).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }) : ''
)
