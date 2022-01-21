import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { VStack, Grid, Heading, GridItem } from "@chakra-ui/layout";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/stat";
import { Tooltip } from "@chakra-ui/tooltip";
import React, { useEffect, useState } from "react";
import { WeaponVM } from "../../client/viewModels/WeaponVM";
import gearInfoProvider from "../../providers/gearInfoProvider";

type WeaponInfoProps = {
  weapons: string[];
};

export default function WeaponInfo(props: WeaponInfoProps) {
  const [weaponData, setWeaponData] = useState<WeaponVM[]>([]);

  useEffect(() => {
    gearInfoProvider.GetWeaponListInfo(props.weapons).then((res) => {
      setWeaponData(res);
    });
  }, [props.weapons]);

  return (
    <VStack id="weapons-info">
      {weaponData.length === 0 ? (
        <p>No weapons selected</p>
      ) : (
        weaponData.map((d) => (
          <WeaponInfoDisplay key={Math.random()} weapon={d} />
        ))
      )}
    </VStack>
  );
}

type WeaponInfoDisplayProps = {
  weapon: WeaponVM;
};

function WeaponInfoDisplay(props: WeaponInfoDisplayProps) {
  return (
    <VStack id="weapon-info">
      <Heading
        size="md"
        width="30vw"
        maxWidth="300pt"
        minWidth="200pt"
        textAlign="left"
        borderLeft="1pt solid whitesmoke"
        padding="5pt"
        bgColor="#1a2130"
      >
        {props.weapon.localizedName}
      </Heading>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={4}
        width="30vw"
        maxWidth="300pt"
        minWidth="200pt"
      >
        <GridItem>
          <Stat
            borderLeft="1pt solid whitesmoke"
            padding="5pt"
            bgColor="#1a2130"
          >
            <StatLabel fontSize="lg">Range</StatLabel>
            <StatNumber fontSize="md">{`${props.weapon.range} m`}</StatNumber>
          </Stat>
        </GridItem>
        <GridItem>
          <Stat
            borderLeft="1pt solid whitesmoke"
            padding="5pt"
            bgColor="#1a2130"
          >
            <StatLabel fontSize="lg">Type</StatLabel>
            <StatNumber fontSize="md">{props.weapon.ammoType}</StatNumber>
          </Stat>
        </GridItem>
        <GridItem>
          <Stat
            borderLeft="1pt solid whitesmoke"
            padding="5pt"
            bgColor="#1a2130"
          >
            <StatLabel fontSize="lg">Magazine capacity</StatLabel>
            <StatNumber fontSize="md">{props.weapon.magazineSize}</StatNumber>
          </Stat>
        </GridItem>
        <GridItem>
          <Stat
            borderLeft="1pt solid whitesmoke"
            padding="5pt"
            bgColor="#1a2130"
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
              borderLeft="1pt solid whitesmoke"
              padding="5pt"
              bgColor="#1a2130"
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
              borderLeft="1pt solid whitesmoke"
              padding="5pt"
              bgColor="#1a2130"
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
              borderLeft="1pt solid whitesmoke"
              padding="5pt"
              bgColor="#1a2130"
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
              borderLeft="1pt solid whitesmoke"
              padding="5pt"
              bgColor="#1a2130"
            >
              <StatLabel fontSize="lg">Burst size</StatLabel>
              <StatNumber fontSize="md">{props.weapon.burstSize}</StatNumber>
            </Stat>
          </GridItem>
        )}
        <GridItem colSpan={2}>
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
