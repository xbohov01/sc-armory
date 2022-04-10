import { Td, Tr } from "@chakra-ui/react";

import { KeyValue, LocatedItem } from "../../types/types";

export type DataRowProps = {
  locations: string[];
  locatedItem: KeyValue<string, LocatedItem[]>;
};

// Items per location as rows
export function DataRow(props: DataRowProps) {
  const renderCell = (location: string) => {
    const locatedItem = props.locatedItem.value.filter((l) =>
      l.storeChain.includes(location)
    );
    if (locatedItem.length > 0) {
      return (
        <Td backgroundColor="#133B35" textAlign="center" key={Math.random()}>
          {locatedItem[0].price}
        </Td>
      );
    }
    return <Td key={Math.random()} />;
  };

  return (
    <Tr color="whitesmoke">
      <Td whiteSpace="nowrap">{props.locatedItem.key}</Td>
      {props.locations.map((l) => renderCell(l))}
    </Tr>
  );
}
