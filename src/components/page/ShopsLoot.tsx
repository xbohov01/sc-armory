import { Dispatch, useState } from "react";

import { Divider, Heading, HStack, Stack, VStack } from "@chakra-ui/layout";
import { Switch, Tooltip } from "@chakra-ui/react";

import { LoadoutFormValues } from "../loadout/LoadoutBuilder";
import LootList from "../lootList/LootList";
import ShoppingWrapper from "../shoppingList/ShoppingWrapper";

import { ListKey, LocatedItem } from "~type/search";
import { KeyValue } from "~type/select";

type ShopsLootProps = {
  gear: LoadoutFormValues;
  listSetter: Dispatch<
    React.SetStateAction<KeyValue<ListKey, LocatedItem[]>[]>
  >;
};

export default function ShopsLoot(props: ShopsLootProps) {
  const [isTable, setIsTable] = useState(false);
  const items: string[] = Object.values(props.gear).flat().filter(item => item.length)

  const switchListType = () => {
    setIsTable(!isTable);
  };

  return (
    <VStack paddingTop="50px">
      <HStack justifyContent="center">
        <Heading padding="5pt" fontFamily="Exo" color="whitesmoke" size="sm">
          List view
        </Heading>
        <Switch id="list-type-switch" onChange={switchListType} width="auto" />
        <Heading padding="5pt" fontFamily="Exo" color="whitesmoke" size="sm">
          Grid view
        </Heading>
      </HStack>
      {isTable ? <Heading color="whitesmoke">Shops</Heading> : <CombinedHeader/>}
      <Stack direction={isTable ? "column" : "row"} alignItems={isTable ? "center" : "baseline"}>
        <ShoppingWrapper
          gear={items}
          listUpstream={props.listSetter}
          isTable={isTable}
        />
        {isTable ? <Heading paddingTop="20px" color="whitesmoke">Loots</Heading> : ""}
        <LootList gear={items} multiColumn={isTable}/>
      </Stack>
    </VStack>
  );
}

function CombinedHeader() {
  return (
    <HStack color="whitesmoke">
      <Heading marginRight="40px">Shops</Heading>
      <Divider
        orientation="vertical"
        height="40px"
        borderLeftWidth="2px"
        opacity="1"
      />
      <Tooltip label="Loot location, containers and probabilities are approximate">
        <Heading paddingLeft="40px">Loots</Heading>
      </Tooltip>
    </HStack>
  );
}
