import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/layout";
import Select from "react-select";
import { customStyles } from "../../selectStyle";
import gearProvider from "../../providers/gearProvider";
import { SelectOption } from "../../types/types";
import CustomSelectOption from "./CustomSelectOption";

type LoadoutComponentProps = {
  type: string;
  updater: Dispatch<SetStateAction<string>>;
  isDisabled: boolean;
};

export default function LoadoutComponent(props: LoadoutComponentProps) {
  const [filter, setFilter] = useState("");
  const [options, setOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    gearProvider.GetGearOptions(props.type, "").then((res) => {
      setOptions(res);
    });
  }, [props.isDisabled, props.type]);

  const loadOptions = () =>
    options.filter((o) => o.label.toLowerCase().includes(filter.toLowerCase()));

  const handleGearChange = (selected: any) => {
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
