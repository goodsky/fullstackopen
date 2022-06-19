import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

const Toggleable = forwardRef((props, ref) => {
  const { buttonLabel, children } = props
  const [isVisible, setIsVisible] = useState(false)

  const showWhenVisible = { display: isVisible ? '' : 'none' }
  const hideWhenVisible = { display: isVisible ? 'none' : '' }

  const topBotMargin = {
    marginTop: 16,
    marginBottom: 8,
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
        <button onClick={() => setIsVisible(true)}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={() => setIsVisible(false)}>Cancel</button>
      </div>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Toggleable
