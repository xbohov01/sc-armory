import React, { Dispatch, SyntheticEvent, useState } from "react";

import { Button } from "@chakra-ui/button";
import { Box, VStack } from "@chakra-ui/layout";

import OptionalLoadoutComponent from "./OptionalLoadoutComponent";

import type { KeyValue } from '~type/select';

type OptionalLoadoutItemsProps = {
  onUpdate: Dispatch<React.SetStateAction<string[]>>;
};

export default function OptionalLoadoutItems(props: OptionalLoadoutItemsProps) {
  const [optionals, setOptionals] = useState<KeyValue<number, string>[]>([]);

  const addOptional = (e: SyntheticEvent) => {
    e.preventDefault();
    setOptionals([...optionals, { key: Math.random(), value: "" }]);
  };

  const removeOptional = (key: number) => {
    const removed = optionals.filter((o) => o.key !== key);
    setOptionals(removed);

    props.onUpdate(optionals.map((o) => o.value));
  };

  const updateOptional = (item: KeyValue<number, string>) => {
    const opts = optionals;
    opts.filter((o) => o.key === item.key)[0].value = item.value;

    setOptionals(opts);
    props.onUpdate(optionals.map((o) => o.value));
  };

  return (
    <Box marginTop="10pt" width="360pt" margin="auto">
      <Button
        marginBottom="10pt"
        marginTop="10pt"
        width="300pt"
        colorScheme="blue"
        onClick={addOptional}
      >
        Add optional gear
      </Button>
      <VStack>
        {optionals.map((o) => (
          <OptionalLoadoutComponent
            id={o.key}
            key={o.key}
            type="Usable"
            onDelete={removeOptional}
            onUpdate={updateOptional}
          />
        ))}
      </VStack>
    </Box>
  );
}
