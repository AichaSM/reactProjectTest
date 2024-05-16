import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserProfileCard from './component/UserProfileCard';

function App() {
  const name = "Aicha Sellami";
  const title = "Développeuse";
  const [count, setCount] = useState(0)

  return (
    <>
    <p> Le compteur est à : {count}</p>
    <button onClick={() => setCount(count+1)}>
      Incrémenter
    </button>
    <button onClick={() => setCount(count-1)}>
      Décrémenter
    </button>
    <button onClick={() => setCount(0)}>
      Reset
    </button>
    <UserProfileCard jobName={name} jobTitle={title}/>
    </>
  )
}

export default App
