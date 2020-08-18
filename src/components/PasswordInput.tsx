import React, { useState, useEffect, useCallback } from 'react';

type PasswordInputProps = {
  password: string;
  onSuccess: () => void;
};

const PasswordInput = ({ password, onSuccess }: PasswordInputProps) => {
  const [blockedInputs, setBlockedInputs] = useState([] as Array<number>);
  const [allInputs, setallInputs] = useState(Array(32).fill(null) as Array<string>);
  const [passwordObject, setPasswordObject] = useState([] as Array<object>);

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const drawingRandomInputs: any = useCallback(() => {
    const passwordLength: number = password.length;
    const randomInputs: Array<number> = [];
    const minRandomInputs: number = 1;
    const maxRandomInputs: number = passwordLength;
    const maxBlockedInputs: number = getRandomNumber(2, passwordLength / 2); // because we want to get max numbers of index
    while (randomInputs.length < maxBlockedInputs) {
      const randomIndex = getRandomNumber(minRandomInputs, maxRandomInputs); // because we want to get numbers from 1 - 13(if word 'HelloWorld666'.length = 13)
      if (!randomInputs.includes(randomIndex)) {
        randomInputs.push(randomIndex);
      }
    }
    return randomInputs.sort((a, b) => a - b);
  }, [password.length]);

  const convertToArrayWithObject = (array: any) => {
    array.forEach((element: string, index: number) => {
      console.log({'char': element, 'index': index})
    });
  }

  const setBlockedInputsIntoArrayWithObjects: any = useCallback((blockedInputs: any) => {
    blockedInputs.forEach((elementIndex: number) => {
      // console.log({'char': null, 'index': elementIndex})
    });
  }, [])


  const changePasswordToObjectModel: any = useCallback((password: any) => {
    const passwordArray = password.split('');
    // convertToArrayWithObject(passwordArray);
  }, [])

  // [
  //   {
  //     index: 1,
  //     char: null
  //   },
  //   {
  //     index: 3,
  //     char: null
  //   }
  // ]

  const createInputs = () => {
    console.log(blockedInputs)
    return allInputs.map((input, index) => (
     <input data-blocked={blockedInputs.includes(index + 1) || index > 12 ? true : false} key={index} data-index={index+1} value={index+1}>{input}</input>
  ))
  }

  useEffect(() => {
    const drawingData: any = drawingRandomInputs();
    setBlockedInputs(drawingData);
    changePasswordToObjectModel(password);
    setBlockedInputsIntoArrayWithObjects(drawingData);
  }, [drawingRandomInputs, changePasswordToObjectModel, password, setBlockedInputsIntoArrayWithObjects]);

  return (
    <div>
      <h2>Blocked inputs index</h2>
      <ol>{blockedInputs && blockedInputs.map((input, index) => <li key={index}>{input}</li>)}</ol>
      <div>{createInputs()}</div>
    </div>
  );
};

export default PasswordInput;
