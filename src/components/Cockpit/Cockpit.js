import React, { useEffect } from 'react'

import classes from './Cockpit.module.css'

const Cockpit = (props) => {
  useEffect(() => {
    console.log('[Cockpit.js] useEffect')
  })

  const assignedClasses = []
  let btnClass = ''

  if (props.showPerson) {
    btnClass = classes.Red
  }

  if (props.persons.length <= 2) {
    assignedClasses.push(classes.red)
  }

  if (props.persons.length <= 1) {
    assignedClasses.push(classes.bold)
  }

  return <div className={ classes.Cockpit } >
    <h1>Hi, I'm a React App</h1>
    <p className={ assignedClasses.join(' ') }>This is really working!</p>
    <button className={ btnClass } onClick={ props.clicked }>Toggle Persons</button>
  </div>
}

export default Cockpit
