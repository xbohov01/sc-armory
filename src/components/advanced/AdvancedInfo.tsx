import { Box, Heading, VStack } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import React from "react";
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
  backgroundColor: "#1a2130",
  border: "solid 1pt whitesmoke",
};

export default function AdvancedInfo(props: AdvancedInfoProps) {
  return (
    <Box
      id="advanced-info"
      color="whitesmoke"
      width="30vw"
      maxWidth="300pt"
      minWidth="200pt"
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
            minWidth="200pt"
            variant="enclosed"
          >
            <TabList fontFamily="Exo" fontWeight="bold">
              <Tab _selected={tabSelectedStyle}>Armor</Tab>
              <Tab _selected={tabSelectedStyle}>Weapons</Tab>
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
