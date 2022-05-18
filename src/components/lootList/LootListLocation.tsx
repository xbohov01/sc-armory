import React from 'react'

import { Box, SimpleGrid } from "@chakra-ui/layout";

import LocationItem from './LocationItem';

import { LootItem } from "~type/search";

type LootLIstItemProps = {
  lootItems: LootItem[];
  location: string;
};

export default function LootListLocation(props: LootLIstItemProps) {
  return (
    <Box
      flex="1"
      textAlign="left"
      borderLeft="solid 1pt whitesmoke"
      padding="5pt"
      width="full"
      backgroundColor="#1a2130"
    >
      <Box flex="1" textAlign="left" fontSize="large" paddingBottom="10pt">
        {props.location}
      </Box>
      <SimpleGrid columns={2} paddingLeft="10px">
        {props.lootItems.map((l) => (
          <LocationItem
            key={Math.random()}
            item={l.item}
            probability={l.probability}
            container={l.container}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
