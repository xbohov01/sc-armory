import { useEffect, useState } from "react";

import { Divider, HStack, VStack } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/react";

import AdvancedInfo from "./components/advanced/AdvancedInfo";
import ImageDisplay from "./components/images/ImageDisplay";
import LoadoutBuilder from "./components/loadout/LoadoutBuilder";
import LoadoutExporter from "./components/loadout/LoadoutExporter";
import Footer from "./components/page/Footer";
import Header from "./components/page/Header";
import ShopsLoot from "./components/page/ShopsLoot";

import "./App.css";

import type { ListKey, LocatedItem } from "~type/search";
import type { KeyValue } from "~type/select";

function App(): JSX.Element {
  const [gear, setGear] = useState<string[]>([]);
  
  const [showInfo, setShowInfo] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showImages, setShowImages] = useState(false);

  const showInfoToggle = () => {
    localStorage.setItem("advancedInfo", showInfo ? "false" : "true");
    setShowInfo(!showInfo);
  };

  const showImagesToggle = () => {
    localStorage.setItem("armoryImages", showImages ? "false" : "true");
    setShowImages(!showImages);
  };

  const wasAdvancedShown = () => {
    const value = localStorage.getItem("advancedInfo");
    if (value === undefined || value === "false") {
      return false;
    }
    return true;
  };

  const wasImageShown = () => {
    const value = localStorage.getItem("armoryImages");
    if (value === undefined || value === "false") {
      return false;
    }
    return true;
  };

  useEffect(() => {
    setShowInfo(wasAdvancedShown());
    setShowImages(wasImageShown());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div className="App-body">
        <HStack marginBottom={3}>
          <Switch
            padding="5pt"
            fontFamily="Exo"
            color="whitesmoke"
            isChecked={showInfo}
            onChange={showInfoToggle}
          >
            Show advanced information
          </Switch>
          <Switch
            padding="5pt"
            fontFamily="Exo"
            color="whitesmoke"
            isChecked={showImages}
            onChange={showImagesToggle}
          >
            Show images
          </Switch>
        </HStack>
        <LoadoutBuilder showInfo={showInfo} showImages={showImages} showList={showList} />
      </div>
      <footer className="App-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
