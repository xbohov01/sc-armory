import React, { useEffect, useState } from "react"
import { Box } from '@chakra-ui/layout';
import { KeyValue, LocatedItem } from '../../types/types';
import { Table, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import shoppingListGenerator from "../../client/shoppingListGenerator";

type ShoppingListTableProps = {
  gear: string[];
}

export function ShoppingListTable(props: ShoppingListTableProps) {
  const toast = useToast();
  const [locations, setLocations] = useState<string[]>([])
  const [list, setList] = useState<KeyValue<string, LocatedItem[]>[]>([]);

  useEffect(() => {
    try {
      shoppingListGenerator.GetLocationsPerItem(props.gear).then((res) => {
        setLocations(res.locations);
        setList(res.list);
      });
    } catch (e) {
      toast({
        title: 'Error',
        description: 'Unable to fetch shopping list, try again later',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [props.gear]);

  return (
    <Box id='shopping-list-table'
      marginTop='100pt'>
      <Table size='sm'>
        <HeaderRow locations={locations.map(l => l)} />
        <Tbody>
          {list.map(g =>
            <DataRow
              key={Math.random()}
              locations={locations}
              locatedItem={g}
            />)
          }
        </Tbody>
      </Table>
    </Box>
  )
}

type HeaderRowProps = {
  locations: string[];
}

// Locations as headers
function HeaderRow(props: HeaderRowProps) {
  return (
    <Thead>
      <Tr>
        <Th colSpan={props.locations.length + 1} textAlign='center' color='whitesmoke'>Locations</Th>
      </Tr>
      <Tr>
        <Th color='whitesmoke' >Item</Th>
        {props.locations.map(l => <Th whiteSpace='nowrap' key={Math.random()} color='whitesmoke'>{l}</Th>)}
      </Tr>
    </Thead>
  )
}

type DataRowProps = {
  locations: string[];
  locatedItem: KeyValue<string, LocatedItem[]>;
}

// Items per location as rows
function DataRow(props: DataRowProps) {

  const renderCell = (location: string) => {
    let locatedItem = props.locatedItem.value.filter(l => l.storeChain.includes(location));
    if (locatedItem.length > 0) {
      return (
        <Td backgroundColor='#133B35' textAlign='center' key={Math.random()}>{locatedItem[0].price}</Td>
      )
    } else {
      return (
        <Td key={Math.random()}></Td>
      )
    }
  }

  return (
    <Tr color='whitesmoke'>
      <Td whiteSpace='nowrap' >{props.locatedItem.key}</Td>
      {props.locations.map(l => renderCell(l))}
    </Tr>
  )
}