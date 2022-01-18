import { Box, Heading, HStack } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/switch";
import { useToast } from "@chakra-ui/toast";
import React, { Dispatch, SetStateAction, useState } from "react";
import { KeyValue, ListKey, LocatedItem } from "../../types/types";
import { ShoppingListList } from "./ShoppingListList";
import { ShoppingListTable } from "./ShoppingListTable";

type ShoppingListProps = {
  gear: string[];
  listUpstream: Dispatch<SetStateAction<KeyValue<ListKey, LocatedItem[]>[]>>;
};

export function ShoppingList(props: ShoppingListProps) {
  const [isTable, setIsTable] = useState(false);
  const toast = useToast();

  const switchListType = () => {
    setIsTable(!isTable);
  };

  return (
    <Box id="shopping-list-container">
      <HStack justifyContent="center">
        <Heading padding="5pt" fontFamily="Exo" color="whitesmoke" size="sm">
          List
        </Heading>
        <Switch id="list-type-switch" onChange={switchListType} width="auto" />
        <Heading padding="5pt" fontFamily="Exo" color="whitesmoke" size="sm">
          Table
        </Heading>
      </HStack>
      {isTable ? (
        <ShoppingListTable gear={props.gear} />
      ) : (
        <ShoppingListList gear={props.gear} listUpstream={props.listUpstream} />
      )}
    </Box>
  );
}
