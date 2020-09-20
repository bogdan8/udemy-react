import React from 'react'

const errorFallback = (props) => {
  return <div role='alert'>
    <p>Something went wrong:</p>
    <pre style={ { color: 'red' } }>{ props.error.message }</pre>
  </div>
}

export default errorFallback
