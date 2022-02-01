import { Box, HStack, List, ListItem } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/stat";
import { first, last, orderBy } from "lodash";
import React from "react";
import { RangeInfoProps } from "../../../types/types";

export default function RangeInfo(props: RangeInfoProps) {
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
