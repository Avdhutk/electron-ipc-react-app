import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(1);
  const [isPrime, setIsPrime] = useState(true);
  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.onFromChild((data) => {
        console.log("Received from child:", data);
        setIsPrime(data.isPrime)
      });
      window.electronAPI.onReset(() => {
        setCount(0)
      })
    } else {
      console.error("electronAPI not found in window");
    }
    return () => {
      window.electronAPI.onFromChild(() => {});
      window.electronAPI.onReset(() => {})
    }
  }, []);

  const handleClick = () => {
    const newCount = count + 1;
    setCount(newCount);
    window.electronAPI?.sendToMain(newCount);
  }
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>
          count is {count}
        </button>
        <h3>{count} is {isPrime ? 'a prime' : 'not a prime'} number</h3>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
