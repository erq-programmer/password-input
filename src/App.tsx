import React from 'react';
import './App.css';
import PasswordInput from './components/PasswordInput';

function App() {
  return (
    <main className="App">
      <h1>Password Input App</h1>
      <PasswordInput password={'HelloWorld'} onSuccess={() => console.log('Correct password, success!')} />
    </main>
  );
}

export default App;
