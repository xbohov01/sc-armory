import { Box, VStack } from "@chakra-ui/layout";
import React from "react";
import { KeyValue, ListKey, LocatedItem } from "../../types/types";
import { ShoppingListItem } from "./ShoppingListItem";

type ShoppingLocationProps = {
  items: KeyValue<ListKey, LocatedItem[]>;
  boughtSetter: (item: string, bought: boolean) => void;
};

export default function ShoppingLocation(props: ShoppingLocationProps) {
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
        <p>{`${
          props.items.value.filter((i) => !i.isBought).length
        } of remaining items`}</p>
        <p>{`${props.items.key.name} - ${props.items.key.chain
          .split("-")
          .reverse()
          .join(" - ")}`}</p>
      </Box>
      <VStack>
        {props.items.value.map((i) => (
          <ShoppingListItem
            item={i}
            boughtSetter={props.boughtSetter}
            key={Math.random()}
          />
        ))}
      </VStack>
    </Box>
  );
}
