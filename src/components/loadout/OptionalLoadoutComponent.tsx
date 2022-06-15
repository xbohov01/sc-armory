import React, { useState } from "react";
import AsyncSelect from "react-select/async";

import { Button } from "@chakra-ui/button";
import { Box, Heading, HStack } from "@chakra-ui/layout";

import { customStyles } from "../../selectStyle";

import { getGearOptions } from "~/util/gear";
import type { KeyValue } from "~type/select";

type OptionalLoadoutComponentProps = {
  type: string;
  id: number;
  updater: (item: KeyValue<number, string>) => void;
  remover: (key: number) => void;
};

export default function OptionalLoadoutComponent(
  props: OptionalLoadoutComponentProps
) {
  const [filter, setFilter] = useState("");

  const loadOptions = async () => getGearOptions(props.type, filter);

  const handleGearChange = (selected: Record<string, string> | null) => {
    props.updater({ key: props.id, value: selected?.label || "" });
  };

  const handleRemove = () => {
    props.remover(props.id);
  };

  return (
    <Box margin="auto">
      <Heading fontSize="md">Optional gear</Heading>
      <HStack id={`component-${props.type}`} padding="2pt">
        <Box paddingTop="2pt">
          <AsyncSelect
            id={props.type}
            styles={customStyles}
            loadOptions={loadOptions}
            onChange={handleGearChange}
            onInputChange={setFilter}
            isMulti={false}
            defaultOptions
          />
        </Box>
        <Button colorScheme="red" onClick={handleRemove}>
          Remove
        </Button>
      </HStack>
    </Box>
  );
}
