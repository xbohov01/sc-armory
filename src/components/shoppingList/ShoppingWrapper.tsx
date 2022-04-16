import React, { Dispatch, SetStateAction, useState } from "react";

import { Box, Heading, HStack } from "@chakra-ui/layout";
import { Switch } from "@chakra-ui/switch";
import { useToast } from "@chakra-ui/toast";

import { KeyValue, ListKey, LocatedItem } from "../../types/types";

import ShoppingList from "./ShoppingList";
import ShoppingTable from "./ShoppingTable";

type ShoppingWrapperProps = {
  gear: string[];
  listUpstream: Dispatch<SetStateAction<KeyValue<ListKey, LocatedItem[]>[]>>;
};

export default function ShoppingWrapper(props: ShoppingWrapperProps) {
  const [isTable, setIsTable] = useState(false);
  useToast();

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
        <ShoppingTable gear={props.gear} />
      ) : (
        <ShoppingList gear={props.gear} listUpstream={props.listUpstream} />
      )}
    </Box>
  );
}
