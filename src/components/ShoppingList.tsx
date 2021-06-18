import { Box, VStack } from '@chakra-ui/layout';
import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import shoppingListGenerator from '../client/shoppingListGenerator';
import { KeyValue, ListKey, LocatedItem } from '../types/types';
import { ShoppingListLocation } from './ShoppingListLocation';

type ShoppingListProps = {
  gear: string[];
}

export function ShoppingList(props: ShoppingListProps) {
  const [list, setList] = useState<KeyValue<ListKey, LocatedItem[]>[]>([]);

  useEffect(() => {
    shoppingListGenerator.GetShoppingList(props.gear).then((res) => {
      setList(res);
    })
  }, [props.gear]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const setItemBought = (itemName: string, bought: boolean) => {
    var copy = cloneDeep(list);
    for (let location of copy){
      for (let item of location.value.filter(v => v.item === itemName)){
        item.isBought = bought
      }
    }
    setList(copy);
  }

  return (
    <Box marginTop='20pt' width='fit-content' marginBottom='50pt'>
      <VStack>
        {list.map(l => <ShoppingListLocation items={l} boughtSetter={setItemBought} key={l.key.id} />)}
      </VStack>
    </Box>
  )
}