import React from 'react'

import './UserOutput.css'

const userOutput = (props) => {
  return <div className='UserOutput'>
    <p>Magna pars studiorum, prodita quaerimus. Donec sed odio operae, eu vulputate felis rhoncus.</p>
    <p>Etiam habebis sem dicantur magna mollis euismod. Petierunt uti sibi concilium totius Galliae in diem certam indicere. Quam temere in vitiis, legem sancimus haerentia.</p>
    <p>I'm a {props.name}</p>
  </div>
}

export default userOutput
