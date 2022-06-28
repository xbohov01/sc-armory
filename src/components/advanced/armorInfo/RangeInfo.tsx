import { first, last, orderBy } from "lodash";

import { Box, HStack, List, ListItem } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/stat";

export type RangeInfoProps = {
  namedValues: { name: string; value: number }[];
  unit: string;
  breakdownText: string;
  label: string;
};

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
      <Stat padding="5pt">
        <StatLabel fontSize="lg">{props.label}</StatLabel>
        <StatNumber fontSize="md">{getRangeString()}</StatNumber>
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
