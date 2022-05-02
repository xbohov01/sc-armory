import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Select from "react-select";

import { Box, Heading } from "@chakra-ui/layout";

import { customStyles } from "../../selectStyle";

import CustomSelectOption from "./CustomSelectOption";

import { getGearOptions } from "~/util/gear";
import type { SelectOption } from "~type/select";

type LoadoutComponentProps = {
  type: string;
  updater: Dispatch<SetStateAction<string>>;
  isDisabled: boolean;
};

export default function LoadoutComponent(props: LoadoutComponentProps) {
  const [filter, setFilter] = useState("");
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    getGearOptions(props.type, "").then((res) => {
      setOptions(res);
    });
  }, [props.isDisabled, props.type]);

  const loadOptions = () =>
    options.filter((o) => o.label.toLowerCase().includes(filter.toLowerCase()));

  const handleGearChange = (selected: Record<string, string> | null) => {
    // Check for selection clearing
    if (selected === null) {
      props.updater("");
      return;
    }
    props.updater(selected.label);
  };

  return (
    <Box
      maxWidth="300pt"
      id={`component-${props.type}`}
      padding="2pt"
      margin="auto"
    >
      <Heading fontSize="md">{props.type}</Heading>
      <Box paddingTop="2pt">
        <Select
          id={props.type}
          styles={customStyles}
          options={loadOptions()}
          onChange={handleGearChange}
          onInputChange={setFilter}
          isMulti={false}
          isDisabled={props?.isDisabled ?? false}
          defaultOptions
          formatOptionLabel={CustomSelectOption}
          placeholder="Start typing..."
          isClearable
        />
      </Box>
    </Box>
  );
}
