import { sum } from "lodash";

import { Box, HStack, List, ListItem } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/stat";

import type { RangeInfoProps } from "./RangeInfo";

export default function BreakDownInfo(props: RangeInfoProps) {
  return (
    <>
      <Stat padding="5pt">
        <StatLabel fontSize="lg">{props.label}</StatLabel>
        <StatNumber fontSize="md">{`${sum(
          props.namedValues.map((v) => v.value)
        )} ${props.unit}`}</StatNumber>
      </Stat>
      <Accordion
        allowToggle
        width="inherit"
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
