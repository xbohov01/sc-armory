import React, { useEffect, useState } from "react";

import { Box, SimpleGrid } from "@chakra-ui/layout";

import LootListLocation from "./LootListLocation";

import { getLootList } from "~/util/loot";
import { LootItem } from "~type/search";
import { KeyValue } from "~type/select";

type LootListProps = {
  gear: string[];
  multiColumn: boolean;
};

export default function LootList(props: LootListProps) {
  const [list, setList] = useState<KeyValue<string, LootItem[]>[]>();

  useEffect(() => {
    getLootList(props.gear).then((res) => {
      setList(res);
    });
  }, [props.gear]);

  return (
    <Box
      id="loot-list"
      marginTop="10pt"
      width={props.multiColumn ? "1000pt" : "400pt"}
      marginBottom="10pt"
      marginLeft="20pt"
      backgroundColor="#282c34"
      color="whitesmoke"
    >
      <SimpleGrid columns={props.multiColumn ? 3 : 1} spacing="10px">
        {list != undefined
          ? list.map((i) => (
              <LootListLocation
                key={Math.random()}
                location={i.key}
                lootItems={i.value}
              />
            ))
          : ""}
      </SimpleGrid>
    </Box>
  );
}
