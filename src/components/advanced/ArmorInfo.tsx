import { sum } from "lodash";
import React from "react";
import { useQuery } from "react-query";

import { Grid, GridItem, VStack } from "@chakra-ui/layout";
import { background } from "@chakra-ui/react";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/stat";

import BreakDownInfo from "./armorInfo/BreakDownInfo";
import RangeInfo from "./armorInfo/RangeInfo";

import { getArmorListInfo } from "~/util/gearInfo";
import type { Armor } from "~type/loadout";

type ArmorInfoProps = {
  armors: string[];
};

const hoverStyle = {
  background:
    "linear-gradient(90deg, rgba(245, 143, 41, 0.2) 0%, rgba(245, 143, 41, 0) 12.65%), linear-gradient(90deg, #1a2130 50%, rgba(40, 50, 65, 0) 101.34%)",
};

export default function ArmorInfo(props: ArmorInfoProps) {
  const { data: armorData } = useQuery(["armorListInfo", props.armors], () =>
    getArmorListInfo(props.armors)
  );

  return props.armors.length === 0 ? (
    <p>No armors selected</p>
  ) : (
    <VStack id="armor-info">
      <Grid
        id="armor-info-summary"
        templateColumns="repeat(2, 1fr)"
        gap={4}
        width="29vw"
        maxWidth="290pt"
        minWidth="240pt"
      >
        <GridItem colSpan={2}>
          <Stat
            borderLeft="3px solid #F58F29"
            padding="5pt"
            background="linear-gradient(90deg, #1a2130 50%, rgba(26, 33, 48, 0) 100%)"
            _hover={hoverStyle}
          >
            <StatLabel fontSize="lg">Inventory Occupancy</StatLabel>
            <StatNumber fontSize="md">{`${sum(
              armorData ? armorData.map((a) => a.inventoryOccupancy) : []
            )} microSCU`}</StatNumber>
          </Stat>
        </GridItem>
        <GridItem
          colSpan={2}
          borderLeft="3px solid #F58F29"
          padding="5pt"
          background="linear-gradient(90deg, #1a2130 50%, rgba(26, 33, 48, 0) 100%)"
          _hover={hoverStyle}
        >
          <BreakDownInfo
            unit="microSCU"
            breakdownText="Capacity by piece"
            label="InventoryCapacity"
            namedValues={
              armorData
                ? armorData.map((a: Armor) => ({
                    name: a.localizedName,
                    value: a.inventoryCapacity,
                  }))
                : []
            }
          />
        </GridItem>
        <GridItem
          colSpan={2}
          borderLeft="3px solid #F58F29"
          padding="5pt"
          background="linear-gradient(90deg, #1a2130 50%, rgba(26, 33, 48, 0) 100%)"
          _hover={hoverStyle}
        >
          <RangeInfo
            unit="%"
            breakdownText="Reduction by piece"
            label="Damage reduction"
            namedValues={
              armorData
                ? armorData.map((a: Armor) => ({
                    name: a.localizedName,
                    value: a.damageReduction,
                  }))
                : []
            }
          />
        </GridItem>
        <GridItem
          colSpan={2}
          borderLeft="3px solid #F58F29"
          padding="5pt"
          background="linear-gradient(90deg, #1a2130 50%, rgba(26, 33, 48, 0) 100%)"
          _hover={hoverStyle}
        >
          <RangeInfo
            unit="°C"
            breakdownText="Resistance by piece"
            label="MAX Temperature"
            namedValues={
              armorData
                ? armorData.map((a: Armor) => ({
                    name: a.localizedName,
                    value: a.maxResistance,
                  }))
                : []
            }
          />
        </GridItem>
        <GridItem
          colSpan={2}
          borderLeft="3px solid #F58F29"
          padding="5pt"
          background="linear-gradient(90deg, #1a2130 50%, rgba(26, 33, 48, 0) 100%)"
          _hover={hoverStyle}
        >
          <RangeInfo
            unit="°C"
            breakdownText="Resistance by piece"
            label="MIN Temperature"
            namedValues={
              armorData
                ? armorData.map((a: Armor) => ({
                    name: a.localizedName,
                    value: a.minResistance,
                  }))
                : []
            }
          />
        </GridItem>
        <GridItem>
          <Stat
            borderLeft="3px solid #F58F29"
            padding="5pt"
            background="linear-gradient(90deg, #1a2130 50%, rgba(26, 33, 48, 0) 100%)"
            _hover={hoverStyle}
          >
            <StatLabel fontSize="lg">Weapon ports</StatLabel>
            <StatNumber fontSize="md">
              {sum(armorData ? armorData.map((a) => a.weaponPorts) : [])}
            </StatNumber>
          </Stat>
        </GridItem>
        <GridItem>
          <Stat
            borderLeft="3px solid #F58F29"
            padding="5pt"
            background="linear-gradient(90deg, #1a2130 50%, rgba(26, 33, 48, 0) 100%)"
            _hover={hoverStyle}
          >
            <StatLabel fontSize="lg">Ammo ports</StatLabel>
            <StatNumber fontSize="md">
              {sum(armorData ? armorData.map((a) => a.ammoPorts) : [])}
            </StatNumber>
          </Stat>
        </GridItem>
        <GridItem>
          <Stat
            borderLeft="3px solid #F58F29"
            padding="5pt"
            background="linear-gradient(90deg, #1a2130 50%, rgba(26, 33, 48, 0) 100%)"
            _hover={hoverStyle}
          >
            <StatLabel fontSize="lg">Utility ports</StatLabel>
            <StatNumber fontSize="md">
              {sum(armorData ? armorData.map((a) => a.utilityPorts) : [])}
            </StatNumber>
          </Stat>
        </GridItem>
        <GridItem>
          <Stat
            borderLeft="3px solid #F58F29"
            padding="5pt"
            background="linear-gradient(90deg, #1a2130 50%, rgba(26, 33, 48, 0) 100%)"
            _hover={hoverStyle}
          >
            <StatLabel fontSize="lg">Throwable ports</StatLabel>
            <StatNumber fontSize="md">
              {sum(armorData ? armorData.map((a) => a.grenadePorts) : [])}
            </StatNumber>
          </Stat>
        </GridItem>
        <GridItem>
          <Stat
            borderLeft="3px solid #F58F29"
            padding="5pt"
            background="linear-gradient(90deg, #1a2130 50%, rgba(26, 33, 48, 0) 100%)"
            _hover={hoverStyle}
          >
            <StatLabel fontSize="lg">Consumable ports</StatLabel>
            <StatNumber fontSize="md">
              {sum(armorData ? armorData.map((a) => a.oxygenPorts) : []) +
                sum(armorData ? armorData.map((a) => a.medicalPorts) : [])}
            </StatNumber>
          </Stat>
        </GridItem>
      </Grid>
    </VStack>
  );
}
