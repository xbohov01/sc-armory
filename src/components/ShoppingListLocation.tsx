import { Checkbox } from "@chakra-ui/checkbox"
import { Box, Heading, HStack, VStack } from "@chakra-ui/layout"
import { SyntheticEvent } from "react"
import { KeyValue, ListKey, LocatedItem } from "../types/types"

type ShoppingListLocationProps = {
  items: KeyValue<ListKey, LocatedItem[]>
  boughtSetter: (item: string, bought: boolean) => void
}

export function ShoppingListLocation(props: ShoppingListLocationProps) {
  return (
    <Box flex="1" textAlign="left" borderLeft='solid 1pt whitesmoke' padding='5pt' width='full' backgroundColor='#1a2130'>
      <Box flex="1" textAlign="left" fontSize='large'>
        {`${props.items.value.filter(i => !i.isBought).length} of remaining items at ${props.items.key.name} - ${props.items.key.chain.split('-').reverse().join(' - ')}`}
      </Box>
      <VStack>
        {props.items.value.map(i => <ShoppingListItem item={i} boughtSetter={props.boughtSetter} key={Math.random()} />)}
      </VStack>
    </Box>
  )
}

type ShoppingListItemProps = {
  item: LocatedItem,
  boughtSetter: (item: string, bought: boolean) => void
}

export function ShoppingListItem(props: ShoppingListItemProps) {
  const handleToggle = (e: SyntheticEvent) => {
    //e.preventDefault();
    props.boughtSetter(props.item.item, !props.item.isBought);
  };

  return (
    <HStack key={Math.random()} spacing='20pt'>
      <Box minWidth='200pt' textAlign='left' fontSize='sm' textDecoration={props.item.isBought ? 'line-through' : 'none'} >{`${props.item.item} - ${props.item.price}aUEC`}</Box>
      <HStack>
        <Heading size='xs' as='h5'>I bought this here: </Heading>
        <Checkbox isChecked={props.item.isBought} onChange={handleToggle}/>
      </HStack>
    </HStack>
  )
}