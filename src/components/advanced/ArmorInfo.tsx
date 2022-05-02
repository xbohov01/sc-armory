import { sum } from "lodash";
import React, { useEffect, useState } from "react";

import { Grid, GridItem, VStack } from "@chakra-ui/layout";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/stat";

import BreakDownInfo from "./armorInfo/BreakDownInfo";
import RangeInfo from "./armorInfo/RangeInfo";

import { getArmorListInfo } from "~/util/gearInfo";
import type { Armor } from "~type/loadout";

type ArmorInfoProps = {
  armors: string[];
};

export default function ArmorInfo(props: ArmorInfoProps) {
  const [armorData, setArmorData] = useState<Armor[]>([]);

  useEffect(() => {
    getArmorListInfo(props.armors).then((res) => {
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
            namedValues={armorData.map((a: Armor) => ({
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
            namedValues={armorData.map((a: Armor) => ({
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
            namedValues={armorData.map((a: Armor) => ({
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
            namedValues={armorData.map((a: Armor) => ({
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
