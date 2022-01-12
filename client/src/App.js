
import { useState } from 'react';
import './App.css';
import Form from './Form';
import List from './List';

import {TodoContext} from './TodoContext'

function App() {

  const [secilenId,setSecilenId]=useState(0);


  return (
    <TodoContext.Provider value={{secilenId,setSecilenId}}>
      <Form />
      <List />
    </TodoContext.Provider>
  );
}

export default App;
