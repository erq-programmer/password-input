import React from 'react';
import './App.css';
import PasswordInput from './components/PasswordInput';

function App() {
  return (
    <div className="App">
      <h1>Password Input App</h1>
      <PasswordInput password={'HelloWorld666'} onSuccess={() => console.log('Correct password, success!')} />
    </div>
  );
}

export default App;
