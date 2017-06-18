import React from 'react'

export default ({ name, label, type, value, onChange, large }) => (
  <div className='pt-form-group'>
    <label
      className='pt-label'
      htmlFor={name}>
      {label}
    </label>

    <div className='pt-form-content'>
      <input
        className={`pt-input ${large ? 'pt-large' : ''}`}
        id={name}
        type={type || 'text'}
        value={value}
        onChange={onChange} />
    </div>
  </div>
)
