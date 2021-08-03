import { Box, Grid, GridItem, HStack, List, ListItem, VStack } from "@chakra-ui/layout"
import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react"
import { Stat, StatLabel, StatNumber } from "@chakra-ui/stat"
import { first, last, orderBy, sum } from "lodash"
import React, { useEffect, useState } from "react"
import { ArmorVM } from "../../client/viewModels/ArmorVM"
import gearInfoProvider from "../../providers/gearInfoProvider"

type ArmorInfoProps = {
  armors: string[]
}

export function ArmorInfo(props: ArmorInfoProps) {
  const [armorData, setArmorData] = useState<ArmorVM[]>([]);

  useEffect(() => {
    gearInfoProvider.GetArmorListInfo(props.armors).then(res => {
      setArmorData(res);
    })
  }, [props.armors])

  return (
    props.armors.length === 0 ? <p>No armors selected</p> :
      <VStack id='armor-info'>
        <Grid id='armor-info-summary'
          templateColumns="repeat(2, 1fr)"
          gap={4}
          width='30vw' maxWidth='300pt' minWidth='200pt'>
          <GridItem colSpan={2}>
            <Stat borderLeft='1pt solid whitesmoke' padding='5pt' bgColor='#1a2130'>
              <StatLabel fontSize='lg'>Inventory Capacity</StatLabel>
              <StatNumber fontSize='md'>{`${sum(armorData.map(a => a.InventoryCapacity))} microSCU`}</StatNumber>
            </Stat>
          </GridItem>
          <GridItem colSpan={2}>
            <RangeInfo
              reverse unit='%'
              breakdownText='Reduction by piece'
              label="Damage reduction"
              namedValues={armorData.map((a: ArmorVM) => {
                return {
                  name: a.LocalizedName, value: a.DamageReduction
                }
              })} />
          </GridItem>
          <GridItem colSpan={2}>
            <RangeInfo
              reverse unit='°C'
              breakdownText='Resistance by piece'
              label="MAX Temperature"
              namedValues={armorData.map((a: ArmorVM) => {
                return {
                  name: a.LocalizedName, value: a.MaxResistance
                }
              })} />
          </GridItem>
          <GridItem colSpan={2}>
            <RangeInfo
              reverse={false}
              unit='°C'
              breakdownText='Resistance by piece'
              label="MIN Temperature"
              namedValues={armorData.map((a: ArmorVM) => {
                return {
                  name: a.LocalizedName, value: a.MinResistance
                }
              })} />
          </GridItem>
          <GridItem>
            <Stat borderLeft='1pt solid whitesmoke' padding='5pt' bgColor='#1a2130'>
              <StatLabel fontSize='lg'>Weapon ports</StatLabel>
              <StatNumber fontSize='md'>{sum(armorData.map(a => a.WeaponPorts))}</StatNumber>
            </Stat>
          </GridItem>
          <GridItem>
            <Stat borderLeft='1pt solid whitesmoke' padding='5pt' bgColor='#1a2130'>
              <StatLabel fontSize='lg'>Ammo ports</StatLabel>
              <StatNumber fontSize='md'>{sum(armorData.map(a => a.AmmoPorts))}</StatNumber>
            </Stat>
          </GridItem>
          <GridItem>
            <Stat borderLeft='1pt solid whitesmoke' padding='5pt' bgColor='#1a2130'>
              <StatLabel fontSize='lg'>Utility ports</StatLabel>
              <StatNumber fontSize='md'>{sum(armorData.map(a => a.UtilityPorts))}</StatNumber>
            </Stat>
          </GridItem>
          <GridItem>
            <Stat borderLeft='1pt solid whitesmoke' padding='5pt' bgColor='#1a2130'>
              <StatLabel fontSize='lg'>Throwable ports</StatLabel>
              <StatNumber fontSize='md'>{sum(armorData.map(a => a.GrenadePorts))}</StatNumber>
            </Stat>
          </GridItem>
          <GridItem>
            <Stat borderLeft='1pt solid whitesmoke' padding='5pt' bgColor='#1a2130'>
              <StatLabel fontSize='lg'>Consumable ports</StatLabel>
              <StatNumber fontSize='md'>{sum(armorData.map(a => a.OxygenPorts)) + sum(armorData.map(a => a.MedicalPorts))}</StatNumber>
            </Stat>
          </GridItem>
        </Grid>
      </VStack>
  )
}

type RangeInfoProps = {
  reverse: boolean;
  namedValues: { name: string, value: number }[];
  unit: string;
  breakdownText: string;
  label: string;
}

function RangeInfo(props: RangeInfoProps) {

  const getRangeString = (): string => {
    if (props.namedValues.length === 0) return `0${props.unit}`;

    var ordered = orderBy(props.namedValues, a => a.value);
    if (first(ordered) === last(ordered)) {
      return `${ordered[0].value}${props.unit}`
    }
    return `${ordered[0]?.value}${props.unit} - ${last(ordered)?.value}${props.unit}`
  }

  return (
    <>
      <Stat borderLeft='1pt solid whitesmoke' padding='5pt' bgColor='#1a2130'>
        <StatLabel fontSize='lg'>{props.label}</StatLabel>
        <StatNumber fontSize='md'>{getRangeString()}</StatNumber>
      </Stat>
      <Accordion allowToggle width='inherit' borderLeft='1pt solid whitesmoke' padding='5pt' bgColor='#1a2130'>
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
              {props.namedValues.map(r => <ListItem key={Math.random()}>
                <HStack justifyContent='space-between'>
                  <p>{r.name}</p>
                  <p>{`${r.value}${props.unit}`}</p>
                </HStack>
              </ListItem>)}
            </List>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  )
}