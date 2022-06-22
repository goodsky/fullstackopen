import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

import { Button } from '@mui/material'

const Toggleable = forwardRef((props, ref) => {
  const { buttonLabel, children } = props
  const [isVisible, setIsVisible] = useState(false)

  const showWhenVisible = { display: isVisible ? '' : 'none' }
  const hideWhenVisible = { display: isVisible ? 'none' : '' }

  const topBotMargin = {
    marginTop: 16,
    marginBottom: 16,
  }

  // This imperitive handle allows parent components to toggle visibility via a ref.
  // This is not the only way to do this and probably not the best.
  useImperativeHandle(ref, () => {
    return {
      toggleVisible: () => setIsVisible(!isVisible),
    }
  })

  return (
    <div style={topBotMargin}>
      <div style={hideWhenVisible}>
        <Button onClick={() => setIsVisible(true)}>{buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <Button onClick={() => setIsVisible(false)}>Cancel</Button>
      </div>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Toggleable
