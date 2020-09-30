import React, { Component } from 'react'

class Course extends Component {
  render () {
    return (
      <div>
        <h1>{ new URLSearchParams(this.props.location.search).get('title') }</h1>
        <p>You selected the Course with ID: { this.props.match.params.id }</p>
      </div>
    )
  }
}

export default Course
