import { AiFillQuestionCircle } from "react-icons/ai";

import { Box, HStack, VStack } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/react";

import { ListKey } from "../../types/types";

import { ShoppingListItem } from "./ShoppingListItem";

import type { LocatedItem } from '~type/search'
import type { KeyValue } from '~type/select'

type ShoppingLocationProps = {
  items: KeyValue<ListKey, LocatedItem[]>;
  boughtSetter: (item: string, bought: boolean) => void;
};

export default function ShoppingLocation(props: ShoppingLocationProps) {
  const buildLocationToolTip = () => {
    return (
      <Tooltip 
        placement="auto" 
        label={props.items.key.name === 'N/A' ? 'Possible loot only item(s)' : ''}
      >
        <HStack>
          <>
            {`${props.items.key.name} - ${props.items.key.chain
              .split("-")
              .reverse()
              .join(" - ")}`}
          </>
          <>{props.items.key.name === 'N/A' ? <AiFillQuestionCircle /> : ""}</>
        </HStack>
      </Tooltip>
    );
  };

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
        {`${
          props.items.value.filter((i) => !i.isBought).length
        } of remaining items`}
        {buildLocationToolTip()}
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
