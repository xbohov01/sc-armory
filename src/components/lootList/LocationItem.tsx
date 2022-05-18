import React from 'react'

import { Box } from "@chakra-ui/layout";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";

type LocationItemProps = {
  item: string;
  probability: number;
  container: string;
};

export default function LocationItem(props: LocationItemProps) {
  return (
    <Box>
      <Stat>
        <StatLabel>{props.item}</StatLabel>
        <StatNumber>{`${(props.probability * 100).toFixed(4)}%`}</StatNumber>
        <StatHelpText>In: {props.container}</StatHelpText>
      </Stat>
    </Box>
  );
}
