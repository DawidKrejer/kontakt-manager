import React, { useState } from 'react';
import LoginForm from './Components/LoginForm';
import ListaKontaktow from './Components/ListaKontaktow';
function App() {
  const [currentOperation, setCurrentOperation] = useState(null);

  return (
    <div>
      <LoginForm/>
      <ListaKontaktow/>
    </div>
  );
}

export default App;