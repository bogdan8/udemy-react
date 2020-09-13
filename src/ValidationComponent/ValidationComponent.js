import React from 'react'

const validationComponent = (props) => {
  let isTextValid = 'Text too short'

  if (props.charactersValue.length > 5) {
    isTextValid = 'Text long enough'
  }

  return <div>
    <p>{props.charactersValue.length}</p>
    <p>{isTextValid}</p>
  </div>
}

export default validationComponent
