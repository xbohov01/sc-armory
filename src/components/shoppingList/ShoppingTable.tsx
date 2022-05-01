import React, { useEffect, useState } from "react";

import { Box } from "@chakra-ui/layout";
import { Table, Tbody, useToast } from "@chakra-ui/react";

import shoppingListGenerator from "../shoppingListGenerator";

import { DataRow } from "./DataRow";
import { HeaderRow } from "./HeaderRow";

import type { LocatedItem } from '~type/search'
import type { KeyValue } from '~type/select'

type ShoppingTableProps = {
  gear: string[];
};

export default function ShoppingTable(props: ShoppingTableProps) {
  const toast = useToast();
  const [locations, setLocations] = useState<string[]>([]);
  const [list, setList] = useState<KeyValue<string, LocatedItem[]>[]>([]);

  useEffect(() => {
    try {
      shoppingListGenerator.GetLocationsPerItem(props.gear).then((res) => {
        setLocations(res.locations);
        setList(res.list);
      });
    } catch (e) {
      toast({
        title: "Error",
        description: "Unable to fetch shopping list, try again later",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [props.gear]);

  return (
    <Box id="shopping-list-table" marginTop="100pt">
      <Table size="sm">
        <HeaderRow locations={locations.map((l) => l)} />
        <Tbody>
          {list.map((g) => (
            <DataRow
              key={Math.random()}
              locations={locations}
              locatedItem={g}
            />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
