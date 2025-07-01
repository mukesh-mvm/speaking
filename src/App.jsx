import { useState } from 'react'

import './App.css'
import { TextTable } from './componets/TextTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <h1>welcome to the speaking</h1>
       <TextTable/>
    </>
  )
}

export default App
