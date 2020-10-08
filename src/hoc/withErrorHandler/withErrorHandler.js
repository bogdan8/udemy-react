import React, { useState, useEffect } from 'react'

import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrapperComponent, axios) => {
  return props => {
    const [error, setError] = useState(null)

    const reqInterceptors = axios.interceptors.request.use(req => {
      setError(null)
      return req
    })

    const resInterceptors = axios.interceptors.response.use(res => res, err => {
      setError(err)
    })

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptors)
        axios.interceptors.response.eject(resInterceptors)
      }
    }, [resInterceptors, reqInterceptors])

    const errorConfirmedHandler = () => {
      setError(null)
    }

    return <>
      <Modal show={ error } modalClosed={ errorConfirmedHandler }> { error && error.message } </Modal>
      <WrapperComponent { ...props } />
    </>
  }
}

export default withErrorHandler
