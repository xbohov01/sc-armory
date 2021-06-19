import { Box, Heading, HStack, VStack } from '@chakra-ui/layout';
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
  const [price, setPrice] = useState(0);

  useEffect(() => {
    shoppingListGenerator.GetShoppingList(props.gear).then((res) => {
      setPrice(res[0]);
      setList(res[1]);
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
    <Box marginTop='10pt' width='fit-content' marginBottom='50pt'>
      <Box marginBottom='10pt'>
        <HStack flex={1}>
          {list.length > 0 ? 
            <>
              <Heading fontSize='sm'>{`Estimated purchase price: `}</Heading>
              <Heading paddingLeft='50pt' fontSize='sm'>{`${formatter.format(price)} aUEC`}</Heading> 
            </>
            : ''
          }
        </HStack>
      </Box>
      <VStack>
        {list.map(l => <ShoppingListLocation items={l} boughtSetter={setItemBought} key={l.key.id} />)}
      </VStack>
    </Box>
  )
}