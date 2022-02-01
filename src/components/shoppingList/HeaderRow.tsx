import React from "react";
import { Th, Thead, Tr } from "@chakra-ui/react";

export type HeaderRowProps = {
  locations: string[];
};

// Locations as headers
export function HeaderRow(props: HeaderRowProps) {
  return (
    <Thead>
      <Tr>
        <Th
          colSpan={props.locations.length + 1}
          textAlign="center"
          color="whitesmoke"
        >
          Locations
        </Th>
      </Tr>
      <Tr>
        <Th color="whitesmoke">Item</Th>
        {props.locations.map((l) => (
          <Th whiteSpace="nowrap" key={Math.random()} color="whitesmoke">
            {l}
          </Th>
        ))}
      </Tr>
    </Thead>
  );
}
