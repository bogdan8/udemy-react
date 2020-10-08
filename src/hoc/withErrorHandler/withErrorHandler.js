import React, { useState, useEffect } from 'react'

import Modal from '../../components/UI/Modal/Modal'
import useHttpErrorHandler from '../../hooks/http-error-handler'

const withErrorHandler = (WrapperComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios)

    return <>
      <Modal show={ error } modalClosed={ clearError }> { error && error.message } </Modal>
      <WrapperComponent { ...props } />
    </>
  }
}

export default withErrorHandler
