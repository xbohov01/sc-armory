import { Dispatch, useState } from "react";

import { Divider, Heading, HStack, Stack, VStack } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/react";

import LootList from "../lootList/LootList";
import ShoppingWrapper from "../shoppingList/ShoppingWrapper";

import { ListKey, LocatedItem } from "~type/search";
import { KeyValue } from "~type/select";

type ShopsLootProps = {
  gear: string[];
  listSetter: Dispatch<
    React.SetStateAction<KeyValue<ListKey, LocatedItem[]>[]>
  >;
};

export default function ShopsLoot(props: ShopsLootProps) {
  const [isTable, setIsTable] = useState(false);

  return (
    <VStack paddingTop="100px">
      {isTable ? <Heading color="whitesmoke">Shops</Heading> : <CombinedHeader/>}
      <Stack direction={isTable ? "column" : "row"} alignItems={isTable ? "center" : "baseline"}>
        <ShoppingWrapper
          gear={props.gear}
          listUpstream={props.listSetter}
          layoutUpstream={setIsTable}
        />
        {isTable ? <Heading paddingTop="20px" color="whitesmoke">Loots</Heading> : ""}
        <LootList gear={props.gear} multiColumn={isTable}/>
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
