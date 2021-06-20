import { Divider } from '@chakra-ui/layout';
import React, { useState } from 'react';
import './App.css';
import { AppNotice } from './components/AppNotice';
import { Footer } from './components/page/Footer';
import { LoadoutBuilder } from './components/LoadoutBuilder';
import { ShoppingList } from './components/ShoppingList';
import { Header } from './components/page/Header';

function App() {
  const [gear, setGear] = useState<string[]>([])

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <AppNotice />
      </header>
      <body className="App-body">
        <LoadoutBuilder updater={setGear} />
        <Divider orientation='horizontal' width='40vw' />
        <ShoppingList gear={gear} />
      </body>
      <footer className="App-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
