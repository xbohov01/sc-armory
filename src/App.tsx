import { useEffect, useState } from "react";

import { Divider, HStack, VStack } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/react";

import AdvancedInfo from "./components/advanced/AdvancedInfo";
import ImageDisplay from "./components/images/ImageDisplay";
import LoadoutBuilder from "./components/loadout/LoadoutBuilder";
import LoadoutExporter from "./components/loadout/LoadoutExporter";
import Footer from "./components/page/Footer";
import Header from "./components/page/Header";
import ShoppingWrapper from "./components/shoppingList/ShoppingWrapper";
import { KeyValue, ListKey, LocatedItem } from "./types/types";

import "./App.css";

function App(): JSX.Element {
  const [gear, setGear] = useState<string[]>([]);
  const [list, setList] = useState<KeyValue<ListKey, LocatedItem[]>[]>([]);
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
        <HStack>
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
        <HStack width="auto" margin="auto" alignItems="start" spacing="60pt">
          {showInfo ? <AdvancedInfo gear={gear} /> : ""}
          <VStack id="loadout-section" width="400pt">
            <LoadoutBuilder updater={setGear} listRefresher={setShowList} />
            <Divider
              orientation="horizontal"
              width="40vw"
              maxWidth="300pt"
              minWidth="200pt"
              margin="auto"
            />
            {gear.length > 0 && showList ? (
              <ShoppingWrapper gear={gear} listUpstream={setList} />
            ) : (
              ""
            )}
            <LoadoutExporter gear={list} />
          </VStack>
          {showImages ? <ImageDisplay gear={gear} /> : ""}
        </HStack>
      </div>
      <footer className="App-footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
