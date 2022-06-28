import { Box, Heading, VStack } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";

import ArmorInfo from "./ArmorInfo";
import WeaponInfo from "./WeaponInfo";

type AdvancedInfoProps = {
  gear: string[];
};

function IsArmor(name: string): boolean {
  if (
    name.includes(" Arms") ||
    name.includes(" Legs") ||
    name.includes(" Core") ||
    name.includes(" Helmet") ||
    name.includes(" Armor") ||
    name.includes(" Backpack") ||
    name.includes(" Worksuit") ||
    name === "Beacon" ||
    name.includes(" Undersuit")
  ) {
    return true;
  }
  return false;
}

function IsWeapon(name: string): boolean {
  if (
    name.includes(" Rifle") ||
    name.includes(" SMG") ||
    name.includes(" LMG") ||
    name.includes(" Launcher") ||
    name.includes(" Pistol") ||
    name.includes(" Shotgun") ||
    name.includes(" Railgun")
  ) {
    return true;
  }
  return false;
}

const tabSelectedStyle = {
  borderTopRightRadius: "5px",
  backgroundColor: "#495867",
  boxShadow: "none"
};

export default function AdvancedInfo(props: AdvancedInfoProps) {
  return (
    <Box
      id="advanced-info"
      color="whitesmoke"
      width="32vw"
      maxWidth="320pt"
      minWidth="260pt"
      backgroundColor="#1A2130"
      borderRadius="8px"
      paddingTop="15px"
      paddingBottom="11px"
      boxShadow="4px 4px 8px rgba(0, 0, 0, 0.25), -2px -2px 6px #293342"
    >
      <Heading size="lg" marginBottom="10pt">
        Loadout information
      </Heading>
      <VStack>
        {props.gear.length === 0 ? (
          <Heading size="sm" fontStyle="normal">
            Information about selected gear will appear here
          </Heading>
        ) : (
          <Tabs
            isFitted
            isLazy
            width="30vw"
            maxWidth="300pt"
            minWidth="250pt"
            variant="enclosed"
            backgroundColor="#495867"
            borderRadius="5px"
          >
            <TabList 
              fontFamily="Exo" 
              fontWeight="bold"
              backgroundColor="transparent"
              border="none"
            >
              <Tab
                _selected={tabSelectedStyle}
                _active={tabSelectedStyle}
                boxShadow="inset -4px -8px 6px rgba(0, 0, 0, 0.25)"
              >
                Armor
              </Tab>
              <Tab 
                _selected={tabSelectedStyle}
                _active={tabSelectedStyle}
                boxShadow="inset 4px -8px 6px rgba(0, 0, 0, 0.25)"
              >
                Weapons
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {props.gear.length === 0 ? (
                  "No gear selected"
                ) : (
                  <ArmorInfo armors={props.gear.filter((a) => IsArmor(a))} />
                )}
              </TabPanel>
              <TabPanel>
                {props.gear.length === 0 ? (
                  "No gear selected"
                ) : (
                  <WeaponInfo weapons={props.gear.filter((a) => IsWeapon(a))} />
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </VStack>
    </Box>
  );
}
