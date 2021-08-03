import { Divider, HStack, VStack } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import './App.css';
import { AppNotice } from './components/AppNotice';
import { Footer } from './components/page/Footer';
import { LoadoutBuilder } from './components/loadout/LoadoutBuilder';
import { ShoppingList } from './components/ShoppingList';
import { Header } from './components/page/Header';
import { LoadoutExporter } from './client/LoadoutExporter';
import { KeyValue, ListKey, LocatedItem } from './types/types';
import { Switch } from '@chakra-ui/react';
import { AdvancedInfo } from './components/advanced/AdvancedInfo';

function App() {
  const [gear, setGear] = useState<string[]>([])
  const [list, setList] = useState<KeyValue<ListKey, LocatedItem[]>[]>([])
  const [showInfo, setShowInfo] = useState(false);
  const [showList, setShowList] = useState(false);

  const showInfoToggle = () => {
    localStorage.setItem('advancedInfo', showInfo ? 'false' : 'true')
    setShowInfo(!showInfo)
  }

  const wasAdvancedShown = () => {
    var value = localStorage.getItem('advancedInfo');
    if (value === undefined || value === 'false'){
      return false;
    }
    return true;
  }

  useEffect(() => {
    setShowInfo(wasAdvancedShown());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <AppNotice />
      </header>
      <div className="App-body">
        <Switch padding='5pt' fontFamily='Exo' color='whitesmoke' isChecked={showInfo} onChange={showInfoToggle}>Show advanced information</Switch>
        <HStack width='auto' margin='auto' alignItems='start' spacing='60pt' >
          {showInfo ? <AdvancedInfo gear={gear}/> : ''}
          <VStack id='loadout-section' width='400pt'>
            <LoadoutBuilder updater={setGear} listRefresher={setShowList}/>
            <Divider orientation='horizontal' width='40vw' maxWidth='300pt' minWidth='200pt' margin='auto' />
            {gear.length > 0 && showList ? <ShoppingList gear={gear} listUpstream={setList} /> : ''}
            <LoadoutExporter gear={list} />
          </VStack>
        </HStack>
      </div>
      <footer className="App-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
