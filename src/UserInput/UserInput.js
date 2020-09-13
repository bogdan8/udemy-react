import React from 'react'


const userInput = (props) => {
  const style = {
    div: {
      display: 'flex',
      justifyContent: 'center'
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '15px',
      marginRight: '5px',
      color: 'brown'
    },
    input: {
      padding: '8px',
      display: 'block',
      border: 'none',
      borderBottom: '1px solid #ccc',
      textAlign: 'center'
    }
  }

  return <div style={style.div}>
    <label style={style.label}>Name input:</label>
    <input style={style.input} type='text' onChange={props.change} value={props.name} />
  </div>
}

export default userInput
