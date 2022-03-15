import { forwardRef, useImperativeHandle, useState } from 'react';

const Toggleable = forwardRef((props, ref) => {
  const {buttonLabel, children} = props;
  const [isVisible, setIsVisible] = useState(false);

  const showWhenVisible = { display: isVisible ? '' : 'none' };
  const hideWhenVisible = { display: isVisible ? 'none' : '' };

  // This imperitive handle allows parent components to toggle visibility via a ref.
  // This is not the only way to do this and probably not the best.
  useImperativeHandle(ref, () => {
    return { 
        toggleVisible: () => setIsVisible(!isVisible),
    };
  });

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setIsVisible(true)}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={() => setIsVisible(false)}>Cancel</button>
      </div>
    </>
  );
});

export default Toggleable;