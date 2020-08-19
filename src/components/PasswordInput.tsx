import React, { useState, useEffect, useCallback } from 'react';
import './PasswordInput.css'

type PasswordInputProps = {
  password: string;
  onSuccess: () => void;
};

const PasswordInput = ({ password, onSuccess }: PasswordInputProps) => {
  const [blockedInputs, setBlockedInputs] = useState([] as Array<number>);
  const [allInputs, setallInputs] = useState(Array(32).fill(undefined) as Array<string>);
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
      passwordObject[index+1] = {'char': element, 'index': index+1}; // We have to index+1 to match with allInputs array
    });
    console.log(passwordObject);
  }

  const setBlockedInputsIntoArrayWithObjects: any = useCallback((blockedInputs: any) => {
    blockedInputs.forEach((elementIndex: number) => {
      console.log({'char': null, 'index': elementIndex})
    });
  }, [])


  const changePasswordToObjectModel: any = useCallback((password: any) => {
    const passwordArray = password.split('');
    convertToArrayWithObject(passwordArray);
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

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    allInputs[index] = e.target.value;
    console.log(allInputs);
  }

  const handleSubmit = () => {
    onSuccess();
  }

  const createInputs = () => {
    return allInputs.map((input, index) =>{
      const isDataBlocked = blockedInputs.includes(index + 1) || index >= password.length ? true : false;
      return (
        <div className="input-with-index">
        <input
          data-blocked={isDataBlocked} 
          disabled={isDataBlocked} 
          key={index} 
          data-index={index+1}
          onChange={(e) => handleChange(index+1, e)}
          value={allInputs[index+1]}>
            {input}
            
        </input>
        <span className="index-number" data-blocked={isDataBlocked}> {index+1}</span>
      </div>
    )})
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
      <div className="input-block">{createInputs()}</div>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PasswordInput;