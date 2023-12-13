import { useState } from 'react'

import SignUp from './componets/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <SignUp/>
    </>
  )
}

export default App
