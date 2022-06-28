import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { Grid, GridItem, Heading, VStack } from "@chakra-ui/layout";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/stat";
import { Tooltip } from "@chakra-ui/tooltip";

import DamageDropDisplay from "./DamageDropDisplay";

import type { Weapon } from "~type/loadout";

type WeaponInfoDisplayProps = {
  weapon: Weapon;
};

const hoverStyle = {
  background:
    "linear-gradient(90deg, rgba(245, 143, 41, 0.2) 0%, rgba(245, 143, 41, 0) 12.65%), #1a2130",
};

export default function WeaponInfoDisplay(props: WeaponInfoDisplayProps) {
  return (
    <VStack id="weapon-info">
      <Heading
        size="md"
        width="29vw"
        maxWidth="290pt"
        minWidth="240pt"
        textAlign="left"
        borderLeft="3px solid #F58F29"
        padding="5pt"
        background="#1a2130"
        _hover={hoverStyle}
      >
        {props.weapon.localizedName}
      </Heading>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={4}
        width="29vw"
        maxWidth="290pt"
        minWidth="240pt"
      >
        <GridItem>
          <Stat
            borderLeft="3px solid #F58F29"
            padding="5pt"
            background="#1a2130"
            _hover={hoverStyle}
          >
            <StatLabel fontSize="lg">Range</StatLabel>
            <StatNumber fontSize="md">{`${props.weapon.range} m`}</StatNumber>
          </Stat>
        </GridItem>
        <GridItem>
          <Stat
            borderLeft="3px solid #F58F29"
            padding="5pt"
            background="#1a2130"
            _hover={hoverStyle}
          >
            <StatLabel fontSize="lg">Type</StatLabel>
            <StatNumber fontSize="md">{props.weapon.ammoType}</StatNumber>
          </Stat>
        </GridItem>
        <GridItem>
          <Stat
            borderLeft="3px solid #F58F29"
            padding="5pt"
            background="#1a2130"
            _hover={hoverStyle}
          >
            <StatLabel fontSize="lg">Magazine capacity</StatLabel>
            <StatNumber fontSize="md">{props.weapon.magazineSize}</StatNumber>
          </Stat>
        </GridItem>
        <GridItem>
          <Stat
            borderLeft="3px solid #F58F29"
            padding="5pt"
            background="#1a2130"
            _hover={hoverStyle}
          >
            <StatLabel fontSize="lg">Alpha damage</StatLabel>
            <StatNumber fontSize="md">{props.weapon.alphaDamage}</StatNumber>
          </Stat>
        </GridItem>
        {props.weapon.singleFireRate === 0 ? (
          ""
        ) : (
          <GridItem>
            <Stat
              borderLeft="3px solid #F58F29"
              padding="5pt"
              background="#1a2130"
              _hover={hoverStyle}
            >
              <StatLabel fontSize="lg">Semi RoF</StatLabel>
              <StatNumber fontSize="md">
                {`${props.weapon.singleFireRate} RPM`}
              </StatNumber>
            </Stat>
          </GridItem>
        )}
        {props.weapon.rapidFireRate === 0 ? (
          ""
        ) : (
          <GridItem>
            <Stat
              borderLeft="3px solid #F58F29"
              padding="5pt"
              background="#1a2130"
              _hover={hoverStyle}
            >
              <StatLabel fontSize="lg">Auto RoF</StatLabel>
              <StatNumber fontSize="md">
                {`${props.weapon.rapidFireRate} RPM`}
              </StatNumber>
            </Stat>
          </GridItem>
        )}
        {props.weapon.burstFireRate === 0 ? (
          ""
        ) : (
          <GridItem>
            <Stat
              borderLeft="3px solid #F58F29"
              padding="5pt"
              background="#1a2130"
              _hover={hoverStyle}
            >
              <StatLabel fontSize="lg">Burst RoF</StatLabel>
              <StatNumber fontSize="md">
                {`${props.weapon.burstFireRate} RPM`}
              </StatNumber>
            </Stat>
          </GridItem>
        )}
        {props.weapon.burstFireRate === 0 ? (
          ""
        ) : (
          <GridItem>
            <Stat
              borderLeft="3px solid #F58F29"
              padding="5pt"
              background="#1a2130"
              _hover={hoverStyle}
            >
              <StatLabel fontSize="lg">Burst size</StatLabel>
              <StatNumber fontSize="md">{props.weapon.burstSize}</StatNumber>
            </Stat>
          </GridItem>
        )}
        <GridItem
          colSpan={2}
          borderLeft="3px solid #F58F29"
          padding="5pt"
          background="#1a2130"
          _hover={hoverStyle}
        >
          <DamageDropDisplay
            ammoContainerReference={props.weapon.ammoContainerReference}
          />
        </GridItem>
        <GridItem
          colSpan={2}
          borderLeft="3px solid #F58F29"
          padding="5pt"
          background="#1a2130"
          _hover={hoverStyle}
        >
          <Accordion allowToggle width="inherit" bgColor="#1a2130">
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Tooltip
                    label="In game description may differ from game file data"
                    aria-label="A tooltip"
                  >
                    In-game description
                  </Tooltip>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} textAlign="left" whiteSpace="pre-line">
                {props.weapon.localizedDescription.replaceAll("\\n", "\n")}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </GridItem>
      </Grid>
    </VStack>
  );
}
