import React, { useState, useEffect, useCallback } from 'react';
import './PasswordInput.css';

type PasswordInputProps = {
  password: string;
  onSuccess: () => void;
};

const PasswordInput = ({ password, onSuccess }: PasswordInputProps) => {
  const [blockedInputs, setBlockedInputs] = useState([] as Array<number>);
  const [passwordObject, setPasswordObject] = useState([] as Array<object>);
  const [passwordFromInput, setPasswordFromInput] = useState([] as Array<object>);
  const allInputs: Array<string> = Array(32).fill(undefined);

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const drawingRandomInputs: () => Array<number> = useCallback(() => {
    const passwordLength: number = password.length;
    const randomInputs: Array<number> = [];
    const minRandomInputs: number = 1;
    const maxRandomInputs: number = passwordLength;
    const maxBlockedInputs: number = getRandomNumber(4, passwordLength / 2); // because we want to get max numbers of index
    while (randomInputs.length < maxBlockedInputs) {
      const randomIndex = getRandomNumber(minRandomInputs, maxRandomInputs); // because we want to get numbers from 1 - 13(if word 'HelloWorld666'.length = 13)
      if (!randomInputs.includes(randomIndex)) {
        randomInputs.push(randomIndex);
      }
    }
    return randomInputs.sort((a, b) => a - b);
  }, [password.length]);

  const changePasswordToObjectModel: any = useCallback((passwordFromProps: any) => {
    const passwordArray = passwordFromProps.split('');
    const passwordInObject: any = [];
    passwordArray.forEach((element: string, index: number) => {
      passwordInObject[index] = { char: element, index: index + 1 }; // We have to index+1 to match with allInputs array
    });
    // console.log(passwordInObject);
    setPasswordObject(passwordInObject);
  }, []);

  const temporaryObject: any = [];

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    temporaryObject.push({ char: e.target.value, index: index });
  };

  const handleSubmit = () => {
    setPasswordFromInput(temporaryObject);
    console.log(passwordObject);
    onSuccess();
  };

  const createInputs = () => {
    return allInputs.map((input, index) => {
      const isDataBlocked = blockedInputs.includes(index + 1) || index >= password.length ? true : false;
      return (
        <div className="input-with-index">
          <input
            data-blocked={isDataBlocked}
            disabled={isDataBlocked}
            key={index}
            data-index={index + 1}
            onChange={(e) => handleChange(index + 1, e)}
            value={allInputs[index + 1]}
            type="text"
          >
            {input}
          </input>
          <span className="index-number" data-blocked={isDataBlocked}>
            {index + 1}
          </span>
        </div>
      );
    });
  };

  useEffect(() => {
    const drawingData: any = drawingRandomInputs();
    setBlockedInputs(drawingData);
    changePasswordToObjectModel(password);
    // setBlockedInputsIntoArrayWithObjects(drawingData);
  }, [drawingRandomInputs, changePasswordToObjectModel, password]);

  return (
    <div>
      <h2>Blocked inputs index</h2>
      {console.log('State: ', passwordFromInput)}
      <ul>{blockedInputs && blockedInputs.map((input, index) => <li key={index}>{input}</li>)}</ul>
      <div className="input-block">{createInputs()}</div>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default PasswordInput;
