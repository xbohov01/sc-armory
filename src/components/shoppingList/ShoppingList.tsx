import { cloneDeep } from "lodash";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Box, Heading, HStack, VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";

import {  ListKey } from "../../types/types";
import shoppingListGenerator from "../shoppingListGenerator";

import ShoppingLocation from "./ShoppingLocation";

import type { LocatedItem } from '~type/search'
import type { KeyValue } from '~type/select'

type ShoppingListProps = {
  gear: string[];
  listUpstream: Dispatch<SetStateAction<KeyValue<ListKey, LocatedItem[]>[]>>;
};

export default function ShoppingList(props: ShoppingListProps) {
  const [list, setList] = useState<KeyValue<ListKey, LocatedItem[]>[]>([]);
  const [price, setPrice] = useState(0);
  const toast = useToast();

  useEffect(() => {
    try {
      shoppingListGenerator.GetShoppingList(props.gear).then((res) => {
        setPrice(res[0]);
        setList(res[1]);
        props.listUpstream(res[1]);
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

  const setItemBought = (itemName: string, bought: boolean) => {
    const copy = cloneDeep(list);
    // eslint-disable-next-line no-restricted-syntax
    for (const location of copy) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of location.value.filter((v) => v.item === itemName)) {
        item.isBought = bought;
      }
    }
    setList(copy);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Box
      marginTop="10pt"
      width="400pt"
      marginBottom="10pt"
      marginLeft="20pt"
      backgroundColor="#282c34"
      color="whitesmoke"
      id="shopping-list"
    >
      <Box marginBottom="10pt">
        <HStack flex={1}>
          {list.length > 0 ? (
            <>
              <Heading fontSize="sm">{`Estimated purchase price: `}</Heading>
              <Heading paddingLeft="50pt" fontSize="sm">{`${formatter.format(
                price
              )} aUEC`}</Heading>
            </>
          ) : (
            ""
          )}
        </HStack>
      </Box>
      <VStack>
        {list.map((l) => (
          <ShoppingLocation
            items={l}
            boughtSetter={setItemBought}
            key={Math.random()}
          />
        ))}
      </VStack>
    </Box>
  );
}
