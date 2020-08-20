import { useState, useEffect, useRef } from 'react';

const useSetState = (initialState, props) => {
  const [state, setState] = useState(initialState);

  const callbackRef = useRef();

  const setPartialState = (newState, callback) => {
    if (callback) callbackRef.current = callback;

    if (typeof newState === 'object') {
      setState((prevState) => {
        return {
          ...prevState,
          ...newState,
        };
      });
    }

    if (typeof newState === 'function') {
      setState((prevState) => {
        return {
          ...prevState,
          ...newState(state, props),
        };
      });
    }

    if (!typeof newState === 'object' && !typeof newState === 'function') throw new Error('Bad type!');
  };

  useEffect(() => {
    if (typeof callbackRef.current === 'function') {
      callbackRef.current();
    }
  }, [state]);

  return [state, setPartialState];
};

export default useSetState;
