import { Divider } from '@chakra-ui/layout';
import React, { useState } from 'react';
import './App.css';
import { AppNotice } from './components/AppNotice';
import { Footer } from './components/page/Footer';
import { LoadoutBuilder } from './components/loadout/LoadoutBuilder';
import { ShoppingList } from './components/ShoppingList';
import { Header } from './components/page/Header';
import { LoadoutExporter } from './client/LoadoutExporter';
import { KeyValue, ListKey, LocatedItem } from './types/types';

function App() {
  const [gear, setGear] = useState<string[]>([])
  const [list, setList] = useState<KeyValue<ListKey, LocatedItem[]>[]>([])

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <AppNotice />
      </header>
      <div className="App-body">
        <LoadoutBuilder updater={setGear} />
        <Divider orientation='horizontal' width='40vw' margin='auto' />
        {gear.length > 0 ? <ShoppingList gear={gear} listUpstream={setList} /> : ''}
        <LoadoutExporter gear={list} />
      </div>
      <footer className="App-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
