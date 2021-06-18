import { Divider } from '@chakra-ui/layout';
import React, { useState } from 'react';
import './App.css';
import { AppNotice } from './components/AppNotice';
import { LoadoutBuilder } from './components/LoadoutBuilder';
import { ShoppingList } from './components/ShoppingList';

function App() {
  const [gear, setGear] = useState<string[]>([])

  return (
    <div className="App">
      <header className="App-header">
        <AppNotice />
        <LoadoutBuilder updater={setGear}/>
        <Divider orientation='horizontal' width='40vw'/>
        <ShoppingList gear={gear}/>
      </header>
    </div>
  );
}

export default App;
