import React, { Dispatch, SetStateAction, useState } from "react";
import { useQuery } from "react-query";
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
  const handleGearChange = (selected: SelectOption | null) => {
    // Check for selection clearing
    if (selected === null) {
      props.updater("");
      return;
    }
    props.updater(selected.label);
  };

  const { data: options } = useQuery(
    ["gearOptions", props.isDisabled, props.type],
    () =>
      getGearOptions(props.type, "").then((result: SelectOption[]) =>
        result.filter((option: SelectOption) =>
          option.label.toLowerCase().includes(filter.toLowerCase())
        )
      )
  );

  return (
    <Box
      id={`component-${props.type}`}
      padding="2pt"
      margin="auto"
      width="360pt"
    >
      <Heading fontSize="md">{props.type}</Heading>
      <Box paddingTop="2pt">
        <Select
          id={props.type}
          styles={customStyles}
          options={options}
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
