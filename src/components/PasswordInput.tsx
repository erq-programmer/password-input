import React, { useState, useEffect, useCallback, useRef, FC } from 'react';
import './PasswordInput.css';

type PasswordInputProps = {
  password: string;
  onSuccess: () => void;
};

const PasswordInput: FC<PasswordInputProps> = ({ password, onSuccess }) => {
  const [blockedInputs, setBlockedInputs] = useState([] as Array<number>);
  // const inputsRef = useRef<HTMLInputElement>(null);
  const inputsRef = useRef([] as any);
  const allInputs: Array<string> = Array(32).fill(undefined);

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const drawingRandomInputs: () => Array<number> = useCallback(() => {
    const passwordLength: number = password.length;
    const randomInputs: Array<number> = [];
    const minRandomInputs: number = 1;
    const maxBlockedInputs: number = getRandomNumber(4, passwordLength / 2); // because we want to get max numbers of index
    while (randomInputs.length < maxBlockedInputs) {
      const randomIndex = getRandomNumber(minRandomInputs, passwordLength); // because we want to get numbers from 1 - 13(if word 'HelloWorld666'.length = 13)
      if (!randomInputs.includes(randomIndex)) {
        randomInputs.push(randomIndex);
      }
    }
    return randomInputs.sort((a, b) => a - b);
  }, [password.length]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const isCharCorrect = (item: HTMLInputElement, index: number) => {
        if (!item.disabled) {
          return item.value === password[index];
        }
        return true;
      };

      inputsRef.current.every(isCharCorrect)
        ? onSuccess()
        : console.error('Password is wrong!');
    },
    [password, onSuccess]
  );

  useEffect(() => {
    const drawingData: Array<number> = drawingRandomInputs();
    setBlockedInputs(drawingData);
  }, [drawingRandomInputs]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="input-block">
        <ul className="createInputs">
          {Array.from(allInputs).map((_, index) => {
            const isDataBlocked =
              blockedInputs.includes(index) || index >= password.length
                ? true
                : false;
            return (
              <li key={index} className="input-with-index">
                <input
                  disabled={isDataBlocked}
                  value={allInputs[index]}
                  ref={(ref) => (inputsRef.current[index] = ref)}
                  type="text"
                  minLength={1}
                  maxLength={1}
                  required
                ></input>
                <span className="index-number">{index}</span>
              </li>
            );
          })}
        </ul>
        <input className="input-submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default PasswordInput;
