import { Box, HStack, List, ListItem } from "@chakra-ui/layout";
import {
  Accordion, AccordionButton,
  AccordionIcon, AccordionItem, AccordionPanel
} from "@chakra-ui/react";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/stat";
import { sum } from "lodash";
import { RangeInfoProps } from "../../../types/types";

export default function BreakDownInfo(props: RangeInfoProps) {
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
