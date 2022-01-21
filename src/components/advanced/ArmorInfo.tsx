import {
  Box,
  Grid,
  GridItem,
  HStack,
  List,
  ListItem,
  VStack,
} from "@chakra-ui/layout";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/stat";
import { first, last, orderBy, sum } from "lodash";
import React, { useEffect, useState } from "react";
import { ArmorVM } from "../../client/viewModels/ArmorVM";
import gearInfoProvider from "../../providers/gearInfoProvider";

type ArmorInfoProps = {
  armors: string[];
};

export default function ArmorInfo(props: ArmorInfoProps) {
  const [armorData, setArmorData] = useState<ArmorVM[]>([]);

  useEffect(() => {
    gearInfoProvider.GetArmorListInfo(props.armors).then((res) => {
      setArmorData(res);
    });
  }, [props.armors]);

  return props.armors.length === 0 ? (
    <p>No armors selected</p>
  ) : (
    <VStack id="armor-info">
      <Grid
        id="armor-info-summary"
        templateColumns="repeat(2, 1fr)"
        gap={4}
        width="30vw"
        maxWidth="300pt"
        minWidth="200pt"
      >
        <GridItem colSpan={2}>
          <Stat
            borderLeft="1pt solid whitesmoke"
            padding="5pt"
            bgColor="#1a2130"
          >
            <StatLabel fontSize="lg">Inventory Occupancy</StatLabel>
            <StatNumber fontSize="md">{`${sum(
              armorData.map((a) => a.inventoryOccupancy)
            )} microSCU`}</StatNumber>
          </Stat>
        </GridItem>
        <GridItem colSpan={2}>
          <BreakDownInfo
            unit="microSCU"
            breakdownText="Capacity by piece"
            label="InventoryCapacity"
            namedValues={armorData.map((a: ArmorVM) => ({
              name: a.localizedName,
              value: a.inventoryCapacity,
            }))}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <RangeInfo
            unit="%"
            breakdownText="Reduction by piece"
            label="Damage reduction"
            namedValues={armorData.map((a: ArmorVM) => ({
              name: a.localizedName,
              value: a.damageReduction,
            }))}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <RangeInfo
            unit="°C"
            breakdownText="Resistance by piece"
            label="MAX Temperature"
            namedValues={armorData.map((a: ArmorVM) => ({
              name: a.localizedName,
              value: a.maxResistance,
            }))}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <RangeInfo
            unit="°C"
            breakdownText="Resistance by piece"
            label="MIN Temperature"
            namedValues={armorData.map((a: ArmorVM) => ({
              name: a.localizedName,
              value: a.minResistance,
            }))}
          />
        </GridItem>
        <GridItem>
          <Stat
            borderLeft="1pt solid whitesmoke"
            padding="5pt"
            bgColor="#1a2130"
          >
            <StatLabel fontSize="lg">Weapon ports</StatLabel>
            <StatNumber fontSize="md">
              {sum(armorData.map((a) => a.weaponPorts))}
            </StatNumber>
          </Stat>
        </GridItem>
        <GridItem>
          <Stat
            borderLeft="1pt solid whitesmoke"
            padding="5pt"
            bgColor="#1a2130"
          >
            <StatLabel fontSize="lg">Ammo ports</StatLabel>
            <StatNumber fontSize="md">
              {sum(armorData.map((a) => a.ammoPorts))}
            </StatNumber>
          </Stat>
        </GridItem>
        <GridItem>
          <Stat
            borderLeft="1pt solid whitesmoke"
            padding="5pt"
            bgColor="#1a2130"
          >
            <StatLabel fontSize="lg">Utility ports</StatLabel>
            <StatNumber fontSize="md">
              {sum(armorData.map((a) => a.utilityPorts))}
            </StatNumber>
          </Stat>
        </GridItem>
        <GridItem>
          <Stat
            borderLeft="1pt solid whitesmoke"
            padding="5pt"
            bgColor="#1a2130"
          >
            <StatLabel fontSize="lg">Throwable ports</StatLabel>
            <StatNumber fontSize="md">
              {sum(armorData.map((a) => a.grenadePorts))}
            </StatNumber>
          </Stat>
        </GridItem>
        <GridItem>
          <Stat
            borderLeft="1pt solid whitesmoke"
            padding="5pt"
            bgColor="#1a2130"
          >
            <StatLabel fontSize="lg">Consumable ports</StatLabel>
            <StatNumber fontSize="md">
              {sum(armorData.map((a) => a.oxygenPorts)) +
                sum(armorData.map((a) => a.medicalPorts))}
            </StatNumber>
          </Stat>
        </GridItem>
      </Grid>
    </VStack>
  );
}

type RangeInfoProps = {
  namedValues: { name: string; value: number }[];
  unit: string;
  breakdownText: string;
  label: string;
};

function RangeInfo(props: RangeInfoProps) {
  const getRangeString = (): string => {
    if (props.namedValues.length === 0) return `0${props.unit}`;

    const ordered = orderBy(props.namedValues, (a) => a.value);
    if (first(ordered) === last(ordered)) {
      return `${ordered[0].value}${props.unit}`;
    }
    return `${ordered[0]?.value}${props.unit} - ${last(ordered)?.value}${
      props.unit
    }`;
  };

  return (
    <>
      <Stat borderLeft="1pt solid whitesmoke" padding="5pt" bgColor="#1a2130">
        <StatLabel fontSize="lg">{props.label}</StatLabel>
        <StatNumber fontSize="md">{getRangeString()}</StatNumber>
      </Stat>
      <Accordion
        allowToggle
        width="inherit"
        borderLeft="1pt solid whitesmoke"
        padding="5pt"
        bgColor="#1a2130"
      >
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {props.breakdownText}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <List>
              {props.namedValues.map((r) => (
                <ListItem key={Math.random()}>
                  <HStack justifyContent="space-between">
                    <p>{r.name}</p>
                    <p>{`${r.value}${props.unit}`}</p>
                  </HStack>
                </ListItem>
              ))}
            </List>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}

function BreakDownInfo(props: RangeInfoProps) {
  return (
    <>
      <Stat borderLeft="1pt solid whitesmoke" padding="5pt" bgColor="#1a2130">
        <StatLabel fontSize="lg">{props.label}</StatLabel>
        <StatNumber fontSize="md">{`${sum(
          props.namedValues.map((v) => v.value)
        )} ${props.unit}`}</StatNumber>
      </Stat>
      <Accordion
        allowToggle
        width="inherit"
        borderLeft="1pt solid whitesmoke"
        padding="5pt"
        bgColor="#1a2130"
      >
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {props.breakdownText}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <List>
              {props.namedValues.map((r) => (
                <ListItem key={Math.random()}>
                  <HStack justifyContent="space-between">
                    <p>{r.name}</p>
                    <p>{`${r.value}${props.unit}`}</p>
                  </HStack>
                </ListItem>
              ))}
            </List>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
