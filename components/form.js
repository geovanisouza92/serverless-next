import React from 'react'

export default ({ children, errorMessage, onSubmit, onValidate, isLoading, actionLabel }) => (
  <form onSubmit={onSubmit}>
    {children}

    <div style={{ display: errorMessage ? 'block' : 'none', color: 'red' }}>{errorMessage}</div>

    {isLoading
      ? (
        <button
          className='pt-button pt-icon-standard pt-icon-refresh'
          type='button'
          disabled='true'>
          Loading...
        </button>
      )
      : (
        <button
          className='pt-button pt-intent-primary'
          type='submit'
          disabled={!onValidate()}>
          {actionLabel}
        </button>
      )
    }
  </form>
)
